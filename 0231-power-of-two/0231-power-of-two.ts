/**
 * Determines if a given number is a power of two.
 * 
 * A power of two has only one bit set in its binary representation.
 * Using bit manipulation: n & (n - 1) removes the rightmost set bit.
 * If n is a power of two, this operation results in 0.
 * 
 * @param n - The number to check
 * @returns true if n is a power of two, false otherwise
 */
function isPowerOfTwo(n: number): boolean {
    // Check if n is positive (powers of two are positive)
    // AND check if n has only one bit set using bitwise operation
    return n > 0 && (n & (n - 1)) === 0;
}
