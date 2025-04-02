import * as anchor from '@coral-xyz/anchor';
import { Limitless } from './limitless';
import { MarketState } from './interfaces';
import {
    BASE_ADDRESS,
    createIx,
    createVaultsIxes,
    claimFeesIx,
    claimBaseAllocationIx,
    presaleBuyIx,
    claimPresaleIx,
    buyIx,
    buyIxCreator,
    sellIx,
    sellFloorIx,
    createDepositAccountIx,
    depositIx,
    withdrawIx,
    borrowIx,
    repayIx,
    createProgramConnection,
    boostFloorIx,
    updateFloorIx,
    lookupLimitUp,
    getPrice,
    quantityFromProceedsWPrice,
    floorProceedsWPrice,
    findRoot,
    floorProceeds,
    lookupLimitDown,
    lookupLimitDownWithOutput
} from './ix-builder';
import {
    Connection,
    ComputeBudgetProgram,
    PublicKey,
    TransactionInstruction,
    TransactionMessage,
    VersionedTransaction,
    ParsedTransactionWithMeta
} from '@solana/web3.js';
import {
    TOKEN_PROGRAM_ID,
    createAssociatedTokenAccountInstruction,
    getAccount,
    getAssociatedTokenAddress
} from '@solana/spl-token';
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { walletAdapterIdentity } from '@metaplex-foundation/umi-signer-wallet-adapters';
import { mplTokenMetadata } from '@metaplex-foundation/mpl-token-metadata';
import { irysUploader } from '@metaplex-foundation/umi-uploader-irys';
import { createGenericFile, createSignerFromKeypair, Keypair as KP, publicKey } from '@metaplex-foundation/umi';
import Decimal from 'decimal.js';
//smart contract api

type TxProgressCallback = (message: string, type: 'info' | 'success' | 'error') => void;

export class LimitlessSDK {
    program: anchor.Program<Limitless>;
    wallet: anchor.Wallet;
    connection: Connection;

