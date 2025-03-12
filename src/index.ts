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
    updateFloorIx
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
import { createGenericFile } from '@metaplex-foundation/umi';
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
        imageFile: File,
        rpcUrl: string
    ): Promise<string> {
        if (!this.program) throw new Error("Program not initialized");
        const umi = createUmi(rpcUrl)
            .use(walletAdapterIdentity(this.wallet.payer))
            .use(mplTokenMetadata())
            .use(irysUploader());

        if (imageFile) {
            // Wrap FileReader in a Promise to await the file reading.
            const fileBuffer: ArrayBuffer = await new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => {
                    // Resolve with the file data when reading is complete.
                    resolve(reader.result as ArrayBuffer);
                };
                reader.onerror = () => {
                    // Reject if there is an error.
                    reject(reader.error);
                };
                reader.readAsArrayBuffer(imageFile);
            });

            const fileBuff = new Uint8Array(fileBuffer);
            const filename = imageFile.name.split('.')[0];
            const filetype = imageFile.name.split('.')[1];
            const contentType = imageFile.type;

            // Create the generic file using the file buffer.
            let genericFile = createGenericFile(fileBuff, `${filename}.${filetype}`, {
                displayName: filename,
                contentType: contentType,
                extension: filetype,
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
            const umi = createUmi(rpcUrl).use(walletAdapterIdentity(this.wallet.payer)).use(mplTokenMetadata()).use(irysUploader());
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
        presaleDuration: number,
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
                presaleDuration,
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
    async presaleBuy(
        quantity: anchor.BN,
        maxCost: anchor.BN,
        userQuoteToken: PublicKey,
        market: PublicKey,
        marketState: any,
        callback?: TxProgressCallback
    ): Promise<{ txid: string; confirmed: boolean }> {
        // Build presale buy instruction

        const instructions = [
            ComputeBudgetProgram.setComputeUnitLimit({ units: 1_200_000 }),

        ];

        const ix = await presaleBuyIx(
            quantity,
            maxCost,
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
        marketState: any,
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
                    userBaseToken,
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
    async buy(
        quantity: anchor.BN,
        maxCost: anchor.BN,
        market: PublicKey,
        marketState: any,
        userQuoteToken: PublicKey,
        cqd_guess: anchor.BN,
        ncqd_guess: anchor.BN,
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
            console.log("pushed base xie")
            instructions.push(baseIns)
        }
        const ix = await buyIx(
            quantity,
            maxCost,
            this.wallet.publicKey,
            userBaseToken,
            userQuoteToken,
            market,
            this.program,
            marketState,
            cqd_guess,
            ncqd_guess
        );
        instructions.push(ix)
        return await this.buildAndSendTransaction(instructions, callback);
    }
    async sell(
        quantity: anchor.BN,
        minProceeds: anchor.BN,
        market: PublicKey,
        marketState: any,
        userBaseToken: PublicKey,
        cqd_guess: anchor.BN,
        ncqd_guess: anchor.BN,
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
            userQuoteToken,
            market,
            marketState,
            this.program,
            cqd_guess,
            ncqd_guess
        );
        instructions.push(ix)
        return await this.buildAndSendTransaction(instructions, callback);
    }
    async sellFloor(
        quantity: anchor.BN,
        minProceeds: anchor.BN,
        market: PublicKey,
        marketState: any,
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
        marketState: any,
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
        marketState: any,
        userBaseTokenAddress: PublicKey,
        quoteMint: PublicKey,
        callback?: TxProgressCallback
    ): Promise<{ txid: string; confirmed: boolean }> {
        const ix = await withdrawIx(
            amount,
            this.wallet.publicKey,
            market,
            marketState,
            this.program,
            userBaseTokenAddress,
            quoteMint
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
        marketState: any,
        userQuoteTokenAddress: PublicKey,
        quoteMint: PublicKey,
        callback?: TxProgressCallback
    ): Promise<{ txid: string; confirmed: boolean }> {
        const ix = await borrowIx(
            amount,
            this.wallet.publicKey,
            market,
            marketState,
            this.program,
            userQuoteTokenAddress,
            quoteMint
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
        marketState: any,
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
    async updateFloor(
        quantity: anchor.BN,
        initGuess: anchor.BN,
        market: PublicKey,

        callback?: TxProgressCallback
    ): Promise<{ txid: string; confirmed: boolean }> {
        const ix = await updateFloorIx(
            quantity,
            initGuess,
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
        marketState: any,
        guess1: anchor.BN,
        guess2: anchor.BN,
        callback?: TxProgressCallback
    ): Promise<{ txid: string; confirmed: boolean }> {
        const ix = await boostFloorIx(
            market,
            marketState,
            this.program,
            guess1,
            guess2
        )
        const instructions = [
            ComputeBudgetProgram.setComputeUnitLimit({ units: 1_200_000 }),
            ix
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
        Array<typeof this.program.account.presaleCoupon['fetch'] extends (...args: any) => Promise<infer T> ? T : never>
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
        return couponsData.map(coupon => coupon.account);
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
    
    //get top markets

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
    quantityFromProceedsExpo,
    quantityFromProceedsExpoWPrice,
    floorProceedsExpo,
    floorProceedsExpoWPrice
} from './ix-builder';

export type { MarketState };



