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

let probability = 1
async function runVolumizer(client: LimitlessSDK, quote: PublicKey) {

    // Map to store unique markets using the "address" field as the key
    const uniqueMarkets = new Map<string, any>();

    let skip = 0;
    while (true) {
        const res = await fetch(`https://devnet.api.takeoff.lol/newlyLaunchedMarkets?quoteMint=${quote.toBase58()}&orderBy=presalequote&skip=${skip}&limit=50`);
        const markets = await res.json();
        if (!Array.isArray(markets) || markets.length === 0) {
            break;
        }
        // Process fetched markets here and add unique ones
        for (const market of markets) {
            if (!market.address || !market.launchdate) continue;
            const marketLaunchDate = new Date(market.launchdate);
            const cutoffDate = new Date('2025-03-31T00:00:00.000Z');
            if (marketLaunchDate <= cutoffDate) continue;
            if (!uniqueMarkets.has(market.address)) {
                uniqueMarkets.set(market.address, market);
                //console.log("Added market:", market);
            } else {
                //console.log("Duplicate market skipped:", market.address);
            }
        }
        skip += markets.length;
    }
    console.log("Final unique markets count:", uniqueMarkets.size);
    let associatedQuoteAddress = await getAssociatedTokenAddress(
        quote,
        client.wallet.publicKey
    );
    for (const market of uniqueMarkets.values()) {
        console.log(market)
        console.log(`Market address: ${market.address}, Price: ${market.price}`);
        let marketAddress = new PublicKey(market.address)
        let marketState = await client.getMarket(marketAddress)
        let direction = getRandomNumberInRange(0, 100)
        try {
            if (!marketProbabilities.has(market.address)) {
                marketProbabilities.set(market.address, 1)
            }
            let probs = marketProbabilities.get(market.address)
            probs += 0.01
            if (probability > 99) {
                probs = 1
            }
            let switchup = getRandomNumberInRange(0, 100)
            if (switchup < 1) {
                probs = 1
            }
            if (switchup > 99) {
                probs = 70
            }
            marketProbabilities.set(market.address, probs)
            if (market.floorratio < 0.2) {
                probs = 80
            }
            if (market.floorratio < 0.05) {
                probs = 95
            }
            if (market.floorratio > 0.8) {
                probs = 20
            }
            if (market.floorratio > 0.95) {
                probs = 5
            }
            console.log("PROBABILITY", probs)
            if (direction > probs) {

                let maxQuote = await getSize(new Decimal(market.price))
                let costNorm = getRandomNumberInRange(1, maxQuote.toNumber())
                console.log("Buying for:", costNorm)
                let buyInfo = await client.buyInfo(new Decimal(costNorm * (10 ** marketState.quoteDecimals)), marketState)
                console.log("Expected amount to receive:", buyInfo.out.toString())
                console.log(`Expected new price: ${buyInfo.newPrice.toString()}. Expected price impact: ${buyInfo.priceIncrease.toString()}`)
                let maxCost = new anchor.BN(new Decimal(costNorm * (10 ** marketState.quoteDecimals)).mul(1.01).floor().toString())
                console.log("Max cost:", new Decimal(maxCost.toString()).div(10 ** marketState.quoteDecimals).toString())
                let buyRes = client.buy(new anchor.BN(buyInfo.out.mul(10 ** marketState.baseDecimals).toString()), maxCost, marketAddress, marketState, associatedQuoteAddress)
                // console.log("Buy tx:", buyRes.txid)
            } else {
                let baseTokenAddress = await getAssociatedTokenAddress(marketState.baseMintAddress, client.wallet.publicKey)
                let baseTokenAcc = await getAccount(
                    client.connection,
                    baseTokenAddress
                )
                let sellProceedsMax = await getSize(new Decimal(market.price))
                console.log("Sell proceeds max", sellProceedsMax.toString())
                let sellQProceeds = getRandomNumberInRange(1, sellProceedsMax.toNumber())
                console.log("Sell proceeds", sellQProceeds.toString())
                let sellQNorm = await client.sellWithOutputInfo(new Decimal(sellQProceeds).mul(10 ** marketState.baseDecimals), marketState)
                console.log("Sell Q norm", sellQNorm.toString()) 
                let sellQ = sellQNorm.mul(10 ** marketState.baseDecimals)
                console.log("Sell Q", sellQ.toString()) 
                if (sellQ.greaterThan(new Decimal(baseTokenAcc.amount.toString()))) {
                    sellQ = new Decimal(baseTokenAcc.amount.toString())
                    sellQNorm = new Decimal(baseTokenAcc.amount.toString()).div(10 ** marketState.baseDecimals)
                }
                if (sellQ.greaterThan(1)) {
                    // let baseAmtNormMax = (baseTokenAcc.amount / BigInt(10 ** marketState.baseDecimals)) / BigInt(2)
                    // let sellQNorm = getRandomNumberInRange(1, Number(baseAmtNormMax))
                    console.log("Selling tokens:", sellQNorm)
                    // let sellQ = new Decimal(sellQNorm).mul(10 ** marketState.baseDecimals)
                    let sellInfo = await client.sellInfo(
                        sellQ.floor(),
                        marketState
                    )
                    console.log(`Sell ammQ: ${sellInfo.sellAmmQ.toString()}. Sell floorQ: ${sellInfo.sellFloorQ.toString()}. TotalQ: ${sellQNorm}`)
                    console.log(`Amm out: ${sellInfo.outAmm.toString()}. Floor out: ${sellInfo.outFloor.toString()}. Total out: ${sellInfo.outAmm.add(sellInfo.outFloor).toString()}`)
                    console.log(`Expected new price: ${sellInfo.newPrice.toString()}. Expected price impact: ${sellInfo.priceIncrease.toString()}`)
                    let minProceeds = new Decimal(sellInfo.outAmm.mul(10 ** marketState.quoteDecimals)).mul(new Decimal(1).minus(new Decimal(0.01).div(100))).floor()
                    console.log("Min proceeds:", minProceeds.toString())
                    let sellRes = client.sell(new anchor.BN(sellInfo.sellAmmQ.floor().toString()), new anchor.BN(minProceeds.floor().toString()), marketAddress, marketState, baseTokenAddress)
                    // console.log("Sell tx:", sellRes.txid)
                    if (sellInfo.sellFloorQ.greaterThan(0)) {
                        let minProceedsFloor = new Decimal(sellInfo.outFloor.mul(10 ** marketState.quoteDecimals)).mul(new Decimal(1).minus(new Decimal(0.01).div(100))).floor()
                        let sellFloorRes = client.sellFloor(new anchor.BN(sellInfo.sellFloorQ.toString()), new anchor.BN(minProceedsFloor.floor().toString()), marketAddress, marketState, baseTokenAddress)
                        // console.log("Sell floor tx:", sellFloorRes.txid)
                    }
                }


            }
        } catch (error) {
            console.log(error)
        }
    }

}
async function getSize(price: Decimal): Promise<Decimal> {
    //let size = new Decimal(10)
    let scale = new Decimal(0.01).div(price)
    let size = new Decimal(100000).div(scale)
    // if (price.greaterThan(0.00001)) size = new Decimal(100)
    // if (price.greaterThan(0.0001)) size = new Decimal(1000)
    // if (price.greaterThan(0.001)) size = new Decimal(10000)
    // if (price.greaterThan(0.01)) size = new Decimal(100000)
    return size
}
function getRandomNumberInRange(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
main()
async function main() {
    try {

        //load keypair, marketCreator.json
        //check mainnet for keypair is funded
        let keypair = await getSolanaKeypair("volumizer")
        const connection = new anchor.web3.Connection("https://rpcdevnet.redao.id/a1fb2ed4-f5df-4688-982b-4fad1944ef0e/", { commitment: "processed" });
        const wallet = new anchor.Wallet(keypair);
        const lamportsBalance = await connection.getBalance(wallet.publicKey) / 10 ** 9;
        console.log("Wallet address: ", keypair.publicKey.toBase58())
        console.log("Wallet balance: ", lamportsBalance)
        //todo load quote from json?
        let quote = "GegvtgCpWDHRECtokd5gTdWKGqpVWdDexCwBjGEMwSYx"
        if (lamportsBalance < 0.1) {
            console.log("Wallet balance too low!")
            return
        }
        let quoteTokenAddress = await getAssociatedTokenAddress(new PublicKey(quote), wallet.publicKey)
        let quoteBalance = await getAccount(connection, quoteTokenAddress)
        console.log("Quote balance:", quoteBalance.amount)
        if (quoteBalance.amount / BigInt(10 ** 6) < 100) {
            console.log("Quote balance too low!")
            return
        }
        const client = new LimitlessSDK(wallet, connection)
        await client.init()
        while (true) {
            try {
                await runVolumizer(client, new PublicKey(quote))
            } catch (error) {

            }
            // await new Promise(r => setTimeout(r, 200));

        }

        // Schedule periodic scans (every 15 minutes)

    } catch (error) {
        console.error("Error in main function:", error);
    }
}

export async function getSolanaKeypair(walletName: string): Promise<Keypair> {
    try {
        // try to read the keypair file
        const data = fs.readFileSync(`${walletName}.json`, 'utf8');
        console.log(`${walletName}.json found`)
        const dataJson = JSON.parse(data);
        let kp = Keypair.fromSecretKey(bs58.decode(dataJson.secretKey));
        return kp
    } catch (err) {
        // if the file doesn't exist, create a new keypair
        console.log(`${walletName}.json not found, generating`);
        const keypair = Keypair.generate();
        var b58 = bs58.encode(keypair.secretKey)
        fs.writeFileSync(`${walletName}.json`, JSON.stringify({ secretKey: b58 }), 'utf8');
        return keypair;
    }
}