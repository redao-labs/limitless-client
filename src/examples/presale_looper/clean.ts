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
            const marketStateRes = await fetch(`http:/localhost:1337/marketState?baseMintAddress=${baseToken.mint.toBase58()}`);
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
            let minProceeds = new Decimal(sellInfo.outAmm.mul(10 ** marketStateStruct.quoteDecimals)).mul(new Decimal(0.9)).floor();
            console.log("Min proceeds:", minProceeds.toString());
            let sellRes = await client.sell(new anchor.BN(sellInfo.sellAmmQ.floor().toString()), new anchor.BN(minProceeds.floor().toString()), marketAddress, marketStateStruct, allBaseTokens.value[i].pubkey);
            if (sellInfo.sellFloorQ.greaterThan(0)) {
                let minProceedsFloor = new Decimal(sellInfo.outFloor.mul(10 ** marketStateStruct.quoteDecimals)).mul(0.9).floor();
                console.log("Min proceeds floor:", minProceedsFloor.toString())
                let sellFloorRes = await client.sellFloor(new anchor.BN(sellInfo.sellFloorQ.toString()), new anchor.BN(minProceedsFloor.floor().toString()), marketAddress, marketStateStruct, allBaseTokens.value[i].pubkey);
            }
        } else if (baseToken.mint.toBase58() != quote.toBase58()) {
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



    //get all deposit accounts
    console.log("Getting deposit accounts")
    let depositAccounts = await client.getAllUserDepositAccounts(client.wallet.publicKey)
    console.log(`Found ${depositAccounts[0].length} deposit accounts.`)
    for (let i = 0; i < depositAccounts[0].length; i++) {
        let depositAccount = depositAccounts[0][i]
        //console.log("Deposit account:", depositAccount)
        let marketAddress = depositAccount.marketStateAddress
        console.log("Market address:", marketAddress.toBase58())
        let marketState = await client.getMarket(marketAddress)
        //console.log("Market state:", marketState)
        //update floor
        //update and boost floor
        let newFloor = await client.getUpdateFloorQuantity(marketState)
        let updateAndBoostFloorRes = await client.updateAndBoostFloor(new anchor.BN(newFloor.toString()), marketAddress, marketState)
        console.log("Update and boost floor tx:", updateAndBoostFloorRes.txid)
        let repayAmt = new Decimal(depositAccount.totalBorrowQuote.toString())
        console.log("Total borrow quote:", repayAmt.toString())
        let baseTokenAddress = await getAssociatedTokenAddress(marketState.baseMintAddress, client.wallet.publicKey)
        let quoteTokenAddress = await getAssociatedTokenAddress(marketState.quoteMintAddress, client.wallet.publicKey)
        try {
            let baseBalance = await getAccount(client.connection, baseTokenAddress)
            let quoteBalance = await getAccount(client.connection, quoteTokenAddress)
            console.log("Base token balance:", new Decimal(baseBalance.amount.toString()).div(10 ** marketState.baseDecimals).toString())
            console.log("Quote token balance:", new Decimal(quoteBalance.amount.toString()).div(10 ** marketState.quoteDecimals).toString())
            if (repayAmt.greaterThan(new Decimal(quoteBalance.amount.toString()))) {
                repayAmt = new Decimal(quoteBalance.amount.toString())
            }
            
            console.log("Repaying loan of:", repayAmt.toString())
            let repayRes = await client.repay(
                new anchor.BN(repayAmt.toString()),
                marketAddress,
                marketState,
                quoteTokenAddress
            )
            let withdrawableAmount = await client.getWithdrawableAmount(depositAccount, marketState);
            console.log("Withdrawable amount:", withdrawableAmount.div(10 ** marketState.baseDecimals).toString())
            let withdrawRes = await client.withdraw(
                new anchor.BN(withdrawableAmount.floor().toString()),
                marketAddress,
                marketState,
                baseTokenAddress
            )
            console.log("Withdraw tx", withdrawRes.txid)
            if (new Decimal(depositAccount.totalBorrowQuote.toString()).equals(0) && withdrawableAmount.equals(0) && new Decimal(depositAccount.totalDepositBase.toString()).equals(0)) {
                console.log("Closing account:", baseTokenAddress.toBase58())
                let txhash = await closeAccount(
                    client.connection, // connection
                    client.wallet.payer, // payer
                    baseTokenAddress, // token account which you want to close
                    client.wallet.publicKey, // destination
                    client.wallet.payer, // owner of token account
                );
                console.log(`Closed account: ${txhash}`);
                console.log("Closing deposit account")
                let tryCloseAcc = await client.closeDepositAccount(marketAddress)

            }
        } catch (error) {
            console.log(error)
            console.log("No token account found!")
            console.log("Closing deposit account")
            let tryCloseAcc = await client.closeDepositAccount(marketAddress)

        }
    }
    //update floors
    //for each deposit account, max borrow, max buy base token

}
main()
async function main() {
    try {

        //load keypair, marketCreator.json
        //check mainnet for keypair is funded
        let keypair = await getSolanaKeypair("presaleLooper")
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