/**
 * Reverses the bits of a 32-bit unsigned integer
 * @param n - A positive integer to reverse bits for
 * @returns The integer with bits reversed
 */
function reverseBits(n: number): number {
    let result: number = 0;
  
    // Process each of the 32 bits
    for (let i = 0; i < 32 && n > 0; i++) {
        // Extract the rightmost bit of n using bitwise AND with 1
        // Then shift it to its reversed position (31 - i) and OR it with result
        result |= (n & 1) << (31 - i);
      
        // Right shift n by 1 to process the next bit
        n >>= 1;
    }
  
    // Use unsigned right shift to ensure the result is treated as unsigned 32-bit integer
    return result >>> 0;
}
