import * as anchor from '@coral-xyz/anchor';
import { Limitless, IDL } from './limitless';
import { MarketState } from './interfaces';
import { TOKEN_PROGRAM_ID } from '@coral-xyz/anchor/dist/cjs/utils/token';
import Decimal from 'decimal.js';

const PROGRAM_ID = "z9P826HFdY5NPMgjgv4eubKFuxyJcjkRfdJuekZoaR6"
const BASE_ADDRESS = "6HS3moymTsmASZo1VnjyPQ4Hfh1jrHdZ81ZaiTTvPsHM"

export const createProgramConnection = async (
    anchorWallet: anchor.Wallet,
    confirmOpts: anchor.web3.ConfirmOptions,
    connection: anchor.web3.Connection
): Promise<anchor.Program<Limitless>> => {
    //const solConnection = new anchor.web3.Connection(rpcUrl);
    const provider = new anchor.AnchorProvider(connection, anchorWallet, confirmOpts);
    const idl = IDL as Limitless;
    const program = new anchor.Program<Limitless>(idl, new anchor.web3.PublicKey(PROGRAM_ID), provider);
    return program
}
export const getMarket = async (
    marketAddress: anchor.web3.PublicKey,
    program: anchor.Program<Limitless>,
    commitment: anchor.web3.Commitment
): Promise<MarketState> => {
    let marketState: any = await program.account.marketState.fetch(marketAddress, commitment);
    return marketState as MarketState
}
//todo buy Tx, buy IX
export const buyIx = async (
    quantity: anchor.BN,
    maxCost: anchor.BN,
    user: anchor.web3.PublicKey,
    userBaseToken: anchor.web3.PublicKey,
    userQuoteToken: anchor.web3.PublicKey,
    market: anchor.web3.PublicKey,
    program: anchor.Program<Limitless>,
): Promise<anchor.web3.TransactionInstruction> => {
    //TODO pass in market as parameter
    let marketState = await program.account.marketState.fetch(market);
    const ix = await program.methods
        .buy({
            quantity: quantity,
            maxCost: maxCost
        })
        .accounts({
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
export const sellIx = async (
    quantity: anchor.BN,
    minProceeds: anchor.BN,
    user: anchor.web3.PublicKey,
    userBaseToken: anchor.web3.PublicKey,
    userQuoteToken: anchor.web3.PublicKey,
    market: anchor.web3.PublicKey,
    program: anchor.Program<Limitless>,
): Promise<anchor.web3.TransactionInstruction> => {
    let marketState = await program.account.marketState.fetch(market);
    const ix = await program.methods
        .sell({
            quantity: quantity,
            minProceeds: minProceeds
        })
        .accounts({
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
    program: anchor.Program<Limitless>,
): Promise<anchor.web3.TransactionInstruction> => {
    let marketState = await program.account.marketState.fetch(market);
    const ix = await program.methods
        .sellFloor({
            quantity: quantity,
            minProceeds: minProceeds
        })
        .accounts({
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

    for (let i = 0; i < maxIterations; i++) {
        const fValue = computeFUp(x, a, k, z);
        const fPrimeValue = computeFPrimeUp(x, k);

        if (fPrimeValue.equals(0)) {
            throw new Error('Derivative is zero. Newton-Raphson method fails.');
        }

        const xNew = x.minus(fValue.dividedBy(fPrimeValue));

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
// function solveForXUp(a: number, k: number, z: number): number {
//     let x = z + 1e6; // Initial guess (slightly greater than z)
//     const tolerance = 1e-6;
//     const maxIterations = 10000;

//     for (let i = 0; i < maxIterations; i++) {
//         const fValue = computeFUp(x, a, k, z);
//         const fPrimeValue = computeFPrimeUp(x, k);

//         if (fPrimeValue === 0) {
//             throw new Error('Derivative is zero. Newton-Raphson method fails.');
//         }

//         const xNew = x - fValue / fPrimeValue;

//         if (Math.abs(xNew - x) < tolerance) {
//             return xNew;
//         }

//         x = xNew;
//     }
//     return x
//     //throw new Error('Maximum iterations exceeded. No solution found.');
// }
// function computeFPrimeUp(x: number, k: number): number {
//     const ln_k = Math.log(k);
//     const exponent = 1 + x / 1e12;
//     const kExponent = Math.pow(k, exponent);
//     const commonTerm = 1e4 / ln_k;
//     const constantTerm = 1e16 / (ln_k * ln_k);
//     const derivativeExponent = kExponent * (ln_k / 1e12);
//     const derivativeTerm = derivativeExponent * (x * commonTerm - constantTerm) + kExponent * commonTerm + 100000;
//     return derivativeTerm;
// }
// function computeFUp(x: number, a: number, k: number, z: number): number {
//     const ln_k = Math.log(k);
//     const exponentX = 1 + x / 1e12;
//     const exponentZ = 1 + z / 1e12;
//     const commonTerm = 1e4 / ln_k;
//     const constantTerm = 1e16 / (ln_k * ln_k);
//     const termX = Math.pow(k, exponentX) * (x * commonTerm - constantTerm) + 100000 * x;
//     const termZ = Math.pow(k, exponentZ) * (z * commonTerm - constantTerm) + 100000 * z;
//     return termX - termZ - a;
// }
export const lookupLimitDown = async (
    constant: number,
    newCqd: number,
    cqd: number,
    quoteDecimals: number
): Promise<number> => {
    const base = 10;
    const basePow = Math.pow(base, Number(quoteDecimals));
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

    const a = termZ - termX;

    return a;
}
export const lookupLimitUpWithOutput = async (
    constant: number,
    newCqd: number,
    cqd: number,
    quoteDecimals: number
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
    const costX = proceeds * basePow;
    const newX = solveForXDown(costX, constant, startQ);
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
//lookupLimitUpWithOutput -> use base quantity for new cqd, get integral
//lookupLimitDownWithOutput -> use reverse calc from a -> unkown x value
// Function to compute f(x)
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
export const updateFloorIx = async (
    quantity: anchor.BN,
    user: anchor.web3.PublicKey,
    market: anchor.web3.PublicKey,
    program: anchor.Program<Limitless>,
): Promise<anchor.web3.TransactionInstruction> => {
    //TODO pass in market as parameter
    //let marketState = await program.account.marketState.fetch(market);
    const ix = await program.methods
        .updateFloor(quantity)
        .accounts({
            user: user,
            marketBase: new anchor.web3.PublicKey(BASE_ADDRESS),
            marketState: market,
            systemProgram: anchor.web3.SystemProgram.programId
        }).instruction()
    return ix
}
export const boostFloorIx = async (
    user: anchor.web3.PublicKey,
    market: anchor.web3.PublicKey,
    program: anchor.Program<Limitless>,
): Promise<anchor.web3.TransactionInstruction> => {
    //TODO pass in market as parameter
    let marketState = await program.account.marketState.fetch(market);
    const ix = await program.methods
        .boostFloor()
        .accounts({
            user: user,
            marketBase: new anchor.web3.PublicKey(BASE_ADDRESS),
            marketState: market,
            quoteTokenVault: marketState.quoteMintTokenAddress,
            quoteTokenFloorVault: marketState.quoteMintFloorTokenAddress,
            tokenProgram: TOKEN_PROGRAM_ID,
            systemProgram: anchor.web3.SystemProgram.programId,
        }).instruction()
    return ix
}
export function getPrice(x: number, k: number) {
    return ((x * Math.pow(k, 1 + x / 1e12)) / 1e8) + 100000;
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
      .accounts({
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
    program: anchor.Program<Limitless>,
    userBaseTokenAddress: anchor.web3.PublicKey,
):  Promise<anchor.web3.TransactionInstruction> {
    let marketState = await program.account.marketState.fetch(market);
    let [depositAccountAddress, depositAccountBump] = await anchor.web3.PublicKey.findProgramAddress(
        [market.toBuffer(), user.toBuffer()],
        program.programId
      );
      const ix = await program.methods
      .depositBase(amount)
      .accounts({
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
export async function withdrawIx(
    amount: anchor.BN,
    user: anchor.web3.PublicKey,
    market: anchor.web3.PublicKey,
    program: anchor.Program<Limitless>,
    userBaseTokenAddress: anchor.web3.PublicKey,
):  Promise<anchor.web3.TransactionInstruction> {
    let marketState = await program.account.marketState.fetch(market);
    let [depositAccountAddress, depositAccountBump] = await anchor.web3.PublicKey.findProgramAddress(
        [market.toBuffer(), user.toBuffer()],
        program.programId
      );
      const ix = await program.methods
      .withdrawBase(amount)
      .accounts({
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
    console.log(`floor proceeds - proceeds normalized: ${proceedsNormalized}`);

    return proceedsNormalized;
}
export async function borrowIx(
    amount: anchor.BN,
    user: anchor.web3.PublicKey,
    market: anchor.web3.PublicKey,
    program: anchor.Program<Limitless>,
    userQuoteTokenAddress: anchor.web3.PublicKey,
):  Promise<anchor.web3.TransactionInstruction> {
    let marketState = await program.account.marketState.fetch(market);
    let [depositAccountAddress, depositAccountBump] = await anchor.web3.PublicKey.findProgramAddress(
        [market.toBuffer(), user.toBuffer()],
        program.programId
      );
      const ix = await program.methods
      .borrowQuote(amount)
      .accounts({
        user: user,
        marketBase: new anchor.web3.PublicKey(BASE_ADDRESS),
        marketState: market,
        userQuoteToken: userQuoteTokenAddress,
        quoteTokenFloorVault: marketState.quoteMintFloorTokenAddress,
        depositAccount: depositAccountAddress
      }).instruction();
      return ix;
}
export async function repayIx(
    amount: anchor.BN,
    user: anchor.web3.PublicKey,
    market: anchor.web3.PublicKey,
    program: anchor.Program<Limitless>,
    userQuoteTokenAddress: anchor.web3.PublicKey,
):  Promise<anchor.web3.TransactionInstruction> {
    let marketState = await program.account.marketState.fetch(market);
    let [depositAccountAddress, depositAccountBump] = await anchor.web3.PublicKey.findProgramAddress(
        [market.toBuffer(), user.toBuffer()],
        program.programId
      );
      const ix = await program.methods
      .repayQuote(amount)
      .accounts({
        user: user,
        marketBase: new anchor.web3.PublicKey(BASE_ADDRESS),
        marketState: market,
        userQuoteToken: userQuoteTokenAddress,
        quoteTokenFloorVault: marketState.quoteMintFloorTokenAddress,
        depositAccount: depositAccountAddress
      }).instruction();
      return ix;
}

export const testFunc1 = async (a: number): Promise<number> => {
    return a + 1;
}
export const testFunc = async (): Promise<number> => {
    return 0;
}


// src/index.ts
export const greet = (name: string): string => {
    return `Hello, ${name}!`;
};

//todo, play with scaler value to get right pricing cost ratio
//play with offset too cus maybe the early supply snipe is quite big
//TODO - floor update must account for borrowed amount?

//IDEA LTV borrow dampener that gets smaller as deposited timer goes on, can actully only borrow 1% or less in the beginning of deposit
//also have community pool where quote can be deposited to be borrowed against floor price price and ltv
//will there be an arb to another pool if the rate is low on main pool? have interest rate where u have to repay abit more than u borrowed.