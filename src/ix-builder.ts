import * as anchor from '@coral-xyz/anchor';
import { Limitless } from './limitless';
import idl from './idl.json'
import { TOKEN_PROGRAM_ID } from '@coral-xyz/anchor/dist/cjs/utils/token';
import Decimal from 'decimal.js';
import { PublicKey } from '@solana/web3.js';

export const PROGRAM_ID = "Hrb8aUy7HF4ArHGyfU6fRpHwKLwCPHT5aBVQj83G5Z5"
export const BASE_ADDRESS = "8tbV9JoWhtxm7H8ZQRCwdxakF5pm5pUJ3WPxnVFH3jDd"
export const MARKET_PRESET_ADDRESS = "AXsse9Kra3oh2GCRYNDxhr63UtbpnEUZU2CdoouJ6C6o"


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
    const createMarketIx = await program.methods
        .createMarket(marketId, {
            buyFee: buyFee,
            sellFee: sellFee,
            launchDate: new anchor.BN(start),
            creatorSplit: creatorSplit,
            presaleOffset: new anchor.BN(presaleOffset),
            presaleSplit: presaleSplit,
            presaleFee: presaleFee,
            name: name,
            symbol: symbol,
            uri: uri,
            presaleBaseSplit: baseSplit,
            creatorBuyMax: new anchor.BN(10000 * (10 ** 6))
        })
        .accountsPartial({
            creator: user,
            marketBase: marketBaseAddress,
            marketState: marketStateAddress,
            marketPreset: new PublicKey(MARKET_PRESET_ADDRESS),
            baseMint: baseMintAddress,
            quoteMint: quoteMint,
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
            baseTokenVault: baseTokenAddress,
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
            quoteTokenVault: quoteTokenAddress,
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
            baseDepositVault: baseDepositTokenAddress,
            tokenProgram: TOKEN_PROGRAM_ID,
            systemProgram: anchor.web3.SystemProgram.programId,
        }).instruction()
    return [createVaultsIx, createVaultsIx1, createVaultsIx2, createVaultsIx3, createVaultsIx4]
}
export async function claimFeesIx(
    creatorFeeAddress: anchor.web3.PublicKey,
    marketStateAddress: anchor.web3.PublicKey,
    program: anchor.Program<Limitless>,
): Promise<anchor.web3.TransactionInstruction> {
    let marketBaseAddress = new anchor.web3.PublicKey(BASE_ADDRESS);
    let [platformFeeVault, platformFeeVaultBump] = await anchor.web3.PublicKey.findProgramAddress(
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
    const randomChars = await randomString(20);
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
export async function buyIx(
    quantity: anchor.BN,
    maxCost: anchor.BN,
    user: anchor.web3.PublicKey,
    userBaseToken: anchor.web3.PublicKey,
    userQuoteToken: anchor.web3.PublicKey,
    market: anchor.web3.PublicKey,
    program: anchor.Program<Limitless>,
    marketState: any
): Promise<anchor.web3.TransactionInstruction>{
    const ix = await program.methods
        .buy({
            quantity: quantity,
            maxCost: maxCost
        })
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
            tokenProgram: TOKEN_PROGRAM_ID,
            systemProgram: anchor.web3.SystemProgram.programId,
            clock: anchor.web3.SYSVAR_CLOCK_PUBKEY
        }).instruction()
    return ix
}
export  async function buyIxCreator(
    quantity: anchor.BN,
    maxCost: anchor.BN,
    user: anchor.web3.PublicKey,
    userQuoteToken: anchor.web3.PublicKey,
    market: anchor.web3.PublicKey,
    marketState: any,
    program: anchor.Program<Limitless>
): Promise<anchor.web3.TransactionInstruction>{
    //TODO pass in market as parameter
    const ix = await program.methods
        .creatorBuy({
            quantity: quantity,
            maxCost: maxCost
        })
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
            tokenProgram: TOKEN_PROGRAM_ID,
            systemProgram: anchor.web3.SystemProgram.programId,
            clock: anchor.web3.SYSVAR_CLOCK_PUBKEY
        }).instruction()
    return ix
}
export  async function sellIx(
    quantity: anchor.BN,
    minProceeds: anchor.BN,
    user: anchor.web3.PublicKey,
    userBaseToken: anchor.web3.PublicKey,
    userQuoteToken: anchor.web3.PublicKey,
    market: anchor.web3.PublicKey,
    marketState: any,
    program: anchor.Program<Limitless>
): Promise<anchor.web3.TransactionInstruction>{
    console.log("user", user.toBase58())
    const ix = await program.methods
        .sell({
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
            quoteTokenVault: marketState.quoteMintTokenAddress,
            quoteTokenFloorVault: marketState.quoteMintFloorTokenAddress,
            platformFeeVault: marketState.platformFeeVaultAddress,
            tokenProgram: TOKEN_PROGRAM_ID,
            systemProgram: anchor.web3.SystemProgram.programId,
            clock: anchor.web3.SYSVAR_CLOCK_PUBKEY
        }).instruction()
    return ix
}
export  async function sellFloorIx(
    quantity: anchor.BN,
    minProceeds: anchor.BN,
    user: anchor.web3.PublicKey,
    userBaseToken: anchor.web3.PublicKey,
    userQuoteToken: anchor.web3.PublicKey,
    market: anchor.web3.PublicKey,
    marketState: any,
    program: anchor.Program<Limitless>,
): Promise<anchor.web3.TransactionInstruction>{
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
export  async function updateFloorIx(
    quantity: anchor.BN,
    market: anchor.web3.PublicKey,
    program: anchor.Program<Limitless>,
): Promise<anchor.web3.TransactionInstruction>{
    //TODO pass in market as parameter
    //let marketState = await program.account.marketState.fetch(market);
    const ix = await program.methods
        .updateFloor(quantity)
        .accountsPartial({
            marketBase: new anchor.web3.PublicKey(BASE_ADDRESS),
            marketState: market,
            systemProgram: anchor.web3.SystemProgram.programId
        }).instruction()
    return ix
}
export  async function boostFloorIx(
    market: anchor.web3.PublicKey,
    marketState: any,
    program: anchor.Program<Limitless>
): Promise<anchor.web3.TransactionInstruction>{
    //TODO pass in market as parameter
    const ix = await program.methods
        .boostFloor()
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
export async function closeDepositAccountIx(
    user: anchor.web3.PublicKey,
    market: anchor.web3.PublicKey,
    program: anchor.Program<Limitless>,
): Promise<anchor.web3.TransactionInstruction> {
    let [depositAccountAddress, depositAccountBump] = await anchor.web3.PublicKey.findProgramAddress(
        [market.toBuffer(), user.toBuffer()],
        program.programId
    );
    const ix = await program.methods
        .closeDepositAccount()
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
): Promise<anchor.web3.TransactionInstruction> {
    let [depositAccountAddress, depositAccountBump] = await anchor.web3.PublicKey.findProgramAddress(
        [market.toBuffer(), user.toBuffer()],
        program.programId
    );

    const ix = await program.methods
        .withdrawBase(amount)
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
export async function borrowIx(
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
        .borrowQuote(amount)
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
export async function lookupLimitUp(
    cost: Decimal,
    constant: Decimal,
    startQ: Decimal,
    quoteDecimals: Decimal,
    divisorPow: Decimal,
    pow1: Decimal,
    pow2: Decimal
): Promise<Decimal> {
    // Convert all inputs to Decimal if they aren't already

    // Calculate costX using Decimal operations
    const basePow = new Decimal(10).pow(quoteDecimals);
    const costX = cost.times(basePow);

    // Solve using the Decimal-based implementation
    const newX = solveForXUp(costX, constant, startQ, divisorPow, pow1, pow2);

    return newX;
}
function solveForXUp(a: Decimal, k: Decimal, z: Decimal, divisorPow: Decimal, pow1: Decimal, pow2: Decimal): Decimal {
    //TODO tolerance should scale to the value
    const xInitial = findInitialGuess(a, k, z, divisorPow, pow1, pow2);
    let x = xInitial;
    const tolerance = new Decimal(1e-5);
    const maxIterations = 100;
    for (let i = 0; i < maxIterations; i++) {
        const fValue = computeFUp(x, a, k, z, divisorPow, pow1, pow2);
        const fPrimeValue = computeFPrimeUp(x, k, divisorPow, pow1, pow2);

        if (fPrimeValue.equals(0)) {
            throw new Error('Derivative is zero. Newton-Raphson method fails.');
        }

        const xNew = x.minus(fValue.dividedBy(fPrimeValue));
        if (xNew.minus(x).abs().lessThan(tolerance)) {
            return xNew;
        }

        x = xNew;
    }

    return x;
    //throw new Error('Maximum iterations exceeded. No solution found.');
}
function findInitialGuess(a: Decimal, k: Decimal, z: Decimal, divisorPow: Decimal, pow1: Decimal, pow2: Decimal): Decimal {
    //TODO the tolerance here should scale to the z number (supply number)
    const tolerance = new Decimal(1);
    const maxIterations = 1000;

    // Define an interval [xLower, xUpper] where the function changes sign
    let xLower = z.plus(new Decimal(1)); // Start slightly above z
    let xUpper = z.plus(new Decimal(1e16)); // An upper bound; adjust as needed

    let fLower = computeFUp(xLower, a, k, z, divisorPow, pow1, pow2);
    let fUpper = computeFUp(xUpper, a, k, z, divisorPow, pow1, pow2);

    // Expand the interval until the function changes sign
    while (fLower.times(fUpper).greaterThanOrEqualTo(0)) {
        xUpper = xUpper.plus(new Decimal(1e12));
        fUpper = computeFUp(xUpper, a, k, z, divisorPow, pow1, pow2);

        // Safety check to prevent infinite loop
        if (xUpper.minus(z).greaterThan(new Decimal(1e15))) {
            throw new Error('Bisection method fails. Cannot find a valid interval.');
        }
    }

    let xMid = new Decimal(0);
    for (let i = 0; i < maxIterations; i++) {
        xMid = xLower.plus(xUpper).dividedBy(2);
        const fMid = computeFUp(xMid, a, k, z, divisorPow, pow1, pow2);

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
function computeFPrimeUp(x: Decimal, k: Decimal, divisorPow: Decimal, pow1: Decimal, pow2: Decimal): Decimal {
    const ln_k = Decimal.ln(k);
    const divisorPowExp = new Decimal(10).pow(divisorPow)
    const pow1Exp = new Decimal(10).pow(pow1)
    const pow2Exp = new Decimal(10).pow(pow2)

    const exponent = new Decimal(1).plus(x.dividedBy(divisorPowExp));
    const kExponent = k.pow(exponent);
    const commonTerm = pow1Exp.dividedBy(ln_k);
    const constantTerm = pow2Exp.dividedBy(ln_k.pow(2));
    const derivativeExponent = kExponent.times(ln_k.dividedBy(divisorPowExp));
    const derivativeTerm = derivativeExponent
        .times(x.times(commonTerm).minus(constantTerm))
        .plus(kExponent.times(commonTerm))
        .plus(new Decimal(100000));
    return derivativeTerm;
}
function computeFUp(x: Decimal, a: Decimal, k: Decimal, z: Decimal, divisorPow: Decimal, pow1: Decimal, pow2: Decimal): Decimal {
    const ln_k = Decimal.ln(k);
    const divisorPowExp = new Decimal(10).pow(divisorPow)
    const pow1Exp = new Decimal(10).pow(pow1)
    const pow2Exp = new Decimal(10).pow(pow2)
    const exponentX = new Decimal(1).plus(x.dividedBy(divisorPowExp));
    const exponentZ = new Decimal(1).plus(z.dividedBy(divisorPowExp));
    const commonTerm = pow1Exp.dividedBy(ln_k);
    const constantTerm = pow2Exp.dividedBy(ln_k.pow(2));
    const termX = k.pow(exponentX)
        .times(x.times(commonTerm).minus(constantTerm))
        .plus(new Decimal(100000).times(x));
    const termZ = k.pow(exponentZ)
        .times(z.times(commonTerm).minus(constantTerm))
        .plus(new Decimal(100000).times(z));
    return termX.minus(termZ).minus(a);
}
export async function lookupLimitDown(
    constant: Decimal,
    newCqd: Decimal,
    cqd: Decimal,
    divisorPow: Decimal, pow1: Decimal, pow2: Decimal
): Promise<Decimal> {
    // Create Decimal instances
    

    // Optional: still compute basePow if needed
    // const basePow = new Decimal(10).pow(quoteDecimals);

    // Validate 'constant'
    if (constant.lte(0) || constant.eq(1)) {
        throw new Error("Parameter 'k' must be greater than 0 and not equal to 1.");
    }

    // Use natural log via log(x, Math.E)
    const ln_k = Decimal.log(constant, Math.E);
    if (ln_k.eq(0)) {
        throw new Error("ln(k) is zero, causing a division by zero error.");
    }

    // (ln_k)^2
    const ln_k_squared = ln_k.mul(ln_k);

    // Calculate exponents: 1 + cqd / 1e12
    const exponentZ = new Decimal(1).plus(cqd.div((new Decimal(10).pow(divisorPow))));
    const exponentX = new Decimal(1).plus(newCqd.div((new Decimal(10).pow(divisorPow))));

    // constant^exponent
    const k_exponentZ = constant.pow(exponentZ);
    const k_exponentX = constant.pow(exponentX);

    // Inner terms
    const termZ_inner = cqd
        .mul((new Decimal(10).pow(pow1)))
        .div(ln_k)
        .minus(new Decimal(10).pow(pow2).div(ln_k_squared));

    const termX_inner = newCqd
        .mul((new Decimal(10).pow(pow1)))
        .div(ln_k)
        .minus(new Decimal(10).pow(pow2).div(ln_k_squared));

    // Outer terms
    const termZ = k_exponentZ.mul(termZ_inner).plus(new Decimal(100000).mul(cqd));
    const termX = k_exponentX.mul(termX_inner).plus(new Decimal(100000).mul(newCqd));
    // Final result
    const result = termZ.minus(termX);

    // Convert back to a number. Watch out for very large or very small values.
    return result
};
export async function lookupLimitUpWithOutput(
    constant: Decimal,
    newCqd: Decimal,
    cqd: Decimal,
    divisorPow: Decimal, pow1: Decimal, pow2: Decimal
): Promise<Decimal> {
    // Validate 'constant'
    if (constant.lte(0) || constant.eq(1)) {
        throw new Error("Parameter 'k' must be greater than 0 and not equal to 1.");
    }

    // Use natural log via Decimal.ln()
    const ln_k = constant.ln();
    if (ln_k.eq(0)) {
        throw new Error("ln(k) is zero, causing a division by zero error.");
    }

    // Calculate ln_k_squared
    const ln_k_squared = ln_k.mul(ln_k);

    // Calculate exponents
    const exponentZ = new Decimal(1).plus(cqd.div(new Decimal(10).pow(divisorPow)));
    const exponentX = new Decimal(1).plus(newCqd.div(new Decimal(10).pow(divisorPow)));

    // Calculate k^exponent values
    const k_exponentZ = constant.pow(exponentZ);
    const k_exponentX = constant.pow(exponentX);

    // Calculate inner terms
    const termZ_inner = cqd.mul(new Decimal(10).pow(pow1)).div(ln_k)
        .minus(new Decimal(10).pow(pow2).div(ln_k_squared));
    const termX_inner = newCqd.mul(new Decimal(10).pow(pow1)).div(ln_k)
        .minus(new Decimal(10).pow(pow2).div(ln_k_squared));

    // Calculate final terms
    const termZ = k_exponentZ.mul(termZ_inner).plus(new Decimal(100000).mul(cqd));
    const termX = k_exponentX.mul(termX_inner).plus(new Decimal(100000).mul(newCqd));

    // Calculate result
    const a = termX.minus(termZ);

    return a;
}
export async function lookupLimitDownWithOutput(
    proceeds: Decimal,
    constant: Decimal,
    startQ: Decimal,
    quoteDecimals: Decimal,
    divisorPow: Decimal, pow1: Decimal, pow2: Decimal
): Promise<Decimal> {
    // Convert the base to Decimal
    const base = new Decimal(10);
    // Calculate basePow using Decimal methods
    const basePow = base.pow(quoteDecimals);
    // Calculate costX using Decimal
    const costX = proceeds.times(basePow);
    // Call solveForXDown with Decimal values
    const newX = solveForXDown(costX, constant, startQ, divisorPow, pow1, pow2);
    return newX;
}
function solveForXDown(a: Decimal, k: Decimal, z: Decimal, divisorPow: Decimal, pow1: Decimal, pow2: Decimal): Decimal {
    // Initial guess (slightly less than z)
    let x = z.minus(new Decimal('1e6'));
    const tolerance = new Decimal('1e-3');
    const maxIterations = 10000;

    for (let i = 0; i < maxIterations; i++) {
        const fValue = computeFDown(x, a, k, z, divisorPow, pow1, pow2);
        const fPrimeValue = computeFPrimeDown(x, k, divisorPow, pow1, pow2);

        if (fPrimeValue.equals(0)) {
            throw new Error('Derivative is zero. Newton-Raphson method fails.');
        }

        const xNew = x.minus(fValue.dividedBy(fPrimeValue));

        if (xNew.minus(x).abs().lessThan(tolerance)) {
            return xNew;
        }

        x = xNew;
    }
    return x;
    //throw new Error('Maximum iterations exceeded. No solution found.');
}
function computeFDown(x: Decimal, a: Decimal, k: Decimal, z: Decimal, divisorPow: Decimal, pow1: Decimal, pow2: Decimal): Decimal {
    const ln_k = Decimal.ln(k);

    // Compute f(z)
    const exponentZ = new Decimal(1).plus(z.div(new Decimal(10).pow(divisorPow)));
    const kPowerZ = k.pow(exponentZ);
    const termZ1 = z.times(new Decimal(10).pow(pow1)).div(ln_k);
    const termZ2 = new Decimal(10).pow(pow2).div(ln_k.pow(2));
    const fz = kPowerZ.times(termZ1.minus(termZ2)).plus(new Decimal(100000).times(z));

    // Compute f(x)
    const exponentX = new Decimal(1).plus(x.div(new Decimal(10).pow(divisorPow)));
    const kPowerX = k.pow(exponentX);
    const termX1 = x.times(new Decimal(10).pow(pow1)).div(ln_k);
    const termX2 = new Decimal(10).pow(pow2).div(ln_k.pow(2));
    const fx = kPowerX.times(termX1.minus(termX2)).plus(new Decimal(100000).times(x));

    // Compute F(x) = f(z) - f(x) - a
    const F = fz.minus(fx).minus(a);

    return F;
}
function computeFPrimeDown(x: Decimal, k: Decimal, divisorPow: Decimal, pow1: Decimal, pow2: Decimal): Decimal {
    const ln_k = Decimal.ln(k);

    // Compute components for f'(x)
    const divisorPowExp = new Decimal(10).pow(divisorPow);
    const exponent = new Decimal(1).plus(x.div(divisorPowExp));
    const kPowerX = k.pow(exponent);
    const A_x = kPowerX;
    const pow1Exp = new Decimal(10).pow(pow1);
    const pow2Exp = new Decimal(10).pow(pow2);
    const B_x = x.times(pow1Exp).div(ln_k).minus(pow2Exp.div(ln_k.pow(2)));
    const A_prime_x = A_x.times(ln_k).div(divisorPowExp);
    const B_prime_x = pow1Exp.div(ln_k);

    // Compute f'(x)
    const f_prime = A_prime_x.times(B_x).plus(A_x.times(B_prime_x)).plus(new Decimal(100000));

    // Since F(x) = f(z) - f(x) - a, then F'(x) = -f'(x)
    const derivative = f_prime.negated();

    return derivative;
}
export function findRoot(a: Decimal, s: Decimal, k: Decimal, divisorPow: Decimal): Decimal {
    // First, use the bisection method to find a good initial guess
    const initialGuess = bisectionMethod(a, s, k, divisorPow);

    // Now, refine the guess using Newton-Raphson
    let x = initialGuess;   
    const epsilon = new Decimal('1e-5');  // Relative tolerance
    const maxIterations = 1000;

    for (let i = 0; i < maxIterations; i++) {
        const fx = f(x, a, s, k, divisorPow);
        const fpx = fPrime(x, s, k, divisorPow);

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

    //throw new Error('Newton-Raphson method did not converge within the maximum number of iterations.');
}
function bisectionMethod(a: Decimal, s: Decimal, k: Decimal, divisorPow: Decimal): Decimal {
    // const divisorPowExp = new Decimal(10).pow(divisorPow);
    let x_low = new Decimal('1');  // Lower bound
    let x_high = a;  // Upper bound (since a = (x-s) * something, x cannot be larger than a)
    const maxIterations = 1000;
    const epsilon = new Decimal('1e-5');
    let xm = new Decimal(0)

    for (let i = 0; i < maxIterations; i++) {
        const x_mid = x_low.plus(x_high).div(2);
        const f_mid = f(x_mid, a, s, k, divisorPow);
        xm = x_mid;

        if (f_mid.abs().lessThan(epsilon)) {
            return x_mid;
        }

        const f_low = f(x_low, a, s, k, divisorPow);

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
    return xm
    // throw new Error('Bisection method did not converge within the maximum number of iterations.');
}
function f(x: Decimal, a: Decimal, s: Decimal, k: Decimal, divisorPow: Decimal): Decimal {
    const divisorPowExp = new Decimal(10).pow(divisorPow);
    const exp = x.div(divisorPowExp).plus(1);  // 1 + x / 10^12
    const kExp = k.pow(exp);  // k^(1 + x / 10^12)
    const sTerm = x.times(kExp).div(1e8);  // x * k^(1 + x / 10^12) / 10^8

    // f(x) = (x - s) * (x * k^(1 + x / 10^12) / 10^8 + 100000) - a
    return (x.minus(s)).times(sTerm.plus(100000)).minus(a);
}
function fPrime(x: Decimal, s: Decimal, k: Decimal, divisorPow: Decimal): Decimal {
    const divisorPowExp = new Decimal(10).pow(divisorPow);
    const exp = x.div(divisorPowExp).plus(1);  // 1 + x / 10^12
    const ln_k = k.ln();  // Natural log of k
    const kExp = k.pow(exp);  // k^(1 + x / 10^12)

    const sTerm = x.times(kExp).div(1e8);  // x * k^(1 + x / 10^12) / 10^8
    const ds_dx = kExp.div(1e8).times(new Decimal(1).plus(x.times(ln_k).div(divisorPowExp)));  // Derivative of the exponential term

    const v = sTerm.plus(100000);  // v(x) = x * k^(1 + x / 10^12) / 10^8 + 100000
    const dv_dx = ds_dx;  // Derivative of v(x)

    // f'(x) = v(x) + (x - s) * dv/dx
    return v.plus(x.minus(s).times(dv_dx));
}
export async function getPrice(x: Decimal, k: Decimal, divisorPow: Decimal, gradient: Decimal, offset: Decimal): Promise<Decimal> {
    return x.times(k.pow(new Decimal(1).plus(x.div(new Decimal(10).pow(divisorPow)))))
        .div(gradient)
        .plus(offset)
        //.toNumber(); // Convert Decimal to number
}
export async function quantityFromProceedsWPrice(
    proceedsNormalized: Decimal,
    quoteDecimals: number,
    price: Decimal,
    subOne: boolean
): Promise<Decimal> {
    const basePow = new Decimal(10).pow(quoteDecimals);

    // Adjust proceedsNormalized back to its original value if it was decreased
    let adjustedProceeds = proceedsNormalized;
    if (proceedsNormalized.greaterThan(new Decimal(1))) {
        adjustedProceeds = proceedsNormalized.plus(1);
    }

    // Ensure price is not zero to prevent division by zero
    if (price.equals(0)) {
        throw new Error("Division by zero error: price is zero.");
    }

    // Calculate the quantity by rearranging the original formula
    let quantity = adjustedProceeds.mul(basePow).dividedBy(price);
    if (quantity.greaterThan(0) && subOne) {
        quantity = quantity.plus(1);
    }
    return quantity;
}
export async function floorProceeds(
    floorq: Decimal,
    quantity: Decimal,
    gradient: Decimal,
    divisorPow: Decimal,
    offset: Decimal,
    quoteDecimals: number,
): Promise<Decimal> {
    // Calculate the price using the same parameters
    const price = (await getPrice(
        floorq, 
        new Decimal(1.5), 
        divisorPow, 
        gradient, 
        offset  
    )).floor();
    
    // Compute the base power as a Decimal
    const basePow = new Decimal(10).pow(quoteDecimals);

    // Calculate the total proceeds using Decimal multiplication
    const total = price.mul(quantity);

    // Calculate proceeds normalized by dividing total by basePow
    let proceedsNormalized = total.div(basePow);

    // Subtract 1 if proceedsNormalized is greater than 1
    if (proceedsNormalized.gt(1)) {
        proceedsNormalized = proceedsNormalized.minus(1);
    }

    return proceedsNormalized;
}
export async function floorProceedsWPrice(
    quantity: Decimal,
    quoteDecimals: number,
    price: Decimal,
): Promise<Decimal> {
    // Compute the base power as a Decimal
    const basePow = new Decimal(10).pow(quoteDecimals);

    // Calculate the total proceeds using Decimal multiplication
    const total = price.mul(quantity);

    // Calculate proceeds normalized by dividing by basePow
    let proceedsNormalized = total.dividedBy(basePow);

    // Subtract 1 if proceedsNormalized is greater than 1
    if (proceedsNormalized.greaterThan(1)) {
        proceedsNormalized = proceedsNormalized.minus(1);
    }

    return proceedsNormalized;
}
export async function randomString(length: number): Promise<string> {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
};