    constructor(
        wallet: anchor.Wallet,
        connection: Connection,
        commitment: anchor.web3.Commitment = "processed"
    ) {
        this.wallet = wallet;
        this.connection = connection;
        this.program = null as any; // Will be initialized in init()
    }
    //TODO, when retrieving the tx, once confirmed return the event log
    //initialize sdk -> create the program
    async init(): Promise<void> {
        try {
            this.program = await createProgramConnection(
                this.wallet,
                { commitment: "processed" },
                this.connection
            );
            return;
        } catch (error) {
            console.error("Failed to initialize SDK:", error);
            throw error;
        }
    }
    async trackTxProgress(
        txid: string,
        blockhash: any,
        callback?: TxProgressCallback
    ): Promise<boolean> {
        if (!this.program) throw new Error("Program not initialized");

        let confirmed: ParsedTransactionWithMeta | null = null;
        let confBool = false;
        let confirmWaitCount = 0;

        while (true) {
            try {
                confirmed = await this.program.provider.connection.getParsedTransaction(
                    txid,
                    { commitment: "confirmed", maxSupportedTransactionVersion: 0 }
                );

                const blockheight = await this.program.provider.connection.getBlockHeight();

                if (confirmed != null && confirmed?.meta?.err == null) {
                    console.log('Transaction completed!');
                    if (callback) callback('Transaction completed!', 'success');
                    confBool = true;
                    break;
                } else if (confirmed != null && confirmed?.meta?.err != null) {
                    console.log('Transaction error!');
                    if (callback) callback(`Transaction error: ${JSON.stringify(confirmed.meta.err)}`, 'error');
                    break;
                } else if (confirmed == null && blockheight > blockhash.lastValidBlockHeight) {
                    console.log("Transaction abandoned!");
                    if (callback) callback("Transaction abandoned due to timeout", 'error');
                    break;
                }

                confirmWaitCount++;
                if (confirmWaitCount > 3) {
                    let blocksLeft = blockhash.lastValidBlockHeight - blockheight;
                    if (callback) callback(`Confirming transaction... Tx will be abandoned in ${blocksLeft} blocks`, 'info');
                }
            } catch (e) {
                console.log(e);
                break;
            }
            await new Promise(r => setTimeout(r, 1000));
        }
        return confBool;
    }
    async buildAndSendTransaction(
        instructions: TransactionInstruction[],
        callback?: TxProgressCallback
    ): Promise<{ txid: string; confirmed: boolean }> {
        if (!this.wallet.publicKey) throw new Error("Wallet not connected");
        if (!this.program) throw new Error("Program not initialized");

        try {
            if (callback) callback("Building transaction...", 'info');

            const blockhash = await this.connection.getLatestBlockhash();

            const messageV0 = new TransactionMessage({
                payerKey: this.wallet.publicKey,
                recentBlockhash: blockhash.blockhash,
                instructions: instructions,
            }).compileToV0Message();

            const transactionV0 = new VersionedTransaction(messageV0);

            if (callback) callback("Signing transaction...", 'info');
            const signedTx = await this.wallet.signTransaction(transactionV0);

            if (callback) callback("Sending transaction...", 'info');
            const txid = await this.connection.sendTransaction(signedTx, { skipPreflight: true });
            console.log("Transaction sent:", txid);

            const confirmed = await this.trackTxProgress(txid, blockhash, callback);

            return { txid, confirmed };
        } catch (error) {
            console.error("Transaction error:", error);
            if (callback) callback(`Error: ${error instanceof Error ? error.message : String(error)}`, 'error');
            throw error;
        }
    }
    //create metadata
    async uploadImage(
        fileBuff: Buffer,
        fileName: string,
        fileType: string,
        contentType: string,
        rpcUrl: string
    ): Promise<string> {
        if (!this.program) throw new Error("Program not initialized");
        const mKeypair: KP = { publicKey: publicKey(this.wallet.payer.publicKey.toBase58()), secretKey: this.wallet.payer.secretKey }
        const umi = createUmi(rpcUrl)
            // .use(walletAdapterIdentity(this.wallet.payer))
            .use(mplTokenMetadata())
            .use(irysUploader());
        const signerKp = createSignerFromKeypair(umi, mKeypair)
        umi.identity = signerKp
        umi.payer = signerKp
        if (fileBuff) {
            // Wrap FileReader in a Promise to await the file reading.
            // const fileBuffer: ArrayBuffer = await new Promise((resolve, reject) => {
            //     const reader = new FileReader();
            //     reader.onload = () => {
            //         // Resolve with the file data when reading is complete.
            //         resolve(reader.result as ArrayBuffer);
            //     };
            //     reader.onerror = () => {
            //         // Reject if there is an error.
            //         reject(reader.error);
            //     };
            //     reader.readAsArrayBuffer(imageFile);
            // });

            // const fileBuff = new Uint8Array(fileBuffer);


            // Create the generic file using the file buffer.
            let genericFile = createGenericFile(fileBuff, `${fileName}.${fileType}`, {
                displayName: fileName,
                contentType: contentType,
                extension: fileType,
            });

            // Upload the file using the umi uploader.
            const [imageUri] = await umi.uploader.upload([genericFile]);
            return imageUri
        }

        throw new Error("No image file provided");
    };
    async uploadMetadata(
        rpcUrl: string,
        name: string,
        symbol: string,
        description: string,
        website: string,
        telegram: string,
        x: string,
        discord: string,
        coverUri: string,
        logoUri: string,
        coverYPos: string,
        logoYPos: string
    ): Promise<string> {
        if (!this.program) throw new Error("Program not initialized");
        try {
            let metadata = {
                "name": `${name}`,
                "symbol": `${symbol}`,
                "description": `${description}`,
                "image": `${logoUri}`,
                "website": `${website}`,
                "telegram": `${telegram}`,
                "twitter": `${x}`,
                "x": `${x}`,
                "discord": `${discord}`,
                "attributes": [
                    {
                        "trait_type": "cover_photo",
                        "value": `${coverUri}`
                    },
                    {
                        "trait_type": "cover_photo_pos",
                        "value": `${coverYPos}`
                    },
                    {
                        "trait_type": "logo_pos",
                        "value": `${logoYPos}`
                    }
                ]
            }
            const mKeypair: KP = { publicKey: publicKey(this.wallet.payer.publicKey.toBase58()), secretKey: this.wallet.payer.secretKey }
            const umi = createUmi(rpcUrl).use(walletAdapterIdentity(this.wallet.payer)).use(mplTokenMetadata()).use(irysUploader());
            const signerKp = createSignerFromKeypair(umi, mKeypair)
            umi.identity = signerKp
            umi.payer = signerKp
            const jsonUri = await umi.uploader.uploadJson(metadata)
            return jsonUri
        } catch (e: any) {
            console.log(e)
        }
    }
    //create market
    async createToken(
        userQuoteTokenAddress: PublicKey,
        quoteMint: PublicKey,
        startTime: number,
        buyFee: number,
        sellFee: number,
        creatorSplitFee: number,
        presaleOffset: number,
        presaleFee: number,
        presaleSplit: number,
        name: string,
        ticker: string,
        metadataUri: string,
        baseSplit: boolean,
        callback?: TxProgressCallback
    ): Promise<{ txid: string; confirmed: boolean; marketStateAddress: PublicKey }> {
        if (!this.program) throw new Error("Program not initialized");
        if (!this.wallet.publicKey) throw new Error("Wallet not connected");

        try {
            if (callback) callback("Creating token...", 'info');

            const MARKET_ID = Math.random().toString(36).slice(2, 8).toUpperCase();

            let ixes: TransactionInstruction[] = [];
            ixes.push(ComputeBudgetProgram.setComputeUnitLimit({ units: 1_200_000 }));

            const createIxRes = await createIx(
                this.wallet.publicKey,
                this.program,
                userQuoteTokenAddress,
                quoteMint,
                startTime,
                buyFee,
                sellFee,
                creatorSplitFee,
                presaleOffset,
                presaleFee,
                presaleSplit,
                name,
                ticker,
                metadataUri,
                MARKET_ID,
                baseSplit
            );

            const createVaultsIxRes = await createVaultsIxes(
                this.wallet.publicKey,
                this.program,
                quoteMint,
                MARKET_ID
            );

            ixes.push(createIxRes);
            ixes.push(...createVaultsIxRes);

            const { txid, confirmed } = await this.buildAndSendTransaction(ixes, callback);

            const marketBaseAddress = new PublicKey(BASE_ADDRESS);
            const [marketStateAddress] = await anchor.web3.PublicKey.findProgramAddress(
                [marketBaseAddress.toBuffer(), Buffer.from(MARKET_ID)],
                this.program.programId
            );

            return { txid, confirmed, marketStateAddress };
        } catch (error) {
            console.error("Create token error:", error);
            if (callback) callback(`Error creating token: ${error instanceof Error ? error.message : String(error)}`, 'error');
            throw error;
        }
    }
    //creator claim fees 
    async claimFees(
        marketState: any,
        callback?: TxProgressCallback
    ): Promise<{ txid: string; confirmed: boolean }> {
        if (!this.program) throw new Error("Program not initialized");
        if (!this.wallet.publicKey) throw new Error("Wallet not connected");

        try {
            if (callback) callback("Preparing to claim fees...", 'info');

            const associatedQuoteAddress = await getAssociatedTokenAddress(
                new PublicKey(marketState.quotemintaddress),
                this.wallet.publicKey
            );

            let ixes: TransactionInstruction[] = [];
            ixes.push(ComputeBudgetProgram.setComputeUnitLimit({ units: 1_200_000 }));

            // Check if quote token account exists and create if needed
            try {
                await getAccount(this.connection, associatedQuoteAddress);
            } catch (error) {
                // If account doesn't exist, create it
                const quoteIns = createAssociatedTokenAccountInstruction(
                    this.wallet.publicKey,
                    associatedQuoteAddress,
                    this.wallet.publicKey,
                    new PublicKey(marketState.quotemintaddress)
                );
                ixes.push(quoteIns);
            }

            const claimIx = await claimFeesIx(
                associatedQuoteAddress,
                new PublicKey(marketState.address),
                this.program
            );
            ixes.push(claimIx);

            return await this.buildAndSendTransaction(ixes, callback);
        } catch (error) {
            console.error("Claim fees error:", error);
            if (callback) callback(`Error claiming fees: ${error instanceof Error ? error.message : String(error)}`, 'error');
            throw error;
        }
    }
    //creator claim base allocation
    async claimBaseAllocation(
        marketState: any,
        callback?: TxProgressCallback
    ): Promise<{ txid: string; confirmed: boolean }> {
        if (!this.program) throw new Error("Program not initialized");
        if (!this.wallet.publicKey) throw new Error("Wallet not connected");

        try {
            if (callback) callback("Preparing to claim allocation...", 'info');

            const associatedBaseAddress = await getAssociatedTokenAddress(
                new PublicKey(marketState.basemintaddress),
                this.wallet.publicKey
            );

            let ixes: TransactionInstruction[] = [];
            ixes.push(ComputeBudgetProgram.setComputeUnitLimit({ units: 1_200_000 }));

            // Check if base token account exists and create if needed
            try {
                await getAccount(this.connection, associatedBaseAddress);
            } catch (error) {
                // If account doesn't exist, create it
                const baseIns = createAssociatedTokenAccountInstruction(
                    this.wallet.publicKey,
                    associatedBaseAddress,
                    this.wallet.publicKey,
                    new PublicKey(marketState.basemintaddress)
                );
                ixes.push(baseIns);
            }

            const claimIx = await claimBaseAllocationIx(
                this.wallet.publicKey,
                new PublicKey(marketState.address),
                associatedBaseAddress,
                this.program
            );
            ixes.push(claimIx);

            return await this.buildAndSendTransaction(ixes, callback);
        } catch (error) {
            console.error("Claim base allocation error:", error);
            if (callback) callback(`Error claiming allocation: ${error instanceof Error ? error.message : String(error)}`, 'error');
            throw error;
        }
    }
    //creator buy
    async creatorBuy(
        quantity: anchor.BN,
        maxCost: anchor.BN,
        userQuoteToken: PublicKey,
        market: PublicKey,
        marketState: any,
        callback?: TxProgressCallback
    ): Promise<{ txid: string; confirmed: boolean }> {
        // Build creator buy instruction
        const instructions = [
            ComputeBudgetProgram.setComputeUnitLimit({ units: 1_200_000 }),

        ];
        const ix = await buyIxCreator(
            quantity,
            maxCost,
            this.wallet.publicKey,
            userQuoteToken,
            market,
            marketState,
            this.program
        )
        instructions.push(ix)
        return await this.buildAndSendTransaction(instructions, callback);
    }
    //presale buy
    async presaleBuyInfo(
        cost: Decimal,
        marketState: (typeof this.program.account.marketState['fetch']) extends (...args: any) => Promise<infer T> ? T : never
    ): Promise<{ out: Decimal; newPrice: Decimal; priceIncrease: Decimal; presaleInfo: { totalQuote: Decimal; totalBase: Decimal; baseShare: Decimal; baseSharePercent: Decimal, avgPrice: Decimal } }> {
        let costPostFee = cost.div(new Decimal(1).plus(new Decimal(0.001)).plus(new Decimal(marketState.presaleFee).div(10000))).mul(new Decimal(0.999999687))
        let newCqd = (await lookupLimitUp(
            new Decimal(costPostFee),
            new Decimal(1.5), //todo get from state
            new Decimal(marketState.cqd.toString()),
            new Decimal(marketState.quoteDecimals + marketState.scalerDecimals),
            new Decimal(marketState.divisorPow),
            new Decimal(marketState.pow1),
            new Decimal(marketState.pow2)
        )).floor()
        let cqdDiff = newCqd.sub(marketState.cqd.toString())
        marketState.presaleQuote = new anchor.BN(new Decimal(marketState.presaleQuote.toString()).add(costPostFee).floor().toString())
        marketState.presaleBase = new anchor.BN(new Decimal(marketState.presaleBase.toString()).add(cqdDiff).floor().toString())
        let presaleInfo = await this.getPresaleInfo(costPostFee.div(new Decimal(10).pow(marketState.quoteDecimals)), marketState)
        let out = cqdDiff//.div(Math.pow(10, marketState.baseDecimals))
        let oldPrice = (await getPrice(
            new Decimal(marketState.cqd.toString()),
            new Decimal(1.5),
            new Decimal(marketState.divisorPow),
            new Decimal(marketState.gradient.toString()),
            new Decimal(marketState.offset.toString())
        )).div(10 ** (marketState.quoteDecimals + marketState.scalerDecimals))
        let newPrice = (await getPrice(
            new Decimal(newCqd.toString()),
            new Decimal(1.5),
            new Decimal(marketState.divisorPow),
            new Decimal(marketState.gradient.toString()),
            new Decimal(marketState.offset.toString())
        )).div(10 ** (marketState.quoteDecimals + marketState.scalerDecimals))
        let priceIncrease = newPrice.sub(oldPrice).div(oldPrice).mul(100)
        return { out, newPrice, priceIncrease, presaleInfo }
    }
    async presaleBuy(
        quantity: anchor.BN,
        userQuoteToken: PublicKey,
        market: PublicKey,
        marketState: (typeof this.program.account.marketState['fetch']) extends (...args: any) => Promise<infer T> ? T : never,
        callback?: TxProgressCallback
    ): Promise<{ txid: string; confirmed: boolean }> {
        // Build presale buy instruction
        const instructions = [
            ComputeBudgetProgram.setComputeUnitLimit({ units: 1_200_000 }),

        ];
        const ix = await presaleBuyIx(
            quantity,
            new anchor.BN(100),
            this.wallet.publicKey,
            userQuoteToken,
            market,
            marketState,
            this.program
        );
        instructions.push(ix)
        return await this.buildAndSendTransaction(instructions, callback);
    }
    async claimPresale(
        couponAddresses: PublicKey[],
        market: PublicKey,
        marketState: (typeof this.program.account.marketState['fetch']) extends (...args: any) => Promise<infer T> ? T : never,
        callback?: TxProgressCallback
    ): Promise<{ txid: string; confirmed: boolean }> {
        if (!this.program) throw new Error("Program not initialized");
        if (!this.wallet.publicKey) throw new Error("Wallet not connected");
        try {
            if (callback) callback("Preparing to claim presale tokens...", 'info');

            // Limit to maximum 10 coupons per transaction to avoid exceeding transaction size limits
            const maxCouponsPerTx = 10;
            const batchSize = Math.min(couponAddresses.length, maxCouponsPerTx);
            let associatedBaseAddress = await getAssociatedTokenAddress(marketState.baseMintAddress, this.wallet.publicKey);
            let userBaseToken = null;
            try {
                userBaseToken = await getAccount(this.program.provider.connection, associatedBaseAddress);
            } catch (error) {

            }
            const instructions: TransactionInstruction[] = [
                ComputeBudgetProgram.setComputeUnitLimit({ units: 1_200_000 })
            ];
            if (!userBaseToken) {
                let baseIns = await createAssociatedTokenAccountInstruction(
                    this.wallet.publicKey,
                    associatedBaseAddress,
                    this.wallet.publicKey,
                    marketState.baseMintAddress
                )
                instructions.push(baseIns)
            }
            // Create claim instruction for each coupon address (up to the batch limit)
            for (let i = 0; i < batchSize; i++) {
                const couponIx = await claimPresaleIx(
                    couponAddresses[i],
                    this.wallet.publicKey,
                    associatedBaseAddress,
                    market,
                    marketState,
                    this.program
                );
                instructions.push(couponIx);
            }
            return await this.buildAndSendTransaction(instructions, callback);
        } catch (error) {
            console.error("Claim presale error:", error);
            if (callback) callback(`Error claiming presale tokens: ${error instanceof Error ? error.message : String(error)}`, 'error');
            throw error;
        }
    }
    async buyInfo(
        cost: Decimal,
        marketState: (typeof this.program.account.marketState['fetch']) extends (...args: any) => Promise<infer T> ? T : never
    ): Promise<{ out: Decimal; newPrice: Decimal; priceIncrease: Decimal; }> {
        let costPostFee = cost.div(new Decimal(1).plus(new Decimal(0.001)).plus(new Decimal(marketState.buyFee).div(10000))).mul(new Decimal(0.999999687))
        let newCqd = (await lookupLimitUp(
            new Decimal(costPostFee),
            new Decimal(1.5), //todo get from state
            new Decimal(marketState.cqd.toString()),
            new Decimal(marketState.quoteDecimals + marketState.scalerDecimals),
            new Decimal(marketState.divisorPow),
            new Decimal(marketState.pow1),
            new Decimal(marketState.pow2)
        )).floor()
        let cqdDiff = newCqd.sub(marketState.cqd.toString())
        let out = cqdDiff.div(Math.pow(10, marketState.baseDecimals))
        let oldPrice = (await getPrice(
            new Decimal(marketState.cqd.toString()),
            new Decimal(1.5),
            new Decimal(marketState.divisorPow),
            new Decimal(marketState.gradient.toString()),
            new Decimal(marketState.offset.toString())
        )).div(10 ** (marketState.quoteDecimals + marketState.scalerDecimals))
        let newPrice = (await getPrice(
            new Decimal(newCqd.toString()),
            new Decimal(1.5),
            new Decimal(marketState.divisorPow),
            new Decimal(marketState.gradient.toString()),
            new Decimal(marketState.offset.toString())
        )).div(10 ** (marketState.quoteDecimals + marketState.scalerDecimals))
        let priceIncrease = newPrice.sub(oldPrice).div(oldPrice).mul(100)
        return { out, newPrice, priceIncrease }
    }
    async buy(
        quantity: anchor.BN,
        maxCost: anchor.BN,
        market: PublicKey,
        marketState: (typeof this.program.account.marketState['fetch']) extends (...args: any) => Promise<infer T> ? T : never,
        userQuoteToken: PublicKey,
        callback?: TxProgressCallback
    ): Promise<{ txid: string; confirmed: boolean }> {
        let associatedBaseAddress = await getAssociatedTokenAddress(marketState.baseMintAddress, this.wallet.publicKey);
        let userBaseToken = null;
        try {
            userBaseToken = await getAccount(this.program.provider.connection, associatedBaseAddress);
        } catch (error) {

        }
        const instructions = [
            ComputeBudgetProgram.setComputeUnitLimit({ units: 1_200_000 }),

        ];
        if (!userBaseToken) {
            let baseIns = await createAssociatedTokenAccountInstruction(
                this.wallet.publicKey,
                associatedBaseAddress,
                this.wallet.publicKey,
                marketState.baseMintAddress
            )
            instructions.push(baseIns)
        }
        const ix = await buyIx(
            quantity,
            maxCost,
            this.wallet.publicKey,
            associatedBaseAddress,
            userQuoteToken,
            market,
            this.program,
            marketState
        );
        instructions.push(ix)
        return await this.buildAndSendTransaction(instructions, callback);
    }
    async sellWithOutputInfo(
        proceeds: Decimal,
        marketState: (typeof this.program.account.marketState['fetch']) extends (...args: any) => Promise<infer T> ? T : never
    ): Promise<Decimal> {
        let proceedsProtocolFee = proceeds.sub(proceeds.mul(new Decimal(1).sub(new Decimal(0.001))))
        let proceedsSellFee = proceeds.sub(proceeds.mul(new Decimal(1).sub(new Decimal(marketState.sellFee).div(10000))))
        proceeds = proceeds.add(proceedsProtocolFee.add(proceedsSellFee))
        let newCqd = (await lookupLimitDownWithOutput(
          proceeds,
          new Decimal(1.5), //todo get from state
          new Decimal(marketState.cqd.toString()),
          new Decimal(marketState.quoteDecimals + marketState.scalerDecimals),
          new Decimal(marketState.divisorPow),
          new Decimal(marketState.pow1),
          new Decimal(marketState.pow2)
        )).floor()
        let cqdDiff = new Decimal(marketState.cqd.toString()).sub(newCqd).mul(0.99975426466)
        let cqdDiffNorm = cqdDiff.div(Math.pow(10, marketState.baseDecimals))
        return cqdDiffNorm
    }
    async sellInfo(
        quantity: Decimal,
        marketState: (typeof this.program.account.marketState['fetch']) extends (...args: any) => Promise<infer T> ? T : never
    ): Promise<{ out: Decimal; outAmm: Decimal; outFloor: Decimal; sellAmmQ: Decimal; sellFloorQ: Decimal; newPrice: Decimal; priceIncrease: Decimal; }> {
        let newCqd = new Decimal(marketState.cqd.toString()).sub(quantity)
        let floorQ = new Decimal(marketState.highestFloorQuantity.toString()).sub(newCqd)
        if (new Decimal(marketState.highestFloorQuantity.toString()).greaterThan(marketState.cqd.toString())) {
            floorQ = quantity
        }
        let floorQuoteOut = new Decimal(0)
        if (floorQ.greaterThan(0)) {
            newCqd = new Decimal(marketState.highestFloorQuantity.toString())
            floorQuoteOut = await floorProceeds(
                new Decimal(marketState.highestFloorQuantity.toString()),
                floorQ,
                new Decimal(marketState.gradient.toString()),
                new Decimal(marketState.divisorPow),
                marketState.offset,
                marketState.quoteDecimals + marketState.scalerDecimals
            )
        }
        let quoteOut = (await lookupLimitDown(
            new Decimal(1.5), //todo get from state
            newCqd,
            new Decimal(marketState.cqd.toString()),
            new Decimal(marketState.divisorPow),
            new Decimal(marketState.pow1),
            new Decimal(marketState.pow2)
        )).floor()
        let totalQuoteOut = quoteOut.mul(new Decimal(1).sub(new Decimal(0.001)).sub(new Decimal(marketState.sellFee).div(10000))).mul(new Decimal(1).div(0.999989577))
        let outputVal = totalQuoteOut.div(new Decimal(10).pow(marketState.quoteDecimals + marketState.scalerDecimals + marketState.quoteDecimals))
        if (floorQ.greaterThan(0)) {
            console.log("floorQ, floorout", floorQ.toString(), floorQuoteOut.toString())
            outputVal = outputVal.add(floorQuoteOut.div(10 ** marketState.quoteDecimals))
            if (new Decimal(marketState.highestFloorQuantity.toString()).greaterThan(marketState.cqd.toString())) {
                outputVal = floorQuoteOut.div(10 ** marketState.quoteDecimals)
            }
        }
        let oldPrice = (await getPrice(
            new Decimal(marketState.cqd.toString()),
            new Decimal(1.5),
            new Decimal(marketState.divisorPow || 0),
            new Decimal(marketState.gradient.toString()),
            new Decimal(marketState.offset.toString())
        )).div(10 ** (marketState.baseDecimals + marketState.scalerDecimals))
        let newPrice = (await getPrice(
            new Decimal(newCqd.toString()),
            new Decimal(1.5),
            new Decimal(marketState.divisorPow || 0),
            new Decimal(marketState.gradient.toString()),
            new Decimal(marketState.offset.toString())
        )).div(10 ** (marketState.baseDecimals + marketState.scalerDecimals))
        let priceIncrease = newPrice.sub(oldPrice).div(oldPrice).mul(100)
        //sell amm q, sell floor q, amm out, floor out, new price, price increase
        let sellAmmQ = new Decimal(marketState.cqd.toString()).sub(newCqd)
        let sellFloorQ = quantity.sub(sellAmmQ)
        let totalOut = outputVal
        let ammOut = totalQuoteOut.div(new Decimal(10).pow(marketState.quoteDecimals + marketState.scalerDecimals + marketState.quoteDecimals))
        let floorOut = floorQuoteOut.div(10 ** marketState.quoteDecimals)
        return {
            out: totalOut,
            outAmm: ammOut,
            outFloor: floorOut,
            sellAmmQ: sellAmmQ,
            sellFloorQ: sellFloorQ,
            newPrice: newPrice,
            priceIncrease: priceIncrease
        }
    }
    async sell(
        quantity: anchor.BN,
        minProceeds: anchor.BN,
        market: PublicKey,
        marketState: (typeof this.program.account.marketState['fetch']) extends (...args: any) => Promise<infer T> ? T : never,
        userBaseToken: PublicKey,
        callback?: TxProgressCallback
    ): Promise<{ txid: string; confirmed: boolean }> {
        let associatedQuoteAddress = await getAssociatedTokenAddress(marketState.quoteMintAddress, this.wallet.publicKey);
        let userQuoteToken = null;
        try {
            userQuoteToken = await getAccount(this.program.provider.connection, associatedQuoteAddress);
        } catch (error) {

        }
        const instructions = [
            ComputeBudgetProgram.setComputeUnitLimit({ units: 1_200_000 })
        ];
        if (!userQuoteToken) {
            let quoteIns = await createAssociatedTokenAccountInstruction(
                this.wallet.publicKey,
                associatedQuoteAddress,
                this.wallet.publicKey,
                marketState.quoteMintAddress
            )
            console.log("pushed base xie")
            instructions.push(quoteIns)
        }
        const ix = await sellIx(
            quantity,
            minProceeds,
            this.wallet.publicKey,
            userBaseToken,
            associatedQuoteAddress,
            market,
            marketState,
            this.program
        );
        instructions.push(ix)
        return await this.buildAndSendTransaction(instructions, callback);
    }
    async sellFloor(
        quantity: anchor.BN,
        minProceeds: anchor.BN,
        market: PublicKey,
        marketState: (typeof this.program.account.marketState['fetch']) extends (...args: any) => Promise<infer T> ? T : never,
        userBaseToken: PublicKey,
        callback?: TxProgressCallback
    ): Promise<{ txid: string; confirmed: boolean }> {
        let associatedQuoteAddress = await getAssociatedTokenAddress(marketState.quoteMintAddress, this.wallet.publicKey);
        let userQuoteToken = null;
        try {
            userQuoteToken = await getAccount(this.program.provider.connection, associatedQuoteAddress);
        } catch (error) {

        }
        const instructions = [
            ComputeBudgetProgram.setComputeUnitLimit({ units: 1_200_000 })
        ];
        if (!userQuoteToken) {
            let quoteIns = await createAssociatedTokenAccountInstruction(
                this.wallet.publicKey,
                associatedQuoteAddress,
                this.wallet.publicKey,
                marketState.quoteMintAddress
            )
            console.log("pushed base xie")
            instructions.push(quoteIns)
        }
        const ix = await sellFloorIx(
            quantity,
            minProceeds,
            this.wallet.publicKey,
            userBaseToken,
            userQuoteToken,
            market,
            marketState,
            this.program,
        );
        instructions.push(ix)
        return await this.buildAndSendTransaction(instructions, callback);
    }
    //todo sellWithFloor
    async createDepositAccount(
        market: PublicKey,
        callback?: TxProgressCallback
    ): Promise<{ txid: string; confirmed: boolean }> {
        const ix = await createDepositAccountIx(
            this.wallet.publicKey,
            market,
            this.program
        );
        const instructions = [
            ComputeBudgetProgram.setComputeUnitLimit({ units: 1_200_000 }),
            ix
        ];
        return await this.buildAndSendTransaction(instructions, callback);
    }
    async deposit(
        amount: anchor.BN,
        market: PublicKey,
        marketState: (typeof this.program.account.marketState['fetch']) extends (...args: any) => Promise<infer T> ? T : never,
        userBaseTokenAddress: PublicKey,
        callback?: TxProgressCallback
    ): Promise<{ txid: string; confirmed: boolean }> {
        const ix = await depositIx(
            amount,
            this.wallet.publicKey,
            market,
            marketState,
            this.program,
            userBaseTokenAddress
        );
        const instructions = [
            ComputeBudgetProgram.setComputeUnitLimit({ units: 1_200_000 }),
            ix
        ];
        return await this.buildAndSendTransaction(instructions, callback);
    }
    async withdraw(
        amount: anchor.BN,
        market: PublicKey,
        marketState: (typeof this.program.account.marketState['fetch']) extends (...args: any) => Promise<infer T> ? T : never,
        userBaseTokenAddress: PublicKey,
        callback?: TxProgressCallback
    ): Promise<{ txid: string; confirmed: boolean }> {
        const ix = await withdrawIx(
            amount,
            this.wallet.publicKey,
            market,
            marketState,
            this.program,
            userBaseTokenAddress,
        );
        const instructions = [
            ComputeBudgetProgram.setComputeUnitLimit({ units: 1_200_000 }),
            ix
        ];
        return await this.buildAndSendTransaction(instructions, callback);
    }
    async borrow(
        amount: anchor.BN,
        market: PublicKey,
        marketState: (typeof this.program.account.marketState['fetch']) extends (...args: any) => Promise<infer T> ? T : never,
        userQuoteTokenAddress: PublicKey,
        callback?: TxProgressCallback
    ): Promise<{ txid: string; confirmed: boolean }> {
        const ix = await borrowIx(
            amount,
            this.wallet.publicKey,
            market,
            marketState,
            this.program,
            userQuoteTokenAddress
        );
        const instructions = [
            ComputeBudgetProgram.setComputeUnitLimit({ units: 1_200_000 }),
            ix
        ];
        return await this.buildAndSendTransaction(instructions, callback);
    }
    async repay(
        amount: anchor.BN,
        market: PublicKey,
        marketState: (typeof this.program.account.marketState['fetch']) extends (...args: any) => Promise<infer T> ? T : never,
        userQuoteTokenAddress: PublicKey,
        callback?: TxProgressCallback
    ): Promise<{ txid: string; confirmed: boolean }> {
        const ix = await repayIx(
            amount,
            this.wallet.publicKey,
            market,
            marketState,
            this.program,
            userQuoteTokenAddress
        );
        const instructions = [
            ComputeBudgetProgram.setComputeUnitLimit({ units: 1_200_000 }),
            ix
        ];
        return await this.buildAndSendTransaction(instructions, callback);
    }
    async getUpdateFloorQuantity(
        marketState: (typeof this.program.account.marketState['fetch']) extends (...args: any) => Promise<infer T> ? T : never,
    ): Promise<Decimal> {
        let floorPoolDecimal = new Decimal(marketState.floorPoolSize.toString()).mul(new Decimal(10).pow(marketState.quoteDecimals + marketState.scalerDecimals))
        let floorQ = await findRoot(floorPoolDecimal, new Decimal(marketState.totalBurned.toString()), new Decimal(1.5), new Decimal(marketState.divisorPow)).floor()
        return floorQ
    }
    async updateFloor(
        quantity: anchor.BN,
        market: PublicKey,
        callback?: TxProgressCallback
    ): Promise<{ txid: string; confirmed: boolean }> {
        const ix = await updateFloorIx(
            quantity,
            market,
            this.program
        )
        const instructions = [
            ComputeBudgetProgram.setComputeUnitLimit({ units: 1_200_000 }),
            ix
        ];
        return await this.buildAndSendTransaction(instructions, callback);
    }
    async boostFloor(
        market: PublicKey,
        marketState: (typeof this.program.account.marketState['fetch']) extends (...args: any) => Promise<infer T> ? T : never,
        callback?: TxProgressCallback
    ): Promise<{ txid: string; confirmed: boolean }> {
        const ix = await boostFloorIx(
            market,
            marketState,
            this.program
        )
        const instructions = [
            ComputeBudgetProgram.setComputeUnitLimit({ units: 1_200_000 }),
            ix
        ];
        return await this.buildAndSendTransaction(instructions, callback);
    }
    async updateAndBoostFloor(
        quantity: anchor.BN,
        market: PublicKey,
        marketState: (typeof this.program.account.marketState['fetch']) extends (...args: any) => Promise<infer T> ? T : never,
        callback?: TxProgressCallback
    ): Promise<{ txid: string; confirmed: boolean }> {
        const ixUpdate = await updateFloorIx(
            quantity,
            market,
            this.program
        )
        const ixBoost = await boostFloorIx(
            market,
            marketState,
            this.program
        )
        const instructions = [
            ComputeBudgetProgram.setComputeUnitLimit({ units: 1_200_000 }),
            ixUpdate,
            ixBoost
        ];
        return await this.buildAndSendTransaction(instructions, callback);
    }
    //getters
    //types

