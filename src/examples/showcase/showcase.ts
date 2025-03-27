// import { Keypair } from "@solana/web3.js";
import { existsSync, mkdirSync } from 'fs';
import fs from 'fs';
import base58, * as bs58 from "bs58";
import * as anchor from "@coral-xyz/anchor";
import { Keypair, PublicKey } from '@solana/web3.js';
import { LimitlessSDK } from '../..';
import path from 'path';
import { getAccount, getAssociatedTokenAddress } from '@solana/spl-token';
import { getMarket } from '../../index_old';
import Decimal from 'decimal.js';
//create a market, get the address, creator keeps usdc allocation
//buy presale for market
//update + boost floor
//get coupons - claim presale coupons
//get balance
//deposit max into deposit vault
//get withdrawable - should = deposited
//get borrowable 
//max borrow
//get withdrawable - should be 0
//buy some more coins
//sell coins
//update floor - boost floor
//get loan amt - repay loan
//sell the rest of the coins
//claim creator usdc fees

async function runShowcase(client: LimitlessSDK, quote: PublicKey) {
    //create market with creator allocation
    console.log("Creating market..") 
    let metadataUri = "https://arweave.net/WIqbJviKkddg9xH1Nhb2jD9gGsqR4r27LYqpNuF8Ip8"
    let associatedQuoteAddress = await getAssociatedTokenAddress(
        quote,
        client.wallet.publicKey
    );
    const start = (Date.now() / 1000) + (60 * 6);
    const presaleOffset = 60 * 15
    let market = await client.createToken(
        associatedQuoteAddress,
        quote,
        start,
        100, //buy fee
        100, //sell fee
        2000, //creator split
        presaleOffset,
        3000, //presale fee
        500, //presale split
        "Le showcase",
        "BANTER",
        metadataUri,
        false,
    )
    let marketAddress = market.marketStateAddress
    console.log("Market created with address:", marketAddress.toBase58())
    await new Promise(r => setTimeout(r, 20000));

    let marketState = await client.getMarket(marketAddress)
    //presale date - launch date
    let [startDate, presaleDate] = await client.getMarketDates(marketState.launchDate.toNumber(), marketState.presaleDateOffset.toNumber())
    console.log("Market start date", startDate.toString())
    console.log("Market presale date", presaleDate.toString())

    while(Date.now() / 1000 < presaleDate.getTime() / 1000) {
        console.log("Waiting for presale to start")
        console.log("Seconds until presale:", (Date.now() - presaleDate.getTime()) / 1000)
        await new Promise(r => setTimeout(r, 10000));
    }
    console.log("Presale is live! Buying a presale coupon for 100 quote tokens!")
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
    console.log("Getting presale info..")
    await new Promise(r => setTimeout(r, 20000));
    let coupons = await client.getCoupons(marketAddress, client.wallet.publicKey)
    let couponsQuoteAmt = coupons[0].reduce((sum, coupon) => 
        sum.plus(new Decimal(coupon.quoteDeposited.toString()).dividedBy(new Decimal(10).pow(marketState.quoteDecimals))), 
        new Decimal(0)
    );
    console.log(`Total coupons bought: ${coupons[0].length}. Total quote input: ${couponsQuoteAmt.toString()}`)
    marketState = await client.getMarket(marketAddress)
    let presaleInfo = await client.getPresaleInfo(couponsQuoteAmt, marketState)
    console.log(`Total quote in presale ${presaleInfo.totalQuote.toString()}. Total base in presale ${presaleInfo.totalBase.toString()}`)
    console.log(`Presale expected base receive amount ${presaleInfo.baseShare}. Base share % ${presaleInfo.baseSharePercent.toString()}. Average price ${presaleInfo.avgPrice.toString()}`)
    while(Date.now() / 1000 < startDate.getTime() / 1000) {
        console.log("Waiting for presale to end")
        console.log("Seconds until market launch:", (Date.now() - startDate.getTime()) / 1000)
        await new Promise(r => setTimeout(r, 10000));
    }
    console.log("Market launched! Claiming presale coupons.")
    //claim coupons
    let couponKeys = coupons[1]
    let claimPresaleRes = await client.claimPresale(couponKeys, marketAddress, marketState)
    console.log("Claim presale tx:", claimPresaleRes.txid)
    await new Promise(r => setTimeout(r, 20000));

    //check base token balance
    let baseTokenAddress = await getAssociatedTokenAddress(marketState.baseMintAddress, client.wallet.publicKey)
    let baseBalance = await getAccount(client.connection, baseTokenAddress) 
    console.log("Base token balance:", new Decimal(baseBalance.amount.toString()).div(10 ** marketState.baseDecimals).toString())
    marketState = await client.getMarket(marketAddress)

    //update and boost floor
    let newFloor = await client.getUpdateFloorQuantity(marketState)
    let updateAndBoostFloorRes = await client.updateAndBoostFloor(new anchor.BN(newFloor.toString()), marketAddress, marketState)
    console.log("Update and boost floor tx:", updateAndBoostFloorRes.txid)

    //update and boost againt to realize the boost
    marketState = await client.getMarket(marketAddress)
    let newFloor1 = await client.getUpdateFloorQuantity(marketState)
    let updateAndBoostFloorRes1 = await client.updateAndBoostFloor(new anchor.BN(newFloor1.toString()), marketAddress, marketState)
    console.log("Update and boost floor tx1:", updateAndBoostFloorRes1.txid)

    //refresh state
    marketState = await client.getMarket(marketAddress)


    //create deposit account
    console.log("Creating deposit account!")
    let depositAccountRes = await client.createDepositAccount(marketAddress)
    console.log("Create deposit account tx:", depositAccountRes.txid)
    await new Promise(r => setTimeout(r, 20000));

    //get deposit account //TODO clean deposit account struct with all the interest stuff
    let depositAccount = await client.getDepositAccount(marketAddress)
    console.log("Deposit account base tokens deposited", depositAccount.totalDepositBase.toString())
    await new Promise(r => setTimeout(r, 20000));

    //deposit base tokens
    console.log(`Depositing ${baseBalance.amount / BigInt(10 ** marketState.baseDecimals)} into deposit account.`)
    let depositIntoAccountRes = await client.deposit(new anchor.BN(baseBalance.amount.toString()), marketAddress, marketState, baseTokenAddress)
    console.log("Deposit tx:", depositIntoAccountRes.txid)
    await new Promise(r => setTimeout(r, 20000));

    //check deposited balance
    depositAccount = await client.getDepositAccount(marketAddress)
    console.log("Deposit account base tokens deposited", new Decimal(depositAccount.totalDepositBase.toString()).div(10 ** marketState.baseDecimals).toString())
    marketState = await client.getMarket(marketAddress)
    console.log("Floor price:", new Decimal(marketState.floorPrice.toString()).div(10 ** (marketState.quoteDecimals + marketState.baseDecimals)))
    await new Promise(r => setTimeout(r, 20000));
    

    //get withdrawable
    let withdrawableAmount = await client.getWithdrawableAmount(depositAccount, marketState);
    console.log("Withdrawable amount:", withdrawableAmount.div(10 ** marketState.baseDecimals).toString())
    
    //get borrowable 
    let borrowableAmount = await client.getBorrowableAmount(depositAccount, marketState);
    console.log("Borrowable amount:", borrowableAmount.div(10 ** marketState.quoteDecimals).toString())

    //max borrow
    let borrowRes = await client.borrow(new anchor.BN(borrowableAmount.floor().toString()), marketAddress, marketState, associatedQuoteAddress)
    console.log("Borrow tx:", borrowRes.txid)
    await new Promise(r => setTimeout(r, 20000));

    //check borrowed
    depositAccount = await client.getDepositAccount(marketAddress)
    console.log("Total borrowed:", new Decimal(depositAccount.totalBorrowQuote.toString()).div(10 ** marketState.quoteDecimals).toString())

    //get withdrawable
    withdrawableAmount = await client.getWithdrawableAmount(depositAccount, marketState);
    console.log("Withdrawable amount:", withdrawableAmount.div(10 ** marketState.baseDecimals).toString())
    
    //get borrowable 
    borrowableAmount = await client.getBorrowableAmount(depositAccount, marketState);
    console.log("Borrowable amount:", borrowableAmount.div(10 ** marketState.quoteDecimals).toString())

    //buy some more coins with borrowed funds
    console.log("Buying for", new Decimal(depositAccount.totalBorrowQuote.toString()).div(10 ** marketState.quoteDecimals).toString())
    let buyInfo = await client.buyInfo(new Decimal(depositAccount.totalBorrowQuote.toString()), marketState)
    console.log("Expected amount to receive:", buyInfo.out.toString())
    console.log(`Expected new price: ${buyInfo.newPrice.toString()}. Expected price impact: ${buyInfo.priceIncrease.toString()}`)

    //buy with 1% slippage
    let maxCost = new anchor.BN(new Decimal(depositAccount.totalBorrowQuote.toString()).mul(1.01).floor().toString())
    console.log("Max cost:", new Decimal(maxCost.toString()).div(10 ** marketState.quoteDecimals).toString())
    let buyRes  = await client.buy(new anchor.BN(buyInfo.out.mul(10 ** marketState.baseDecimals).toString()), maxCost, marketAddress, marketState, associatedQuoteAddress)
    console.log("Buy tx:", buyRes.txid)
    await new Promise(r => setTimeout(r, 20000));

    //check balance
    marketState = await client.getMarket(marketAddress)
    baseBalance = await getAccount(client.connection, baseTokenAddress) 
    console.log("Base token balance:", new Decimal(baseBalance.amount.toString()).div(10 ** marketState.baseDecimals).toString())

    //sell tokens
    console.log("Selling tokens:", new Decimal(baseBalance.amount.toString()).div(10 ** marketState.baseDecimals).toString())
    let sellInfo = await client.sellInfo(
        new Decimal(baseBalance.amount.toString()),
        marketState
    )
    console.log(`Sell ammQ: ${sellInfo.sellAmmQ.toString()}. Sell floorQ: ${sellInfo.sellFloorQ.toString()}. TotalQ: ${baseBalance.amount}`)
    console.log(`Amm out: ${sellInfo.outAmm.toString()}. Floor out: ${sellInfo.outFloor.toString()}. Total out: ${baseBalance.amount}`)
    console.log(`Expected new price: ${sellInfo.newPrice.toString()}. Expected price impact: ${sellInfo.priceIncrease.toString()}`)
    let minProceeds = new Decimal(sellInfo.outAmm.mul(10 ** marketState.quoteDecimals)).mul(new Decimal(1).minus(new Decimal(0.01).div(100))).floor()
    console.log("Min proceeds:", minProceeds.toString())
    let sellRes = await client.sell(new anchor.BN(sellInfo.sellAmmQ.toString()), new anchor.BN(minProceeds.toString()), marketAddress, marketState, baseTokenAddress)
    console.log("Sell tx:", sellRes.txid)
    await new Promise(r => setTimeout(r, 20000));

    marketState = await client.getMarket(marketAddress)

    //repay loan
    console.log("Repaying loan of:", depositAccount.totalBorrowQuote.toString())
    let repayRes = await client.repay(
        depositAccount.totalBorrowQuote,
        marketAddress,
        marketState,
        associatedQuoteAddress
    )
    console.log("Repay tx:", repayRes.txid)
    await new Promise(r => setTimeout(r, 20000));

    //withdraw 
    depositAccount = await client.getDepositAccount(marketAddress)
    withdrawableAmount = await client.getWithdrawableAmount(depositAccount, marketState);
    console.log("Withdrawing amount:", withdrawableAmount.div(10 ** marketState.baseDecimals).toString())
    let withdrawRes = await client.withdraw(
        new anchor.BN(withdrawableAmount.toString()),
        marketAddress,
        marketState, 
        baseTokenAddress
    )
    console.log("Withdraw res:", withdrawRes.txid)
}
main()
async function main() {
    try {
        
        //load keypair, marketCreator.json
        //check mainnet for keypair is funded
        let keypair = await getSolanaKeypair("showcase")
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
        if (quoteBalance.amount / BigInt(10**6) < 100) {
            console.log("Quote balance too low!")
            return
        }
        const client = new LimitlessSDK(wallet, connection)
        await client.init()
        await runShowcase(client, new PublicKey(quote))

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