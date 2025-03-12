import * as anchor from '@coral-xyz/anchor';
import { Limitless } from './limitless';
import idl from './idl.json'
import { TOKEN_PROGRAM_ID } from '@coral-xyz/anchor/dist/cjs/utils/token';
import Decimal from 'decimal.js';

export const PROGRAM_ID = "z9P826HFdY5NPMgjgv4eubKFuxyJcjkRfdJuekZoaR6"
export const BASE_ADDRESS = "GTdRgfWZvcokP8dNFRB9wDvpDJSvXL5BFiNgaw3Tru8u"


export const createProgramConnection = async (
    anchorWallet: anchor.Wallet,
    confirmOpts: anchor.web3.ConfirmOptions,
    connection: anchor.web3.Connection
): Promise<anchor.Program<Limitless>> => {
    //const solConnection = new anchor.web3.Connection(rpcUrl);
    const provider = new anchor.AnchorProvider(connection, anchorWallet, confirmOpts);
    anchor.setProvider(provider)
    // const idl = IDL as Limitless;
    const program = new anchor.Program(idl as Limitless, {connection});
    return program
}
export async function createIx(
    user: anchor.web3.PublicKey,
    program: anchor.Program<Limitless>,
    userQuoteTokenAddress: anchor.web3.PublicKey,
    quoteMint: anchor.web3.PublicKey,
    start: number,
    buyFee: number,
    sellFee: number,
    creatorSplit: number,
    presaleOffset: number,
    presaleFee: number,
    presaleSplit: number,
    name: string,
    symbol: string,
    uri: string,
    marketId: string,
    baseSplit: boolean
): Promise<anchor.web3.TransactionInstruction> {
    let marketBaseAddress = new anchor.web3.PublicKey(BASE_ADDRESS);

    let [marketStateAddress, marketBump] = await anchor.web3.PublicKey.findProgramAddress(
        [marketBaseAddress.toBuffer(), Buffer.from(marketId)],
        program.programId
    );
    console.log("Creating with address", marketStateAddress.toBase58())
    // let marketStateAddress = new PublicKey("BLLc717M4qKf8KtX1mjSej1wFy3FdHExLCtqjCyFftt9")

    let [baseMintAddress, baseMintBump] = await anchor.web3.PublicKey.findProgramAddress(
        [marketStateAddress.toBuffer(), Buffer.from("base_mint")],
        program.programId
    );
    let [platformFeeAddress, platformFeeAddressBump] = await anchor.web3.PublicKey.findProgramAddress(
        [marketStateAddress.toBuffer(), Buffer.from("platform_fee_vault")],
        program.programId
    );
    let [baseDepositTokenAddress, baseDepositTokenBump] = await anchor.web3.PublicKey.findProgramAddress(
        [marketStateAddress.toBuffer(), Buffer.from("base_deposit_token")],
        program.programId
    );
    const [metadataAddress] = anchor.web3.PublicKey.findProgramAddressSync(
        [
            Buffer.from("metadata"),
            new anchor.web3.PublicKey("metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s").toBuffer(),
            baseMintAddress.toBuffer(),
        ],
        new anchor.web3.PublicKey("metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"),
    );
    console.log("qpaaaair", quoteMint.toBase58())
    const createMarketIx = await program.methods
        .createMarket(marketId, {
            startQuantity: new anchor.BN(0),
            offset: new anchor.BN(100000),
            minTradeSize: new anchor.BN(1),
            gradient: new anchor.BN(100000000),
            preMint: new anchor.BN(0),
            continuousMint: false,
            buyFee: buyFee,
            sellFee: sellFee,
            launchDate: new anchor.BN(start),
            creatorSplit: creatorSplit,
            divisorPow: 12,
            pow1: 4,
            pow2: 16,
            presaleOffset: new anchor.BN(presaleOffset * 60),
            presaleSplit: presaleSplit,
            presaleFee: presaleFee,
            scalerDecimals: 4,
            name: name,
            symbol: symbol,
            uri: uri,
            maxInterest: 3000000,
            minInterest: 100000,
            curveMod: 3,
            presaleBaseSplit: baseSplit
        })
        .accountsPartial({
            creator: user,
            marketBase: marketBaseAddress,
            marketState: marketStateAddress,
            baseMint: baseMintAddress,
            quoteMint: quoteMint,
            feeReceiveAddress: userQuoteTokenAddress,
            // platformFeeVault: platformFeeAddress,
            // baseDepositVault: baseDepositTokenAddress,
            metadata: metadataAddress,
            tokenProgram: TOKEN_PROGRAM_ID,
            tokenMetadataProgram: new anchor.web3.PublicKey("metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"),
            systemProgram: anchor.web3.SystemProgram.programId,
            rent: anchor.web3.SYSVAR_RENT_PUBKEY,
            clock: anchor.web3.SYSVAR_CLOCK_PUBKEY
        }).instruction();
    return createMarketIx
}
export async function createVaultsIxes(
    user: anchor.web3.PublicKey,
    program: anchor.Program<Limitless>,
    quoteMint: anchor.web3.PublicKey,
    marketId: string,
): Promise<anchor.web3.TransactionInstruction[]> {
    let marketBaseAddress = new anchor.web3.PublicKey(BASE_ADDRESS);

    let [marketStateAddress, marketBump] = await anchor.web3.PublicKey.findProgramAddress(
        [marketBaseAddress.toBuffer(), Buffer.from(marketId)],
        program.programId
    );
    // let marketStateAddress = new PublicKey("BLLc717M4qKf8KtX1mjSej1wFy3FdHExLCtqjCyFftt9")

    let [baseMintAddress, baseMintBump] = await anchor.web3.PublicKey.findProgramAddress(
        [marketStateAddress.toBuffer(), Buffer.from("base_mint")],
        program.programId
    );
    let [baseTokenAddress, baseTokenBump] = await anchor.web3.PublicKey.findProgramAddress(
        [marketStateAddress.toBuffer(), Buffer.from("base_token")],
        program.programId
    );
    let [quoteTokenAddress, quoteTokenBump] = await anchor.web3.PublicKey.findProgramAddress(
        [marketStateAddress.toBuffer(), Buffer.from("quote_token")],
        program.programId
    );
    let [quoteFloorTokenAddress, quoteFloorTokenBump] = await anchor.web3.PublicKey.findProgramAddress(
        [marketStateAddress.toBuffer(), Buffer.from("quote_floor_token")],
        program.programId
    );
    let [platformFeeAddress, platformFeeAddressBump] = await anchor.web3.PublicKey.findProgramAddress(
        [marketStateAddress.toBuffer(), Buffer.from("platform_fee_vault")],
        program.programId
    );
    let [baseDepositTokenAddress, baseDepositTokenBump] = await anchor.web3.PublicKey.findProgramAddress(
        [marketStateAddress.toBuffer(), Buffer.from("base_deposit_token")],
        program.programId
    );
    const createVaultsIx = await program.methods
        .createMarketVaults()
        .accountsPartial({
            creator: user,
            marketBase: marketBaseAddress,
            marketState: marketStateAddress,
            baseMint: baseMintAddress,
            // quoteMint: quoteMint,
            baseTokenVault: baseTokenAddress,
            // quoteTokenVault: quoteTokenAddress,
            // quoteTokenFloorVault: quoteFloorTokenAddress,
            tokenProgram: TOKEN_PROGRAM_ID,
            systemProgram: anchor.web3.SystemProgram.programId,
        }).instruction()
    const createVaultsIx1 = await program.methods
        .createMarketVaults1()
        .accountsPartial({
            creator: user,
            marketBase: marketBaseAddress,
            marketState: marketStateAddress,
            baseMint: baseMintAddress,
            quoteMint: quoteMint,
            // baseTokenVault: baseTokenAddress,
            // quoteTokenVault: quoteTokenAddress,
            quoteTokenFloorVault: quoteFloorTokenAddress,
            tokenProgram: TOKEN_PROGRAM_ID,
            systemProgram: anchor.web3.SystemProgram.programId,
        }).instruction()
    const createVaultsIx2 = await program.methods
        .createMarketVaults2()
        .accountsPartial({
            creator: user,
            marketBase: marketBaseAddress,
            marketState: marketStateAddress,
            baseMint: baseMintAddress,
            quoteMint: quoteMint,
            // baseTokenVault: baseTokenAddress,
            // quoteTokenVault: quoteTokenAddress,
            // quoteTokenFloorVault: quoteFloorTokenAddress,
            platformFeeVault: platformFeeAddress,
            tokenProgram: TOKEN_PROGRAM_ID,
            systemProgram: anchor.web3.SystemProgram.programId,
        }).instruction()
    const createVaultsIx3 = await program.methods
        .createMarketVaults3()
        .accountsPartial({
            creator: user,
            marketBase: marketBaseAddress,
            marketState: marketStateAddress,
            baseMint: baseMintAddress,
            quoteMint: quoteMint,
            // baseTokenVault: baseTokenAddress,
            quoteTokenVault: quoteTokenAddress,
            // quoteTokenFloorVault: quoteFloorTokenAddress,
            tokenProgram: TOKEN_PROGRAM_ID,
            systemProgram: anchor.web3.SystemProgram.programId,
        }).instruction()
    const createVaultsIx4 = await program.methods
        .createMarketVaults4()
        .accountsPartial({
            creator: user,
            marketBase: marketBaseAddress,
            marketState: marketStateAddress,
            baseMint: baseMintAddress,
            quoteMint: quoteMint,
            // baseTokenVault: baseTokenAddress,
            // quoteTokenVault: quoteTokenAddress,
            // quoteTokenFloorVault: quoteFloorTokenAddress,
            baseDepositVault: baseDepositTokenAddress,
            tokenProgram: TOKEN_PROGRAM_ID,
            systemProgram: anchor.web3.SystemProgram.programId,
        }).instruction()
    console.log("RETURNING")
    return [createVaultsIx, createVaultsIx1, createVaultsIx2, createVaultsIx3, createVaultsIx4]
}
export async function claimFeesIx(
    creatorFeeAddress: anchor.web3.PublicKey,
    marketStateAddress: anchor.web3.PublicKey,
    program: anchor.Program<Limitless>,
): Promise<anchor.web3.TransactionInstruction> {
    let marketBaseAddress = new anchor.web3.PublicKey(BASE_ADDRESS);
    let [platformFeeVault, platformFeeVaulttBump] = await anchor.web3.PublicKey.findProgramAddress(
        [marketStateAddress.toBuffer(), Buffer.from("platform_fee_vault")],
        program.programId
    );
    const createVaultsIx = await program.methods
        .claimCreatorFees()
        .accountsPartial({
            marketBase: marketBaseAddress,
            marketState: marketStateAddress,
            platformFeeVault: platformFeeVault,
            creatorTokenAccount: creatorFeeAddress,
            tokenProgram: TOKEN_PROGRAM_ID
        }).instruction()
    return createVaultsIx
}
export async function claimBaseAllocationIx(
    user: anchor.web3.PublicKey,
    marketStateAddress: anchor.web3.PublicKey,
    userBaseToken: anchor.web3.PublicKey,
    program: anchor.Program<Limitless>
): Promise<anchor.web3.TransactionInstruction> {
    let marketBaseAddress = new anchor.web3.PublicKey(BASE_ADDRESS);
    let [baseMintAddress, _b] = await anchor.web3.PublicKey.findProgramAddress(
        [marketStateAddress.toBuffer(), Buffer.from("base_mint")],
        program.programId
    );
    let [baseTokenVaultAddress, _bb] = await anchor.web3.PublicKey.findProgramAddress(
        [marketStateAddress.toBuffer(), Buffer.from("base_token")],
        program.programId
    );
    const createVaultsIx = await program.methods
        .claimCreatorAllocation()
        .accountsPartial({
            user: user, 
            marketBase: marketBaseAddress,
            marketState: marketStateAddress,
            baseMint: baseMintAddress,
            baseTokenVault: baseTokenVaultAddress,
            userBaseToken: userBaseToken,
            tokenProgram: TOKEN_PROGRAM_ID,
            systemProgram: anchor.web3.SystemProgram.programId,
            clock: anchor.web3.SYSVAR_CLOCK_PUBKEY
            
        }).instruction()
    return createVaultsIx
}
export async function presaleBuyIx(
    quantity: anchor.BN,
    maxCost: anchor.BN,
    user: anchor.web3.PublicKey,
    userQuoteToken: anchor.web3.PublicKey,
    market: anchor.web3.PublicKey,
    marketState: any,
    program: anchor.Program<Limitless>,
  ): Promise<anchor.web3.TransactionInstruction> {
    //TODO pass in market as parameter
    const randomChars = Math.random().toString(36).substring(2, 7);
    let [presaleCouponAddress] = await anchor.web3.PublicKey.findProgramAddress(
      [market.toBuffer(), user.toBuffer(), Buffer.from(randomChars)],
      program.programId
    );
    const ix = await program.methods
      .buyPresale(randomChars, {
        quantity: quantity,
        maxCost: maxCost
      })
      .accountsPartial({
        user: user,
        marketBase: new anchor.web3.PublicKey(BASE_ADDRESS),
        marketState: market,
        baseMint: marketState.baseMintAddress,
        presaleCoupon: presaleCouponAddress,
        baseTokenVault: marketState.baseMintTokenAddress,
        userQuoteToken: userQuoteToken,
        quoteTokenVault: marketState.quoteMintTokenAddress,
        quoteTokenFloorVault: marketState.quoteMintFloorTokenAddress,
        platformFeeVault: marketState.platformFeeVaultAddress,
        feeReceiveAddress: marketState.receiveAddress,
        tokenProgram: TOKEN_PROGRAM_ID,
        systemProgram: anchor.web3.SystemProgram.programId,
        clock: anchor.web3.SYSVAR_CLOCK_PUBKEY
      }).instruction()
    return ix
}
export async function claimPresaleIx(
    couponAddress: anchor.web3.PublicKey,
    user: anchor.web3.PublicKey,
    userBaseToken: anchor.web3.PublicKey,
    market: anchor.web3.PublicKey,
    marketState: any,
    program: anchor.Program<Limitless>,
  ): Promise<anchor.web3.TransactionInstruction> {
    //TODO pass in market as parameter
    // let [presaleCouponAddress, presaleCouponBump] = await anchor.web3.PublicKey.findProgramAddress(
    //   [market.toBuffer(), user.toBuffer(), Buffer.from(id)],
    //   program.programId
    // );
    const ix = await program.methods
      .claimPresale()
      .accountsPartial({
        user: user,
        marketBase: new anchor.web3.PublicKey(BASE_ADDRESS),
        marketState: market,
        baseMint: marketState.baseMintAddress,
        presaleCoupon: couponAddress,
        baseTokenVault: marketState.baseMintTokenAddress,
        userBaseToken: userBaseToken,
        tokenProgram: TOKEN_PROGRAM_ID,
        systemProgram: anchor.web3.SystemProgram.programId,
        clock: anchor.web3.SYSVAR_CLOCK_PUBKEY
      }).instruction()
    return ix
}
export const buyIx = async (
    quantity: anchor.BN,
    maxCost: anchor.BN,
    user: anchor.web3.PublicKey,
    userBaseToken: anchor.web3.PublicKey,
    userQuoteToken: anchor.web3.PublicKey,
    market: anchor.web3.PublicKey,
    program: anchor.Program<Limitless>,
    marketState: any,
    cqd_guess: anchor.BN,
    ncqd_guess: anchor.BN
): Promise<anchor.web3.TransactionInstruction> => {
    //TODO pass in market as parameter
    const ix = await program.methods
        .buyWGuess({
            quantity: quantity,
            maxCost: maxCost
        }, cqd_guess, ncqd_guess
        )
        .accountsPartial({
            user: user,
            marketBase: new anchor.web3.PublicKey(BASE_ADDRESS),
            marketState: market,
            baseMint: marketState.baseMintAddress,
            userBaseToken: userBaseToken,
            baseTokenVault: marketState.baseMintTokenAddress,
            userQuoteToken: userQuoteToken,
            quoteTokenVault: marketState.quoteMintTokenAddress,
            quoteTokenFloorVault: marketState.quoteMintFloorTokenAddress,
            platformFeeVault: marketState.platformFeeVaultAddress,
            feeReceiveAddress: marketState.receiveAddress,
            tokenProgram: TOKEN_PROGRAM_ID,
            systemProgram: anchor.web3.SystemProgram.programId,
            clock: anchor.web3.SYSVAR_CLOCK_PUBKEY
        }).instruction()
    return ix
}
export const buyIxCreator = async (
    quantity: anchor.BN,
    maxCost: anchor.BN,
    user: anchor.web3.PublicKey,
    userQuoteToken: anchor.web3.PublicKey,
    market: anchor.web3.PublicKey,
    marketState: any,
    program: anchor.Program<Limitless>
): Promise<anchor.web3.TransactionInstruction> => {
    //TODO pass in market as parameter
    const ix = await program.methods
        .creatorBuy({
            quantity: quantity,
            maxCost: maxCost
        }
        )
        .accountsPartial({
            user: user,
            marketBase: new anchor.web3.PublicKey(BASE_ADDRESS),
            marketState: market,
            baseMint: marketState.baseMintAddress,
            baseTokenVault: marketState.baseMintTokenAddress,
            userQuoteToken: userQuoteToken,
            quoteTokenVault: marketState.quoteMintTokenAddress,
            quoteTokenFloorVault: marketState.quoteMintFloorTokenAddress,
            platformFeeVault: marketState.platformFeeVaultAddress,
            feeReceiveAddress: marketState.receiveAddress,
            tokenProgram: TOKEN_PROGRAM_ID,
            systemProgram: anchor.web3.SystemProgram.programId,
            clock: anchor.web3.SYSVAR_CLOCK_PUBKEY
        }).instruction()
    return ix
}
export const sellIx = async (
    quantity: anchor.BN,
    minProceeds: anchor.BN,
    user: anchor.web3.PublicKey,
    userBaseToken: anchor.web3.PublicKey,
    userQuoteToken: anchor.web3.PublicKey,
    market: anchor.web3.PublicKey,
    marketState: any,
    program: anchor.Program<Limitless>,
    cqd_guess: anchor.BN,
    ncqd_guess: anchor.BN
): Promise<anchor.web3.TransactionInstruction> => {
    console.log("user", user.toBase58())
    const ix = await program.methods
        .sellWGuess({
            quantity: quantity,
            minProceeds: minProceeds
        }, cqd_guess, ncqd_guess 
        )
        .accountsPartial({
            user: user,
            marketBase: new anchor.web3.PublicKey(BASE_ADDRESS),
            marketState: market,
            baseMint: marketState.baseMintAddress,
            userBaseToken: userBaseToken,
            baseTokenVault: marketState.baseMintTokenAddress,
            userQuoteToken: userQuoteToken,
            quoteTokenVault: marketState.quoteMintTokenAddress,
            quoteTokenFloorVault: marketState.quoteMintFloorTokenAddress,
            platformFeeVault: marketState.platformFeeVaultAddress,
            feeReceiveAddress: marketState.receiveAddress,
            tokenProgram: TOKEN_PROGRAM_ID,
            systemProgram: anchor.web3.SystemProgram.programId,
            clock: anchor.web3.SYSVAR_CLOCK_PUBKEY
        }).instruction()
    return ix
}
export const sellFloorIx = async (
    quantity: anchor.BN,
    minProceeds: anchor.BN,
    user: anchor.web3.PublicKey,
    userBaseToken: anchor.web3.PublicKey,
    userQuoteToken: anchor.web3.PublicKey,
    market: anchor.web3.PublicKey,
    marketState: any,
    program: anchor.Program<Limitless>,
): Promise<anchor.web3.TransactionInstruction> => {
    const ix = await program.methods
        .sellFloor({
            quantity: quantity,
            minProceeds: minProceeds
        })
        .accountsPartial({
            user: user,
            marketBase: new anchor.web3.PublicKey(BASE_ADDRESS),
            marketState: market,
            baseMint: marketState.baseMintAddress,
            userBaseToken: userBaseToken,
            baseTokenVault: marketState.baseMintTokenAddress,
            userQuoteToken: userQuoteToken,
            quoteTokenFloorVault: marketState.quoteMintFloorTokenAddress,
            tokenProgram: TOKEN_PROGRAM_ID,
            systemProgram: anchor.web3.SystemProgram.programId,
            clock: anchor.web3.SYSVAR_CLOCK_PUBKEY
        }).instruction()
    return ix
}
export const updateFloorIx = async (
    quantity: anchor.BN,
    initGuess: anchor.BN,
    market: anchor.web3.PublicKey,
    program: anchor.Program<Limitless>,
): Promise<anchor.web3.TransactionInstruction> => {
    //TODO pass in market as parameter
    //let marketState = await program.account.marketState.fetch(market);
    const ix = await program.methods
        .updateFloor(quantity, initGuess)
        .accountsPartial({
            marketBase: new anchor.web3.PublicKey(BASE_ADDRESS),
            marketState: market,
            systemProgram: anchor.web3.SystemProgram.programId
        }).instruction()
    return ix
}
export const boostFloorIx = async (
    market: anchor.web3.PublicKey,
    marketState: any,
    program: anchor.Program<Limitless>,
    guess1: anchor.BN,
    guess2: anchor.BN
): Promise<anchor.web3.TransactionInstruction> => {
    //TODO pass in market as parameter
    const ix = await program.methods
        .boostFloorWGuess(guess1, guess2)
        .accountsPartial({
            marketBase: new anchor.web3.PublicKey(BASE_ADDRESS),
            marketState: market,
            quoteTokenVault: marketState.quoteMintTokenAddress,
            quoteTokenFloorVault: marketState.quoteMintFloorTokenAddress,
            tokenProgram: TOKEN_PROGRAM_ID,
            systemProgram: anchor.web3.SystemProgram.programId,
        }).instruction()
    return ix
}
export async function createDepositAccountIx(
    user: anchor.web3.PublicKey,
    market: anchor.web3.PublicKey,
    program: anchor.Program<Limitless>,
): Promise<anchor.web3.TransactionInstruction> {
    let [depositAccountAddress, depositAccountBump] = await anchor.web3.PublicKey.findProgramAddress(
        [market.toBuffer(), user.toBuffer()],
        program.programId
    );
    const ix = await program.methods
        .createDepositAccount()
        .accountsPartial({
            user: user,
            marketBase: new anchor.web3.PublicKey(BASE_ADDRESS),
            marketState: market,
            depositAccount: depositAccountAddress,
        }).instruction()
    return ix
}
export async function depositIx(
    amount: anchor.BN,
    user: anchor.web3.PublicKey,
    market: anchor.web3.PublicKey,
    marketState: any,
    program: anchor.Program<Limitless>,
    userBaseTokenAddress: anchor.web3.PublicKey,
): Promise<anchor.web3.TransactionInstruction> {
    let [depositAccountAddress, depositAccountBump] = await anchor.web3.PublicKey.findProgramAddress(
        [market.toBuffer(), user.toBuffer()],
        program.programId
    );
    const ix = await program.methods
        .depositBase(amount)
        .accountsPartial({
            user: user,
            marketBase: new anchor.web3.PublicKey(BASE_ADDRESS),
            marketState: market,
            baseMint: marketState.baseMintAddress,
            userBaseToken: userBaseTokenAddress,
            baseDepositVault: marketState.baseDepositAddress,
            depositAccount: depositAccountAddress
        }).instruction();
    return ix;
}
export async function withdrawIx(
    amount: anchor.BN,
    user: anchor.web3.PublicKey,
    market: anchor.web3.PublicKey,
    marketState: any,
    program: anchor.Program<Limitless>,
    userBaseTokenAddress: anchor.web3.PublicKey,
    quoteMint: anchor.web3.PublicKey
): Promise<anchor.web3.TransactionInstruction> {
    let [depositAccountAddress, depositAccountBump] = await anchor.web3.PublicKey.findProgramAddress(
        [market.toBuffer(), user.toBuffer()],
        program.programId
    );
    let [lendingPoolAddress, lendingPoolBump] = await anchor.web3.PublicKey.findProgramAddress(
        [new anchor.web3.PublicKey(BASE_ADDRESS).toBuffer(), quoteMint.toBuffer()],
        program.programId
    );
    const ix = await program.methods
        .withdrawBase(amount)
        .accountsPartial({
            user: user,
            marketBase: new anchor.web3.PublicKey(BASE_ADDRESS),
            marketState: market,
            // lendingPool: lendingPoolAddress,
            baseMint: marketState.baseMintAddress,
            userBaseToken: userBaseTokenAddress,
            baseDepositVault: marketState.baseDepositAddress,
            depositAccount: depositAccountAddress
        }).instruction();
    return ix;
}
export async function borrowIx(
    amount: anchor.BN,
    user: anchor.web3.PublicKey,
    market: anchor.web3.PublicKey,
    program: anchor.Program<Limitless>,
    marketState: any,
    userQuoteTokenAddress: anchor.web3.PublicKey,
    quoteMint: anchor.web3.PublicKey
): Promise<anchor.web3.TransactionInstruction> {
    let [depositAccountAddress, depositAccountBump] = await anchor.web3.PublicKey.findProgramAddress(
        [market.toBuffer(), user.toBuffer()],
        program.programId
    );
    let [lendingPoolAddress, lendingPoolBump] = await anchor.web3.PublicKey.findProgramAddress(
        [new anchor.web3.PublicKey(BASE_ADDRESS).toBuffer(), quoteMint.toBuffer()],
        program.programId
    );
    const ix = await program.methods
        .borrowQuote(amount)
        .accountsPartial({
            user: user,
            marketBase: new anchor.web3.PublicKey(BASE_ADDRESS),
            marketState: market,
            // lendingPool: lendingPoolAddress,
            userQuoteToken: userQuoteTokenAddress,
            quoteTokenVault: marketState.quoteMintTokenAddress,
            quoteTokenFloorVault: marketState.quoteMintFloorTokenAddress,
            depositAccount: depositAccountAddress
        }).instruction();
    return ix;
}
export async function repayIx(
    amount: anchor.BN,
    user: anchor.web3.PublicKey,
    market: anchor.web3.PublicKey,
    marketState: any,
    program: anchor.Program<Limitless>,
    userQuoteTokenAddress: anchor.web3.PublicKey,
): Promise<anchor.web3.TransactionInstruction> {
    let [depositAccountAddress, depositAccountBump] = await anchor.web3.PublicKey.findProgramAddress(
        [market.toBuffer(), user.toBuffer()],
        program.programId
    );
    const ix = await program.methods
        .repayQuote(amount)
        .accountsPartial({
            user: user,
            marketBase: new anchor.web3.PublicKey(BASE_ADDRESS),
            marketState: market,
            userQuoteToken: userQuoteTokenAddress,
            quoteTokenVault: marketState.quoteMintTokenAddress,
            quoteTokenFloorVault: marketState.quoteMintFloorTokenAddress,
            depositAccount: depositAccountAddress
        }).instruction();
    return ix;
}