    //get coupons
    async getCoupons(
        market: PublicKey,
        user: PublicKey
    ): Promise<
        [Array<typeof this.program.account.presaleCoupon['fetch'] extends (...args: any) => Promise<infer T> ? T : never>, PublicKey[]]
    > {
        //console.log("get coupons")
        if (!this.program) {
            throw new Error("❌ Program client not initialized!")
        }
        //fetch coupons
        let couponsData = await this.program.account.presaleCoupon.all([
            {
                memcmp: {
                    offset: 8 + 20,
                    bytes: user.toBase58()
                }
            },
            {
                memcmp: {
                    offset: 8 + 20 + 32,
                    bytes: market.toBase58()
                }
            }
        ]);
        // Map ProgramAccount objects to their account data
        const accounts = couponsData.map(coupon => coupon.account);
        const publicKeys = couponsData.map(coupon => coupon.publicKey);
        return [accounts, publicKeys];
    }

    async getAllUserCoupons(
        user: PublicKey
    ): Promise<
        [Array<typeof this.program.account.presaleCoupon['fetch'] extends (...args: any) => Promise<infer T> ? T : never>, PublicKey[]]
    > {
        //console.log("get coupons")
        if (!this.program) {
            throw new Error("❌ Program client not initialized!")
        }
        //fetch coupons
        let couponsData = await this.program.account.presaleCoupon.all([
            {
                memcmp: {
                    offset: 8 + 20,
                    bytes: user.toBase58()
                }
            }
        ]);
        // Map ProgramAccount objects to their account data
        const accounts = couponsData.map(coupon => coupon.account);
        const publicKeys = couponsData.map(coupon => coupon.publicKey);
        return [accounts, publicKeys];
    }

