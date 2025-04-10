import { existsSync } from 'fs';
import fs from 'fs';
import base58, * as bs58 from "bs58";
import * as anchor from "@coral-xyz/anchor";
import { Keypair, PublicKey } from '@solana/web3.js';
import { LimitlessSDK } from '../..';
import { getAccount, getAssociatedTokenAddress, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import Decimal from 'decimal.js';
import path from 'path';

// Global variables and helpers
let uniqueMarkets = new Map<string, any>();

async function refreshUniqueMarkets(quote: PublicKey) {
    const newUniqueMarkets = new Map<string, any>();
    let skip = 0;
    while (true) {
        const res = await fetch(`https://devnet.api.takeoff.lol/newlyLaunchedMarkets?quoteMint=${quote.toBase58()}&skip=${skip}&limit=50`);
        const markets = await res.json();
        if (!Array.isArray(markets) || markets.length === 0) break;
        for (const market of markets) {
            if (!market.address || !market.launchdate) continue;
            const marketLaunchDate = new Date(market.launchdate);
            const cutoffDate = new Date('2025-04-04T00:00:00.000Z');
            if (marketLaunchDate <= cutoffDate) continue;
            newUniqueMarkets.set(market.address, market);
        }
        skip += markets.length;
    }
    uniqueMarkets = newUniqueMarkets;
    console.log("Updated unique markets count:", uniqueMarkets.size);
}

function getRandomNumberInRange(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function getSize(price: Decimal): Promise<Decimal> {
    let scale = new Decimal(0.01).div(price);
    let size = new Decimal(100000).div(scale);
    return size;
}

// Presale Operations: purchase presales and claim coupons.
async function runPresaleOperations(client: LimitlessSDK, quote: PublicKey) {
    // Fetch live presales
    const res = await fetch(`https://devnet.api.takeoff.lol/livePresales?quoteMint=${quote.toBase58()}&orderBy=presalequote&skip=0`);
    const presaleData = await res.json();
    console.log(`Fetched ${presaleData.length} active presale markets!`);
    for (const presaleMkt of presaleData) {
        const marketAddress = new PublicKey(presaleMkt.address);
        const marketState = await client.getMarket(marketAddress);
        const coupons = await client.getCoupons(marketAddress, client.wallet.publicKey);
        console.log("Checking market:", marketAddress.toBase58());
        if (coupons[0].length === 0) {
            console.log("No coupons detected, buying presale!");
            const associatedQuoteAddress = await getAssociatedTokenAddress(quote, client.wallet.publicKey);
            const cost = new Decimal(100).mul(10 ** marketState.quoteDecimals);
            const buyPresaleInfo = await client.presaleBuyInfo(cost, marketState);
            console.log("Expected pool addition:", buyPresaleInfo.out.div(10 ** marketState.baseDecimals).toString());
            console.log(`New price: ${buyPresaleInfo.newPrice.toString()}, Price impact: ${buyPresaleInfo.priceIncrease.toString()}%`);
            await client.presaleBuy(
                new anchor.BN(buyPresaleInfo.out.toString()),
                associatedQuoteAddress,
                marketAddress,
                marketState
            );
        } else {
            console.log("Already have coupons for this market.");
        }
    }
    // Claim coupons for matured presales
    const allCouponsData = await client.getAllUserCoupons(client.wallet.publicKey);
    console.log(`Fetched ${allCouponsData[0].length} coupons`);
    for (let i = 0; i < allCouponsData[0].length; i++) {
        const coupon = allCouponsData[0][i];
        const couponKey = allCouponsData[1][i];
        const marketAddress = coupon.marketAddress;
        const marketState = await client.getMarket(marketAddress);
        console.log("Claiming coupon for market:", marketAddress.toBase58());
        if (Date.now() / 1000 > marketState.launchDate.toNumber()) {
            const claimRes = await client.claimPresale([couponKey], marketAddress, marketState);
            console.log("Claim presale tx:", claimRes.txid);
        } else {
            console.log("Market not launched yet");
        }
    }
}

// Trading Operations: buy if floor ratio > 0.9, sell if floor ratio < 0.1
async function runTradingOperations(client: LimitlessSDK, quote: PublicKey) {
    const associatedQuoteAddress = await getAssociatedTokenAddress(quote, client.wallet.publicKey);
    for (const market of uniqueMarkets.values()) {
        try {
            let marketAddress = new PublicKey(market.address);
            let marketState = await client.getMarket(marketAddress);
            console.log(`Market ${market.address} - Floor ratio: ${market.floorratio}`);
            let bid = false
            try {
                const baseTokenAddress = await getAssociatedTokenAddress(marketState.baseMintAddress, client.wallet.publicKey);
                const baseTokenAcc = await getAccount(client.connection, baseTokenAddress);
            } catch(e) {
                bid = true
            }
            if (market.floorratio > 0.4 || bid) {
                // Buy logic
                const maxQuote = await getSize(new Decimal(market.price));
                const costNorm = getRandomNumberInRange(1, maxQuote.toNumber());
                console.log("Buying for:", costNorm);
                const buyInfo = await client.buyInfo(new Decimal(costNorm * (10 ** marketState.quoteDecimals)), marketState);
                const maxCost = new anchor.BN(new Decimal(costNorm * (10 ** marketState.quoteDecimals)).mul(1.1).floor().toString());
                client.buy(new anchor.BN(buyInfo.out.mul(10 ** marketState.baseDecimals).toString()), maxCost, marketAddress, marketState, associatedQuoteAddress);
                console.log("Buy order placed.");
            } else if (market.floorratio < 0.1) {
                // Sell logic
                const baseTokenAddress = await getAssociatedTokenAddress(marketState.baseMintAddress, client.wallet.publicKey);
                try {
                    const baseTokenAcc = await getAccount(client.connection, baseTokenAddress);
                    let sellProceedsMax = await getSize(new Decimal(market.price));
                    const sellQProceeds = getRandomNumberInRange(1, sellProceedsMax.toNumber());
                    const sellQNormTemp = await client.sellWithOutputInfo(new Decimal(sellQProceeds).mul(10 ** marketState.baseDecimals), marketState);
                    let sellQ = sellQNormTemp.mul(10 ** marketState.baseDecimals);
                    if (sellQ.greaterThan(new Decimal(baseTokenAcc.amount.toString()))) {
                        sellQ = new Decimal(baseTokenAcc.amount.toString());
                    }
                    if (sellQ.greaterThan(1)) {
                        const sellInfo = await client.sellInfo(sellQ.floor(), marketState);
                        let minProceeds = new Decimal(sellInfo.outAmm.mul(10 ** marketState.quoteDecimals))
                            .mul(new Decimal(1).minus(new Decimal(0.1).div(100))).floor();
                        client.sell(new anchor.BN(sellInfo.sellAmmQ.floor().toString()), new anchor.BN(minProceeds.floor().toString()), marketAddress, marketState, baseTokenAddress);
                        console.log("Sell order placed.");
                        if (sellInfo.sellFloorQ.greaterThan(0)) {
                            const minProceedsFloor = new Decimal(sellInfo.outFloor.mul(10 ** marketState.quoteDecimals))
                                .mul(new Decimal(1).minus(new Decimal(0.01).div(100))).floor();
                            client.sellFloor(new anchor.BN(sellInfo.sellFloorQ.toString()), new anchor.BN(minProceedsFloor.floor().toString()), marketAddress, marketState, baseTokenAddress);
                            console.log("Sell floor order placed.");
                        }
                    }
                } catch (error) {

                }

            }
        } catch (error) {
            console.log("Trading operation error:", error);
        }
    }
}

async function main() {
    try {
        const keypair = await getSolanaKeypair("presaleScaler");
        const connection = new anchor.web3.Connection("https://rpcdevnet.redao.id/a1fb2ed4-f5df-4688-982b-4fad1944ef0e/");
        const wallet = new anchor.Wallet(keypair);
        const lamportsBalance = await connection.getBalance(wallet.publicKey) / 10 ** 9;
        console.log("Wallet address:", keypair.publicKey.toBase58());
        console.log("Wallet balance:", lamportsBalance);
        let quote = "GegvtgCpWDHRECtokd5gTdWKGqpVWdDexCwBjGEMwSYx";
        if (lamportsBalance < 0.1) {
            console.log("Wallet balance too low!");
            return;
        }
        const quoteTokenAddress = await getAssociatedTokenAddress(new PublicKey(quote), wallet.publicKey);
        const quoteBalance = await getAccount(connection, quoteTokenAddress);
        console.log("Quote balance:", quoteBalance.amount);
        if (quoteBalance.amount / BigInt(10 ** 6) < 100) {
            console.log("Quote balance too low!");
            return;
        }
        const client = new LimitlessSDK(wallet, connection);
        await client.init();

        // Start refreshing unique markets every 10 seconds.
        await refreshUniqueMarkets(new PublicKey(quote));
        setInterval(() => refreshUniqueMarkets(new PublicKey(quote)).catch(console.error), 10000);

        // Run presale and trading operations asynchronously.
        (async function presaleLoop() {
            while (true) {
                try {
                    await runPresaleOperations(client, new PublicKey(quote));
                } catch (error) {
                    console.error("Presale error:", error);
                }
                await new Promise(r => setTimeout(r, 5000));
            }
        })();

        (async function tradingLoop() {
            while (true) {
                try {
                    await runTradingOperations(client, new PublicKey(quote));
                } catch (error) {
                    console.error("Trading error:", error);
                }
                await new Promise(r => setTimeout(r, 200));
            }
        })();
    } catch (error) {
        console.error("Error in main:", error);
    }
}

main();

export async function getSolanaKeypair(walletName: string): Promise<Keypair> {
    try {
        const data = fs.readFileSync(`${walletName}.json`, 'utf8');
        console.log(`${walletName}.json found`);
        const dataJson = JSON.parse(data);
        return Keypair.fromSecretKey(bs58.decode(dataJson.secretKey));
    } catch (err) {
        console.log(`${walletName}.json not found, generating`);
        const keypair = Keypair.generate();
        fs.writeFileSync(`${walletName}.json`, JSON.stringify({ secretKey: bs58.encode(keypair.secretKey) }), 'utf8');
        return keypair;
    }
}
