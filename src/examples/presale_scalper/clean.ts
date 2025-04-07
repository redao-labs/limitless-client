//get all base tokens
//sell all
//close token accounts

//sell all base tokens
//repay max
//withdraw max

// import { Keypair } from "@solana/web3.js";
import { existsSync, mkdirSync } from 'fs';
import fs from 'fs';
import base58, * as bs58 from "bs58";
import * as anchor from "@coral-xyz/anchor";
import { Keypair, PublicKey } from '@solana/web3.js';
import { LimitlessSDK } from '../..';
import path from 'path';
import { AccountLayout, closeAccount, getAccount, getAssociatedTokenAddress, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { getMarket } from '../../index_old';
import Decimal from 'decimal.js';


async function runPresaleLooperCleaner(client: LimitlessSDK, quote: PublicKey) {

    //get all base tokens
    //for each base token, create and deposit into deposit account
    let allBaseTokens = await client.connection.getTokenAccountsByOwner(client.wallet.publicKey, { programId: TOKEN_PROGRAM_ID })
    console.log(`Found ${allBaseTokens.value.length} token accounts`)
    for (let i = 0; i < allBaseTokens.value.length; i++) {
        let baseTokenBuff = allBaseTokens.value[i].account.data
        const baseToken = AccountLayout.decode(baseTokenBuff);

        console.log("Got token account:", allBaseTokens.value[i].pubkey.toBase58())
        console.log("Balance:", baseToken.amount, "Mint:", baseToken.mint.toBase58())
        if (baseToken.mint.toBase58() != quote.toBase58() && baseToken.amount > BigInt(0)) {
            console.log("Selling balance!")
            const marketStateRes = await fetch(`https://devnet.api.takeoff.lol/marketState?baseMintAddress=${baseToken.mint.toBase58()}`);
            const marketState = await marketStateRes.json()
            let marketStateStruct = await client.getMarket(new PublicKey(marketState.address))
            let marketAddress = new PublicKey(marketState.address)
            console.log("Market address:", marketState.address)
            let sellInfo = await client.sellInfo(
                new Decimal(baseToken.amount.toString()),
                marketStateStruct
            );
            console.log(`Sell ammQ: ${sellInfo.sellAmmQ.toString()}. Sell floorQ: ${sellInfo.sellFloorQ.toString()}. TotalQ: ${sellInfo.sellAmmQ.add(sellInfo.sellFloorQ)}`);
            console.log(`Amm out: ${sellInfo.outAmm.toString()}. Floor out: ${sellInfo.outFloor.toString()}. Total out: ${sellInfo.outAmm.add(sellInfo.outFloor).toString()}`);
            console.log(`Expected new price: ${sellInfo.newPrice.toString()}. Expected price impact: ${sellInfo.priceIncrease.toString()}`);
            if (sellInfo.sellAmmQ.greaterThan(0)) {
                let minProceeds = new Decimal(sellInfo.outAmm.mul(10 ** marketStateStruct.quoteDecimals)).mul(new Decimal(0.9)).floor();
                console.log("Min proceeds:", minProceeds.toString());
                let sellRes = await client.sell(new anchor.BN(sellInfo.sellAmmQ.floor().toString()), new anchor.BN(minProceeds.floor().toString()), marketAddress, marketStateStruct, allBaseTokens.value[i].pubkey);
            }
            if (sellInfo.sellFloorQ.greaterThan(0)) {
                let minProceedsFloor = new Decimal(sellInfo.outFloor.mul(10 ** marketStateStruct.quoteDecimals)).mul(0.9).floor();
                console.log("Min proceeds floor:", minProceedsFloor.toString())
                let sellFloorRes = await client.sellFloor(new anchor.BN(sellInfo.sellFloorQ.toString()), new anchor.BN(minProceedsFloor.floor().toString()), marketAddress, marketStateStruct, allBaseTokens.value[i].pubkey);
            }

        } else if (baseToken.mint.toBase58() != quote.toBase58()) {
            console.log("Closing account:", allBaseTokens.value[i].pubkey.toBase58())
            let txhash = await closeAccount(
                client.connection, // connection
                client.wallet.payer, // payer
                allBaseTokens.value[i].pubkey, // token account which you want to close
                client.wallet.publicKey, // destination
                client.wallet.payer, // owner of token account
            );
            console.log(`Closed account: ${txhash}`);
        }
        //get market address for the mint
        //create deposit account, deposit into deposit account
    }
    //update floors
    //for each deposit account, max borrow, max buy base token

}
main()
async function main() {
    try {

        //load keypair, marketCreator.json
        //check mainnet for keypair is funded
        let keypair = await getSolanaKeypair("presaleScaler")
        const connection = new anchor.web3.Connection("https://rpcdevnet.redao.id/a1fb2ed4-f5df-4688-982b-4fad1944ef0e/");
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
                await runPresaleLooperCleaner(client, new PublicKey(quote))
            } catch (error) {
                console.log(error)
            }
            // await new Promise(r => setTimeout(r, 1000));

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