    async getPresaleInfo(
        userQuoteInput: Decimal,
        marketState: (typeof this.program.account.marketState['fetch']) extends (...args: any) => Promise<infer T> ? T : never
    ): Promise<{ totalQuote: Decimal; totalBase: Decimal; baseShare: Decimal; baseSharePercent: Decimal; avgPrice: Decimal }> {
        // console.log("User quote input:", userQuoteInput.toString());
        const globalQuote = new Decimal(marketState.presaleQuote.toString())
            .div(new Decimal(10).pow(marketState.quoteDecimals));
        // console.log("Global quote:", globalQuote.toString());
        const totalBase = new Decimal(marketState.presaleBase.toString())
            .div(new Decimal(10).pow(marketState.baseDecimals));
        // console.log("Total base:", totalBase.toString());
        const share = userQuoteInput.div(globalQuote);
        // console.log("Share:", share.toString());
        const baseShare = totalBase.mul(share);
        // console.log("Base share:", baseShare.toString());
        const baseSharePercent = share.mul(100);
        // console.log("Base share percent:", baseSharePercent.toString());
        const avgPrice = globalQuote.div(totalBase);
        // console.log("Average price:", avgPrice.toString());
        return { totalQuote: globalQuote, totalBase, baseShare, baseSharePercent, avgPrice };
    }

