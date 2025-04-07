// import { Keypair } from "@solana/web3.js";
import { existsSync, mkdirSync } from 'fs';
import fs from 'fs';
import base58, * as bs58 from "bs58";
import * as anchor from "@coral-xyz/anchor";
import { Keypair, PublicKey } from '@solana/web3.js';
import { LimitlessSDK } from '../..';
import path from 'path';
import { getAssociatedTokenAddress } from '@solana/spl-token';

async function runCreator(client: LimitlessSDK, connectionUmi: string, quote: PublicKey) {
    //loop all folders in market
    //load the data.json in the folder
    //if the data.json marketDeployed field is false, proceed otherwise skip to next
    //load the cover.png
    //load the logo.png
    //upload cover.png, logo.png, metadata
    //launch the market + vaults
    //add metadata link to the data.json file
    //mark the marketDeployed to true
    //save the data. json
    const marketDir = path.join(process.cwd(), 'markets');
    if (!existsSync(marketDir)) {
        console.error("Market directory not found:", marketDir);
        return;
    }

    const folders = fs.readdirSync(marketDir);
    let index = 0;
    for (const folder of folders) {
        index++;
        if (index > 33) break;
        const folderPath = path.join(marketDir, folder);
        if (!fs.lstatSync(folderPath).isDirectory()) continue;

        const jsonFile = path.join(folderPath, 'data.json');
        if (!existsSync(jsonFile)) {
            console.error(`data.json not found in folder ${folder}`);
            continue;
        }

        let data;
        try {
            data = JSON.parse(fs.readFileSync(jsonFile, 'utf8'));
        } catch (err) {
            console.error(`Error parsing JSON in folder ${folder}:`, err);
            continue;
        }

        if (data.marketDeployed === true) {
            console.log(`Market in folder ${folder} is already deployed.`);
            continue;
        }

        const coverPath = path.join(folderPath, 'cover.png');
        const logoPath = path.join(folderPath, 'logo.png');
        if (!existsSync(coverPath) || !existsSync(logoPath)) {
            console.error(`Missing cover.png or logo.png in folder ${folder}`);
            continue;
        }

        const coverBuffer = fs.readFileSync(coverPath);
        const logoBuffer = fs.readFileSync(logoPath);
        // Proceed with uploading coverBuffer, logoBuffer, and metadata using client functions
        console.log(`Processing market deployment for folder ${folder}`);
        
        console.log("Uploading cover")
        let coverUri = await client.uploadImage(coverBuffer, "cover", "png", "image/png", connectionUmi)
        console.log("Uploading logo")
        let logoUri = await client.uploadImage(logoBuffer, "logo", "png", "image/png", connectionUmi)
        console.log("Uploading metadata")
        let metadataUri = await client.uploadMetadata(
            connectionUmi,
            data.coinName,
            data.coinSymbol,
            data.coinDescription,
            "test.test",
            "test.test",
            "test.test",
            "test.test",
            coverUri,
            logoUri,
            "40",
            "40"
        )

        let associatedQuoteAddress = await getAssociatedTokenAddress(
            quote,
            client.wallet.publicKey
        );
        const start = (Date.now() / 1000) + (60 * 60);
        const presaleOffset = 60 * 30
        let market = await client.createToken(
            associatedQuoteAddress,
            quote,
            start,
            100,
            100,
            2000,
            presaleOffset,
            3000,
            500,
            data.coinName,
            data.coinSymbol,
            metadataUri,
            false,
        )
        // Example: after uploading and obtaining a metadata link, update the data.json file
        data.marketDeployed = true;
        data.marketAddress = market.marketStateAddress.toBase58()
        data.metadataLink = metadataUri;
        fs.writeFileSync(jsonFile, JSON.stringify(data, null, 2), 'utf8');
        await new Promise(r => setTimeout(r, 6000));
    }
    //TODO, claim all fees
}

async function main() {
    try {
        
        //load keypair, marketCreator.json
        //check mainnet for keypair is funded
        let keypair = await getSolanaKeypair("marketCreator")
        const connectionUmi ="https://rpc.redao.id/a1fb2ed4-f5df-4688-982b-4fad1944ef0e/"
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
        const client = new LimitlessSDK(wallet, connection)
        await client.init()
        while (true) {
            await runCreator(client, connectionUmi, new PublicKey(quote))
            break
            await new Promise(r => setTimeout(r, 60000));

        }
        // Schedule periodic scans (every 15 minutes)

    } catch (error) {
        console.error("Error in main function:", error);
    }
}

// Start the scanner
main().catch(err => {
    console.error("Fatal error in market-creator:", err);
    process.exit(1);
});
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
//TODO, meme manifesto? so other AIs can read and rate, also rate images? then buy & sell accordingly