//math
export const lookupLimitUp = async (
    cost: number,
    constant: number,
    startQ: number,
    quoteDecimals: number
): Promise<number> => {
    let base = 10;
    let basePow = Math.pow(base, Number(quoteDecimals))
    let costX = cost * basePow
    let newX = solveForXUp(new Decimal(costX), new Decimal(constant), new Decimal(startQ))
    return newX.toNumber()
}
function solveForXUp(a: Decimal, k: Decimal, z: Decimal): Decimal {
    const xInitial = findInitialGuess(a, k, z);
    let x = xInitial;
    const tolerance = new Decimal(1e-6);
    const maxIterations = 100;
    console.log("toleralance", tolerance)
    for (let i = 0; i < maxIterations; i++) {
        const fValue = computeFUp(x, a, k, z);
        const fPrimeValue = computeFPrimeUp(x, k);
        if (fPrimeValue.equals(0)) {
            throw new Error('Derivative is zero. Newton-Raphson method fails.');
        }
        const xNew = x.minus(fValue.dividedBy(fPrimeValue));
        console.log("x new", xNew.toString(), x.toString())
        if (xNew.minus(x).abs().lessThan(tolerance)) {
            console.log("iterations: ", i)
            return xNew;
        }
        x = xNew;
    }
    console.log("iterations: ", maxIterations)
    return x;
    //throw new Error('Maximum iterations exceeded. No solution found.');
}
function findInitialGuess(a: Decimal, k: Decimal, z: Decimal): Decimal {
    const tolerance = new Decimal(1e-4);
    const maxIterations = 1000;

    // Define an interval [xLower, xUpper] where the function changes sign
    let xLower = z.plus(new Decimal(1)); // Start slightly above z
    let xUpper = z.plus(new Decimal(1e12)); // An upper bound; adjust as needed

    let fLower = computeFUp(xLower, a, k, z);
    let fUpper = computeFUp(xUpper, a, k, z);

    // Expand the interval until the function changes sign
    while (fLower.times(fUpper).greaterThanOrEqualTo(0)) {
        xUpper = xUpper.plus(new Decimal(1e12));
        fUpper = computeFUp(xUpper, a, k, z);

        // Safety check to prevent infinite loop
        if (xUpper.minus(z).greaterThan(new Decimal(1e15))) {
            throw new Error('Bisection method fails. Cannot find a valid interval.');
        }
    }

    let xMid = new Decimal(0);
    for (let i = 0; i < maxIterations; i++) {
        xMid = xLower.plus(xUpper).dividedBy(2);
        const fMid = computeFUp(xMid, a, k, z);

        if (fMid.abs().lessThan(tolerance)) {
            return xMid;
        }

        if (fLower.times(fMid).lessThan(0)) {
            xUpper = xMid;
            fUpper = fMid;
        } else {
            xLower = xMid;
            fLower = fMid;
        }

        // If the interval is smaller than the tolerance, return the midpoint
        if (xUpper.minus(xLower).abs().lessThan(tolerance)) {
            return xMid;
        }
    }
    return xMid;
    //throw new Error('Maximum iterations exceeded in bisection method. No initial guess found.');
}
function computeFPrimeUp(x: Decimal, k: Decimal): Decimal {
    const ln_k = Decimal.ln(k);
    const exponent = new Decimal(1).plus(x.dividedBy(new Decimal(1e12)));
    const kExponent = k.pow(exponent);
    const commonTerm = new Decimal(1e4).dividedBy(ln_k);
    const constantTerm = new Decimal(1e16).dividedBy(ln_k.pow(2));
    const derivativeExponent = kExponent.times(ln_k.dividedBy(new Decimal(1e12)));
    const derivativeTerm = derivativeExponent
        .times(x.times(commonTerm).minus(constantTerm))
        .plus(kExponent.times(commonTerm))
        .plus(new Decimal(100000));
    return derivativeTerm;
}
function computeFUp(x: Decimal, a: Decimal, k: Decimal, z: Decimal): Decimal {
    const ln_k = Decimal.ln(k);
    const exponentX = new Decimal(1).plus(x.dividedBy(new Decimal(1e12)));
    const exponentZ = new Decimal(1).plus(z.dividedBy(new Decimal(1e12)));
    const commonTerm = new Decimal(1e4).dividedBy(ln_k);
    const constantTerm = new Decimal(1e16).dividedBy(ln_k.pow(2));
    const termX = k.pow(exponentX)
        .times(x.times(commonTerm).minus(constantTerm))
        .plus(new Decimal(100000).times(x));
    const termZ = k.pow(exponentZ)
        .times(z.times(commonTerm).minus(constantTerm))
        .plus(new Decimal(100000).times(z));
    return termX.minus(termZ).minus(a);
}
export const lookupLimitDown = async (
    constant: number,
    newCqd: number,
    cqd: number,
): Promise<number> => {
    // Create Decimal instances
    const constantD = new Decimal(constant);
    const cqdD = new Decimal(cqd);
    const newCqdD = new Decimal(newCqd);

    // Optional: still compute basePow if needed
    // const basePow = new Decimal(10).pow(quoteDecimals);

    // Validate 'constant'
    if (constantD.lte(0) || constantD.eq(1)) {
        throw new Error("Parameter 'k' must be greater than 0 and not equal to 1.");
    }

    // Use natural log via log(x, Math.E)
    const ln_k = Decimal.log(constantD, Math.E);
    if (ln_k.eq(0)) {
        throw new Error("ln(k) is zero, causing a division by zero error.");
    }

    // (ln_k)^2
    const ln_k_squared = ln_k.mul(ln_k);

    // Calculate exponents: 1 + cqd / 1e12
    const exponentZ = new Decimal(1).plus(cqdD.div(1e12));
    const exponentX = new Decimal(1).plus(newCqdD.div(1e12));

    // constant^exponent
    const k_exponentZ = constantD.pow(exponentZ);
    const k_exponentX = constantD.pow(exponentX);

    // Inner terms
    const termZ_inner = cqdD
        .mul(1e4)
        .div(ln_k)
        .minus(new Decimal(1e16).div(ln_k_squared));

    const termX_inner = newCqdD
        .mul(1e4)
        .div(ln_k)
        .minus(new Decimal(1e16).div(ln_k_squared));

    // Outer terms
    const termZ = k_exponentZ.mul(termZ_inner).plus(new Decimal(100000).mul(cqdD));
    const termX = k_exponentX.mul(termX_inner).plus(new Decimal(100000).mul(newCqdD));
    console.log("haiiii")
    // Final result
    const result = termZ.minus(termX);

    // Convert back to a number. Watch out for very large or very small values.
    return result.toNumber();
};
export const lookupLimitUpWithOutput = async (
    constant: number,
    newCqd: number,
    cqd: number,
): Promise<number> => {
    if (constant <= 0 || constant === 1) {
        throw new Error("Parameter 'k' must be greater than 0 and not equal to 1.");
    }
    const ln_k = Math.log(constant);
    if (ln_k === 0) {
        throw new Error("ln(k) is zero, causing a division by zero error.");
    }
    const ln_k_squared = ln_k * ln_k;
    const exponentZ = 1 + cqd / 1e12;
    const exponentX = 1 + newCqd / 1e12;

    const k_exponentZ = Math.pow(constant, exponentZ);
    const k_exponentX = Math.pow(constant, exponentX);

    const termZ_inner = (cqd * 1e4) / ln_k - 1e16 / ln_k_squared;
    const termX_inner = (newCqd * 1e4) / ln_k - 1e16 / ln_k_squared;

    const termZ = k_exponentZ * termZ_inner + 100000 * cqd;
    const termX = k_exponentX * termX_inner + 100000 * newCqd;

    const a = termX - termZ;

    return a;
}
export const lookupLimitDownWithOutput = async (
    proceeds: number,
    constant: number,
    startQ: number,
    quoteDecimals: number
): Promise<number> => {
    const base = 10;
    const basePow = Math.pow(base, Number(quoteDecimals));
    const proceedsX = proceeds * basePow;
    const newX = solveForXDown(proceedsX, constant, startQ);
    return newX;
}
function solveForXDown(a: number, k: number, z: number): number {
    let x = z - 1e6; // Initial guess (slightly less than z)
    const tolerance = 1e-6;
    const maxIterations = 10000;

    for (let i = 0; i < maxIterations; i++) {
        const fValue = computeFDown(x, a, k, z);
        const fPrimeValue = computeFPrimeDown(x, k);

        if (fPrimeValue === 0) {
            throw new Error('Derivative is zero. Newton-Raphson method fails.');
        }

        const xNew = x - fValue / fPrimeValue;

        if (Math.abs(xNew - x) < tolerance) {
            return xNew;
        }

        x = xNew;
    }
    return x
    //throw new Error('Maximum iterations exceeded. No solution found.');
}
function computeFDown(x: number, a: number, k: number, z: number): number {
    const ln_k = Math.log(k);

    // Compute f(z)
    const exponentZ = 1 + z / 1e12;
    const kPowerZ = Math.pow(k, exponentZ);
    const termZ1 = (z * 1e4) / ln_k;
    const termZ2 = 1e16 / (ln_k * ln_k);
    const fz = kPowerZ * (termZ1 - termZ2) + 100000 * z;

    // Compute f(x)
    const exponentX = 1 + x / 1e12;
    const kPowerX = Math.pow(k, exponentX);
    const termX1 = (x * 1e4) / ln_k;
    const termX2 = 1e16 / (ln_k * ln_k);
    const fx = kPowerX * (termX1 - termX2) + 100000 * x;

    // Compute F(x) = f(z) - f(x) - a
    const F = fz - fx - a;

    return F;
}
function computeFPrimeDown(x: number, k: number): number {
    const ln_k = Math.log(k);

    // Compute components for f'(x)
    const exponent = 1 + x / 1e12;
    const kPowerX = Math.pow(k, exponent);
    const A_x = kPowerX;
    const B_x = (x * 1e4) / ln_k - 1e16 / (ln_k * ln_k);
    const A_prime_x = (A_x * ln_k) / 1e12;
    const B_prime_x = 1e4 / ln_k;

    // Compute f'(x)
    const f_prime = A_prime_x * B_x + A_x * B_prime_x + 100000;

    // Since F(x) = f(z) - f(x) - a, then F'(x) = -f'(x)
    const derivative = -f_prime;

    return derivative;
}
export function findRoot(a: Decimal, s: Decimal, k: Decimal): Decimal {
    // First, use the bisection method to find a good initial guess
    const initialGuess = bisectionMethod(a, s, k);

    // Now, refine the guess using Newton-Raphson
    let x = initialGuess;
    const epsilon = new Decimal('1e-5');  // Relative tolerance
    const maxIterations = 1000;

    for (let i = 0; i < maxIterations; i++) {
        const fx = f(x, a, s, k);
        const fpx = fPrime(x, s, k);

        if (fpx.abs().lessThan('1e-30')) {
            throw new Error('Derivative is too small; Newton-Raphson method fails.');
        }

        const x_new = x.minus(fx.div(fpx));
        const tolerance = x_new.abs().times(epsilon);

        if (x_new.minus(x).abs().lessThan(tolerance)) {
            return x_new;
        }

        x = x_new;
    }

    throw new Error('Newton-Raphson method did not converge within the maximum number of iterations.');
}
function bisectionMethod(a: Decimal, s: Decimal, k: Decimal): Decimal {
    let x_low = new Decimal('1');  // Lower bound
    let x_high = a;  // Upper bound (since a = (x-s) * something, x cannot be larger than a)
    const maxIterations = 1000;
    const epsilon = new Decimal('1e-5');

    for (let i = 0; i < maxIterations; i++) {
        const x_mid = x_low.plus(x_high).div(2);
        const f_mid = f(x_mid, a, s, k);

        if (f_mid.abs().lessThan(epsilon)) {
            return x_mid;
        }

        const f_low = f(x_low, a, s, k);

        if (f_low.times(f_mid).lessThan(0)) {
            x_high = x_mid;
        } else {
            x_low = x_mid;
        }

        // If the interval is sufficiently small, return the midpoint
        if (x_high.minus(x_low).lessThan(epsilon)) {
            return x_mid;
        }
    }

    throw new Error('Bisection method did not converge within the maximum number of iterations.');
}
function f(x: Decimal, a: Decimal, s: Decimal, k: Decimal): Decimal {
    const exp = x.div(1e12).plus(1);  // 1 + x / 10^12
    const kExp = k.pow(exp);  // k^(1 + x / 10^12)
    const sTerm = x.times(kExp).div(1e8);  // x * k^(1 + x / 10^12) / 10^8

    // f(x) = (x - s) * (x * k^(1 + x / 10^12) / 10^8 + 100000) - a
    return (x.minus(s)).times(sTerm.plus(100000)).minus(a);
}
function fPrime(x: Decimal, s: Decimal, k: Decimal): Decimal {
    const exp = x.div(1e12).plus(1);  // 1 + x / 10^12
    const ln_k = k.ln();  // Natural log of k
    const kExp = k.pow(exp);  // k^(1 + x / 10^12)

    const sTerm = x.times(kExp).div(1e8);  // x * k^(1 + x / 10^12) / 10^8
    const ds_dx = kExp.div(1e8).times(new Decimal(1).plus(x.times(ln_k).div(1e12)));  // Derivative of the exponential term

    const v = sTerm.plus(100000);  // v(x) = x * k^(1 + x / 10^12) / 10^8 + 100000
    const dv_dx = ds_dx;  // Derivative of v(x)

    // f'(x) = v(x) + (x - s) * dv/dx
    return v.plus(x.minus(s).times(dv_dx));
}
export function getPrice(x: number, k: number): number {
    const X = new Decimal(x);
    const K = new Decimal(k);
    return X.times(K.pow(new Decimal(1).plus(X.div(1e12))))
        .div(1e8)
        .plus(100000)
        .toNumber(); // Convert Decimal to number
}
/**
 * Computes an initial approximation for the fractional part of the exponent,
 * i.e. for k^(fractionalExponent) where
 *   fractionalExponent = (1 + x/1e12) - floor(1 + x/1e12).
 *
 * This approximation can be used as the starting guess for further on-chain refinement.
 *
 * @param k - The base as a Decimal (e.g. 1.5).
 * @param x - The x value as a Decimal (used to compute the full exponent 1 + x/1e12).
 * @returns A Decimal approximation of k^(fractionalExponent).
 */