    //get market
    async getMarket(
        market: PublicKey
    ): Promise<typeof this.program.account.marketState['fetch'] extends (...args: any) => Promise<infer T> ? T : never> {
        if (!this.program) {
            throw new Error("❌ Program client not initialized!");
        }
        let marketState = await this.program.account.marketState.fetch(market);
        return marketState;
    }

    //get markets
    async getMarkets(
        markets: PublicKey[]
    ): Promise<
        Array<typeof this.program.account.marketState['fetch'] extends (...args: any) => Promise<infer T> ? T : never>
    > {
        if (!this.program) {
            throw new Error("❌ Program client not initialized!");
        }

        return Promise.all(markets.map(market => this.program.account.marketState.fetch(market)));
    }

    //get deposit account
    async getDepositAccount(
        market: PublicKey
    ): Promise<typeof this.program.account.depositAccount['fetch'] extends (...args: any) => Promise<infer T> ? T : never> {
        if (!this.program) {
            throw new Error("❌ Program client not initialized!");
        }
        let [depositAccountAddress] = await anchor.web3.PublicKey.findProgramAddress(
            [market.toBuffer(), this.wallet.publicKey.toBuffer()],
            this.program.programId
        );
        let depositAccount = await this.program.account.depositAccount.fetch(depositAccountAddress);
        return depositAccount;
    }

