//get all markets
//get price
//50/50 chance for buy or sell
//if buy
//if price is between 0.0000001 - 0.00001 - size = max 100
//if price is between 0.000001  - 0.0001 - size = max 1000
//if price is larger than 0.00001        - size = max 10000
//buy with random size
//if sell
//sell with half base size

import { existsSync, mkdirSync } from 'fs';
import fs from 'fs';
import base58, * as bs58 from "bs58";
import * as anchor from "@coral-xyz/anchor";
import { Keypair, PublicKey } from '@solana/web3.js';
import { LimitlessSDK } from '../..';
import path from 'path';
import { AccountLayout, getAccount, getAssociatedTokenAddress, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { getMarket } from '../../index_old';
import Decimal from 'decimal.js';
import { dir } from 'console';

//volumizer todo
//track each market address probability
//if tere is no base balance then bid it up
const marketProbabilities = new Map<string, any>();

// Declare a global variable for unique markets.
let uniqueMarkets = new Map<string, any>();

// New function to refresh unique markets every 10s.
async function refreshUniqueMarkets(quote: PublicKey) {
    const newUniqueMarkets = new Map<string, any>();
    let skip = 0;
    while (true) {
        const res = await fetch(`https://devnet.api.takeoff.lol/newlyLaunchedMarkets?quoteMint=${quote.toBase58()}&skip=${skip}&limit=50`);
        const markets = await res.json();
        if (!Array.isArray(markets) || markets.length === 0) {
            break;
        }
        for (const market of markets) {
            if (!market.address || !market.launchdate) continue;
            const marketLaunchDate = new Date(market.launchdate);
            const cutoffDate = new Date('2025-04-04T00:00:00.000Z');
            if (marketLaunchDate <= cutoffDate) continue;
            if (!newUniqueMarkets.has(market.address)) {
                newUniqueMarkets.set(market.address, market);
            }
        }
        skip += markets.length;
    }
    uniqueMarkets = newUniqueMarkets;
    console.log("Updated unique markets count:", uniqueMarkets.size);
}

let probability = 1;
async function runVolumizer(client: LimitlessSDK, quote: PublicKey) {
    let associatedQuoteAddress = await getAssociatedTokenAddress(
        quote,
        client.wallet.publicKey
    );
    // Now use the global uniqueMarkets updated separately
    for (const market of uniqueMarkets.values()) {
        console.log(`Market address: ${market.address}, Price: ${market.price}`);
        let marketAddress = new PublicKey(market.address);
        let marketState = await client.getMarket(marketAddress);
        let direction = getRandomNumberInRange(0, 100);
        try {
            if (!marketProbabilities.has(market.address)) {
                marketProbabilities.set(market.address, 50)
            }
            let probs = marketProbabilities.get(market.address)
            probs += rate;
            if (probs > 99) {
                probs = 1;
            }
            if (probs < 1) {
                probs = 99
            }
            let switchup = getRandomNumberInRange(0, 1000);
            // if (switchup < 1) {
            //     probs = 1;
            // }
            // if (switchup > 999) {
            //     probs = 70;
            // }
            if (market.floorratio < 0.1 && probs < 50) {
                probs += rate * 10;
            }
            if (market.floorratio > 0.9 && probs > 50) {
                probs -= rate * 10;
            }
            marketProbabilities.set(market.address, probs);
            // if (market.floorratio < 0.2) {
            //     probs = 80;
            // }

            // if (market.floorratio > 0.8) {
            //     probs = 20;
            // }
            // if (market.floorratio > 0.95) {
            //     probs = 5;
            // }
            // console.log("PROBABILITY", probs);
            if (direction > probs) {
                let maxQuote = await getSize(new Decimal(market.price));
                let costNorm = getRandomNumberInRangeWithDistribution(1, maxQuote.toNumber());
                console.log("Buying for:", costNorm);
                let buyInfo = await client.buyInfo(new Decimal(costNorm * (10 ** marketState.quoteDecimals)), marketState);
                // console.log("Expected amount to receive:", buyInfo.out.toString());
                // console.log(`Expected new price: ${buyInfo.newPrice.toString()}. Expected price impact: ${buyInfo.priceIncrease.toString()}`);
                let maxCost = new anchor.BN(new Decimal(costNorm * (10 ** marketState.quoteDecimals)).mul(1.1).floor().toString());
                // console.log("Max cost:", new Decimal(maxCost.toString()).div(10 ** marketState.quoteDecimals).toString());
                let buyRes = client.buy(new anchor.BN(buyInfo.out.mul(10 ** marketState.baseDecimals).toString()), maxCost, marketAddress, marketState, associatedQuoteAddress);
            } else {
                try {
                    let baseTokenAddress = await getAssociatedTokenAddress(marketState.baseMintAddress, client.wallet.publicKey);
                    let baseTokenAcc = await getAccount(
                        client.connection,
                        baseTokenAddress
                    );
                    let sellProceedsMax = await getSize(new Decimal(market.price));
                    // console.log("Sell proceeds max", sellProceedsMax.toString());
                    let sellQProceeds = getRandomNumberInRangeWithDistribution(1, sellProceedsMax.toNumber());
                    // console.log("Sell proceeds", sellQProceeds.toString());
                    let sellQNorm = await client.sellWithOutputInfo(new Decimal(sellQProceeds).mul(10 ** marketState.baseDecimals), marketState);
                    console.log("Sell Q norm", sellQNorm.toString());
                    let sellQ = sellQNorm.mul(10 ** marketState.baseDecimals);
                    // console.log("Sell Q", sellQ.toString());
                    if (sellQ.greaterThan(new Decimal(baseTokenAcc.amount.toString()))) {
                        sellQ = new Decimal(baseTokenAcc.amount.toString());
                        sellQNorm = new Decimal(baseTokenAcc.amount.toString()).div(10 ** marketState.baseDecimals);
                    }
                    if (sellQ.greaterThan(1)) {
                        // console.log("Selling tokens:", sellQNorm);
                        let sellInfo = await client.sellInfo(
                            sellQ.floor(),
                            marketState
                        );
                        // console.log(`Sell ammQ: ${sellInfo.sellAmmQ.toString()}. Sell floorQ: ${sellInfo.sellFloorQ.toString()}. TotalQ: ${sellQNorm}`);
                        // console.log(`Amm out: ${sellInfo.outAmm.toString()}. Floor out: ${sellInfo.outFloor.toString()}. Total out: ${sellInfo.outAmm.add(sellInfo.outFloor).toString()}`);
                        // console.log(`Expected new price: ${sellInfo.newPrice.toString()}. Expected price impact: ${sellInfo.priceIncrease.toString()}`);
                        let minProceeds = new Decimal(sellInfo.outAmm.mul(10 ** marketState.quoteDecimals)).mul(new Decimal(1).minus(new Decimal(0.1))).floor();
                        // console.log("Min proceeds:", minProceeds.toString());
                        let sellRes = client.sell(new anchor.BN(sellInfo.sellAmmQ.floor().toString()), new anchor.BN(minProceeds.floor().toString()), marketAddress, marketState, baseTokenAddress);
                        if (sellInfo.sellFloorQ.greaterThan(0)) {
                            let minProceedsFloor = new Decimal(sellInfo.outFloor.mul(10 ** marketState.quoteDecimals)).mul(0.9).floor();
                            // console.log("Min proceeds floor:", minProceedsFloor.toString())
                            let sellFloorRes = client.sellFloor(new anchor.BN(sellInfo.sellFloorQ.toString()), new anchor.BN(minProceedsFloor.floor().toString()), marketAddress, marketState, baseTokenAddress);
                        }
                    }
                } catch (error) {

                }

            }
            let newFloor = await client.getUpdateFloorQuantity(marketState)
            let updateAndBoostFloorRes = client.updateAndBoostFloor(new anchor.BN(newFloor.toString()), marketAddress, marketState)
            // console.log("Update and boost floor tx:", updateAndBoostFloorRes.txid)

        } catch (error) {
            console.log(error);
        }
    }
}

async function getSize(price: Decimal): Promise<Decimal> {
    let scale = new Decimal(0.01).div(price);
    let size = new Decimal(100000).div(scale);
    return size;
}
function getRandomNumberInRange(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getRandomNumberInRangeWithDistribution(min: number, max: number): number {
    // Gamma distribution parameters.
    // We'll use shape = 2 and choose beta such that the mean (min + shape*beta)
    // is roughly in the middle of [min, max]. With shape=2, we set:
    const shape = 2;
    const beta = (max - min) / (4); // mean = min + 2*beta = min + (max-min)/2

    // Sample from gamma distribution using Marsaglia and Tsang algorithm.
    const sampleGamma = (alpha: number, betaParam: number): number => {
        const d = alpha - 1 / 3;
        const c = 1 / Math.sqrt(9 * d);
        while (true) {
            const x = gaussianRandom();
            const v = Math.pow(1 + c * x, 3);
            if (v <= 0) continue;
            const u = Math.random();
            if (u < 1 - 0.0331 * Math.pow(x, 4) || Math.log(u) < 0.5 * x * x + d - d * v + d * Math.log(v)) {
                return d * v * betaParam;
            }
        }
    };

    // Standard normal (Gaussian) generator using the Box-Muller transform.
    const gaussianRandom = (): number => {
        const u = Math.random();
        const v = Math.random();
        return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
    };

    // Use rejection sampling to ensure result is within [min, max].
    while (true) {
        const sample = min + sampleGamma(shape, beta);
        if (sample >= min && sample <= max) {
            return sample;
        }
    }
}
let rate = 0.1
main();
async function main() {
    try {
        const firstArg = process.argv[2];

        let walletName = "volumizer"
        if (firstArg && firstArg == "fast") {
            rate = 1
            walletName = "volumizerFast"
        }
        console.log('Using command line argument:', firstArg);
        let keypair = await getSolanaKeypair(walletName);
        const connection = new anchor.web3.Connection("https://rpcdevnet.redao.id/a1fb2ed4-f5df-4688-982b-4fad1944ef0e/", { commitment: "processed", wsEndpoint: "wss://devnet.api.takeoff.lol/ws" });
        const wallet = new anchor.Wallet(keypair);
        const lamportsBalance = await connection.getBalance(wallet.publicKey) / 10 ** 9;
        console.log("Wallet address: ", keypair.publicKey.toBase58());
        console.log("Wallet balance: ", lamportsBalance);
        let quote = "GegvtgCpWDHRECtokd5gTdWKGqpVWdDexCwBjGEMwSYx";
        if (lamportsBalance < 0.1) {
            console.log("Wallet balance too low!");
            return;
        }
        let quoteTokenAddress = await getAssociatedTokenAddress(new PublicKey(quote), wallet.publicKey);
        let quoteBalance = await getAccount(connection, quoteTokenAddress);
        console.log("Quote balance:", quoteBalance.amount);
        if (quoteBalance.amount / BigInt(10 ** 6) < 100) {
            console.log("Quote balance too low!");
            return;
        }
        const client = new LimitlessSDK(wallet, connection);
        await client.init();
        // Start the refresh loop immediately and then every 10 seconds.
        await refreshUniqueMarkets(new PublicKey(quote));
        setInterval(() => {
            refreshUniqueMarkets(new PublicKey(quote)).catch(console.error);
        }, 10000);
        // Run the trading loop continuously.
        while (true) {
            try {
                await runVolumizer(client, new PublicKey(quote));
                console.log("Done")
                // await new Promise(r => setTimeout(r, 200));
            } catch (error) {
                // Handle error if needed.
            }
        }
    } catch (error) {
        console.error("Error in main function:", error);
    }
}

export async function getSolanaKeypair(walletName: string): Promise<Keypair> {
    try {
        const data = fs.readFileSync(`${walletName}.json`, 'utf8');
        console.log(`${walletName}.json found`);
        const dataJson = JSON.parse(data);
        let kp = Keypair.fromSecretKey(bs58.decode(dataJson.secretKey));
        return kp;
    } catch (err) {
        console.log(`${walletName}.json not found, generating`);
        const keypair = Keypair.generate();
        var b58 = bs58.encode(keypair.secretKey);
        fs.writeFileSync(`${walletName}.json`, JSON.stringify({ secretKey: b58 }), 'utf8');
        return keypair;
    }
}