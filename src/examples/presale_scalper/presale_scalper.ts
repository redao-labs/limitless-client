//get live presales, if no coupons buy for 100 quote tokens
//todo, index all coupons in account state scanner + listener
//get all coupons, claim coupons
//todo, scan all deposit accounts to index them
//get all owned tokens
//todo, add mint -> address search to backend
//get market for each token, get deposit account 
//max deposit into deposit account
//max borrow
//buy with borrowed funds
//max deposit

// import { Keypair } from "@solana/web3.js";
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


async function runPresaleLooper(client: LimitlessSDK, quote: PublicKey) {

    //get all active presales and buy if no coupons
    const res = await fetch(`https://devnet.api.takeoff.lol/livePresales?quoteMint=${quote}&orderBy=presalequote&skip=${0}`);
    const data = await res.json();
    
    console.log(`Fetched ${data.length} active presale markets!`)
    for (let i = 0; i < data.length; i++) {
        let presaleMkt = data[i]
        //check if we got coupons
        let marketAddress = await new PublicKey(presaleMkt.address)
        let marketState = await client.getMarket(marketAddress)
        let coupons = await client.getCoupons(marketAddress, client.wallet.publicKey)
        console.log("Checking market:", marketAddress.toBase58())
        if (coupons[0].length == 0) {
            console.log("No coupons detected, buying!!")
            let associatedQuoteAddress = await getAssociatedTokenAddress(
                quote,
                client.wallet.publicKey
            );
            //no coupons, lets buy some
            let cost = new Decimal(100).mul(10 ** marketState.quoteDecimals);
            //get buyInfo - price impact, new price, maxCost
            let buyPresaleInfo = await client.presaleBuyInfo(cost, marketState)
            console.log("Expected amount that will be added to the presale pool:", buyPresaleInfo.out.div(10 ** marketState.baseDecimals).toString())
            console.log(`Expected new price: ${buyPresaleInfo.newPrice.toString()}. Expected price impact: ${buyPresaleInfo.priceIncrease.toString()}%`)
            console.log(`Expected coupon share of pool: ${buyPresaleInfo.presaleInfo.baseSharePercent}%. Expected base tokens received: ${buyPresaleInfo.presaleInfo.baseShare.toString()}. Average price: ${buyPresaleInfo.presaleInfo.avgPrice.toString()}`)
            //todo expected share this coupons will have
            let presaleBuyRes = await client.presaleBuy(
                new anchor.BN(buyPresaleInfo.out.toString()),
                associatedQuoteAddress,
                marketAddress,
                marketState
            )
            console.log("Presale buy tx:", presaleBuyRes.txid)
        } else {
            console.log("Already have coupons for this market.")
        }
    }

    //get all coupons
    let allCoupons = await client.getAllUserCoupons(client.wallet.publicKey)
    console.log(`Fetched ${allCoupons[0].length} coupons`)
    for (let i = 0; i < allCoupons[0].length; i++) {
        let coupon = allCoupons[0][i]
        let couponKey = allCoupons[1][i]
        let marketAddress = coupon.marketAddress
        let marketState = await client.getMarket(marketAddress)
        console.log("Claiming coupon for market:", marketAddress.toBase58())

        if (Date.now() / 1000 > marketState.launchDate.toNumber()) {
            
            let claimPresaleRes = await client.claimPresale([couponKey], marketAddress, marketState)
            console.log("Claim presale tx:", claimPresaleRes.txid)
        } else {
            console.log("Market not launched yet")
        }
        
    }

    //get all base tokens
    //for each base token, create and deposit into deposit account
    let allBaseTokens = await client.connection.getTokenAccountsByOwner(client.wallet.publicKey, {programId: TOKEN_PROGRAM_ID})
    console.log(`Found ${allBaseTokens.value.length} token accounts`)
    for (let i = 0; i < allBaseTokens.value.length; i++) {
        let baseTokenBuff = allBaseTokens.value[i].account.data
        const baseToken = AccountLayout.decode(baseTokenBuff);

        console.log("Got token account:",  allBaseTokens.value[i].pubkey.toBase58())
        console.log("Balance:", baseToken.amount, "Mint:", baseToken.mint.toBase58())
        if (baseToken.mint.toBase58() != quote.toBase58() && baseToken.amount > BigInt(0)) {
            const marketStateRes = await fetch(`https://devnet.api.takeoff.lol/marketState?baseMintAddress=${baseToken.mint.toBase58()}`);
            const marketState = await marketStateRes.json()
            let marketStateStruct = await client.getMarket(new PublicKey(marketState.address))
            console.log("Market address:", marketState.address)
            //if there is an error the account has already been created
            let createDepositAccountRes = await client.createDepositAccount(new PublicKey(marketState.address))
            console.log("Create deposit account res:", createDepositAccountRes.txid)
            //let depositAccount = await client.getDepositAccount(new PublicKey(marketState.address))
            let depositRes = await client.deposit(new anchor.BN(baseToken.amount.toString()), new PublicKey(marketState.address), marketStateStruct, allBaseTokens.value[i].pubkey)
            console.log("Deposit tx:", depositRes.txid)
        }
        //get market address for the mint

        
        //create deposit account, deposit into deposit account
    }


}
main()
async function main() {
    try {

        //load keypair, marketCreator.json
        //check mainnet for keypair is funded
        let keypair = await getSolanaKeypair("presaleScalper")
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
                await runPresaleLooper(client, new PublicKey(quote))
            } catch (error) {
                
            }
            await new Promise(r => setTimeout(r, 1000));

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