    async getAllUserDepositAccounts(
        user: PublicKey
    ): Promise<
        [Array<typeof this.program.account.depositAccount['fetch'] extends (...args: any) => Promise<infer T> ? T : never>, PublicKey[]]
    > {
        //console.log("get coupons")
        if (!this.program) {
            throw new Error("❌ Program client not initialized!")
        }
        //fetch coupons
        let depositsData = await this.program.account.depositAccount.all([
            {
                memcmp: {
                    offset: 8,
                    bytes: user.toBase58()
                }
            }
        ]);
        // Map ProgramAccount objects to their account data
        const accounts = depositsData.map(deposit => deposit.account);
        const publicKeys = depositsData.map(deposit => deposit.publicKey);
        return [accounts, publicKeys];
    }

    async getWithdrawableAmount(
        depositAccount: (typeof this.program.account.depositAccount['fetch']) extends (...args: any) => Promise<infer T> ? T : never,
        marketState: (typeof this.program.account.marketState['fetch']) extends (...args: any) => Promise<infer T> ? T : never
    ): Promise<Decimal> {
        let totalBorrow = new Decimal(depositAccount.totalBorrowQuote.toString())
        let quantityDeposited = new Decimal(depositAccount.totalDepositBase.toString())
        let subOne = totalBorrow.greaterThan(0) ? true : false
        let quantityLocked = await quantityFromProceedsWPrice(
            totalBorrow,
            marketState.quoteDecimals + marketState.scalerDecimals,
            new Decimal(marketState.floorPrice.toString()),
            subOne
        )
        let quantityFree = quantityDeposited.sub(quantityLocked)
        if (quantityFree.equals(1) && totalBorrow.greaterThan(0)) {
            quantityFree = new Decimal(0)
        }
        return quantityFree
    }