export function fractionalApproximation(k: Decimal, x: Decimal): Decimal {
    // Ensure k > 0.
    if (k.lte(0)) {
      throw new Error("Base k must be positive.");
    }
  
    const one = new Decimal(1);
    // Compute the full exponent: 1 + x/1e12.
    const fullExponent = one.plus(x.dividedBy(new Decimal("1e12")));
    // Extract the fractional part: fullExponent - floor(fullExponent)
    const fractionalExponent = fullExponent.minus(fullExponent.floor());
    // Compute the approximation:
    // k^(fractionalExponent) = exp(fractionalExponent * ln(k))
    const result = Decimal.exp(fractionalExponent.times(k.ln()));
    return result;
}
export function quantityFromProceedsExpo(
    floorq: bigint,
    proceedsNormalized: bigint,
    gradient: bigint,
    divisorPow: bigint,
    offset: bigint,
    quoteDecimals: number,
): bigint {
    // Calculate the price using the same parameters
    const price = BigInt(Math.floor(getPrice(Number(floorq), 1.5)));

    // Compute the base power
    const basePow = BigInt(10) ** BigInt(quoteDecimals);

    // Adjust proceedsNormalized back to its original value if it was decreased
    let adjustedProceeds = proceedsNormalized;
    if (proceedsNormalized > BigInt(1)) {
        adjustedProceeds = proceedsNormalized + BigInt(1);
    }

    // Ensure price is not zero to prevent division by zero
    if (price === BigInt(0)) {
        throw new Error("Division by zero error: price is zero.");
    }

    // Calculate the quantity by rearranging the original formula
    const quantity = (adjustedProceeds * basePow) / price;

    return quantity;
}
export function quantityFromProceedsExpoWPrice(
    floorq: bigint,
    proceedsNormalized: bigint,
    gradient: bigint,
    divisorPow: bigint,
    offset: bigint,
    quoteDecimals: number,
    price: bigint,
    subOne: boolean
): bigint {
    // Calculate the price using the same parameters
    //const price = BigInt(Math.floor(getPrice(Number(floorq), 1.5)));

    // Compute the base power
    const basePow = BigInt(10) ** BigInt(quoteDecimals);

    // Adjust proceedsNormalized back to its original value if it was decreased
    let adjustedProceeds = proceedsNormalized;
    if (proceedsNormalized > BigInt(1)) {
        adjustedProceeds = proceedsNormalized + BigInt(1);
    }
    // Ensure price is not zero to prevent division by zero
    if (price === BigInt(0)) {
        throw new Error("Division by zero error: price is zero.");
    }
    // Calculate the quantity by rearranging the original formula
    let quantity = ((adjustedProceeds * basePow) / price);
    if (quantity > 0 && subOne) {
        quantity = quantity + BigInt(1);
    }
    //quantity = 
    return quantity;
}
export function floorProceedsExpo(
    floorq: bigint,
    quantity: bigint,
    gradient: bigint,
    divisorPow: bigint,
    offset: bigint,
    quoteDecimals: number,
): bigint {
    // Calculate the price using the same parameters
    const price = BigInt(Math.floor(getPrice(Number(floorq), 1.5)));
    // console.log("the price", price)

    // Compute the base power
    const basePow = BigInt(10) ** BigInt(quoteDecimals);

    // Calculate the total proceeds
    const total = price * quantity;

    // Calculate proceeds normalized
    let proceedsNormalized = total / basePow;

    // Subtract 1 if proceedsNormalized is greater than 1
    if (proceedsNormalized > BigInt(1)) {
        proceedsNormalized -= BigInt(1);
    }

    // Logging the proceedsNormalized value (equivalent to Rust's msg!)
    // console.log(`floor proceeds - proceeds normalized: ${proceedsNormalized}`);

    return proceedsNormalized;
}
export function floorProceedsExpoWPrice(
    floorq: bigint,
    quantity: bigint,
    gradient: bigint,
    divisorPow: bigint,
    offset: bigint,
    quoteDecimals: number,
    price: bigint,
): bigint {
    // Calculate the price using the same parameters
    //const price = BigInt(Math.floor(getPriceDec(Number(floorq), 1.5)));
    // console.log("the price", price)

    // Compute the base power
    const basePow = BigInt(10) ** BigInt(quoteDecimals);

    // Calculate the total proceeds
    const total = price * quantity;

    // Calculate proceeds normalized
    let proceedsNormalized = total / basePow;

    // Subtract 1 if proceedsNormalized is greater than 1
    if (proceedsNormalized > BigInt(1)) {
        proceedsNormalized -= BigInt(1);
    }

    // Logging the proceedsNormalized value (equivalent to Rust's msg!)
    // console.log(`floor proceeds - proceeds normalized: ${proceedsNormalized}`);

    return proceedsNormalized;
}