    async getBorrowableAmount(
        depositAccount: (typeof this.program.account.depositAccount['fetch']) extends (...args: any) => Promise<infer T> ? T : never,
        marketState: (typeof this.program.account.marketState['fetch']) extends (...args: any) => Promise<infer T> ? T : never
    ): Promise<Decimal> {
        let totalBorrow = new Decimal(depositAccount.totalBorrowQuote.toString())
        let quantityDeposited = new Decimal(depositAccount.totalDepositBase.toString())
        let maxBorrow = await floorProceedsWPrice(
            quantityDeposited,
            marketState.quoteDecimals + marketState.scalerDecimals,
            new Decimal(marketState.floorPrice.toString())
        )
        let maxBorrowDelta = maxBorrow.sub(totalBorrow)
        return maxBorrowDelta
    }



    //get top markets

    //get presaleDate, launchDate
    async getMarketDates(launchDate: number, presaleOffset: number): Promise<[Date, Date]> {
        let launchStart = new Date(launchDate * 1000);
        let presaleStart = new Date((launchDate - presaleOffset) * 1000);
        return [launchStart, presaleStart];
    }

    // Utility function to parse error messages
    isolateErrorMessage(errorObj: any): string | null {
        // Check if transactionLogs exist
        if (!errorObj?.transactionLogs || !errorObj.transactionLogs.length) {
            return null;
        }

        // Loop through each log entry
        for (const log of errorObj.transactionLogs) {
            // Look for a log that contains "Error Message:"
            if (log.includes("Error Message:")) {
                // Split the log at "Error Message:" and take the latter part
                const parts = log.split("Error Message:");
                if (parts.length > 1) {
                    // Trim any whitespace and optionally remove a trailing period
                    let message = parts[1].trim();
                    if (message.endsWith(".")) {
                        message = message.slice(0, -1);
                    }
                    return message;
                }
            }
        }

        // Return null if no error message is found
        return null;
    }
}

// Re-export useful types and functions
export {
    BASE_ADDRESS,
    createProgramConnection,
    getPrice,
    quantityFromProceedsWPrice,
    floorProceeds,
    floorProceedsWPrice
} from './ix-builder';

export type { MarketState };



