/**
 * Generates the n-bit Gray code sequence.
 * Gray code is a binary numeral system where two successive values differ in only one bit.
 * 
 * @param n - The number of bits for the Gray code
 * @returns An array containing the Gray code sequence
 */
function grayCode(n: number): number[] {
    const result: number[] = [];
  
    // Generate all numbers from 0 to 2^n - 1
    // The total count of Gray codes for n bits is 2^n
    const totalCodes = 1 << n; // Equivalent to 2^n
  
    for (let i = 0; i < totalCodes; i++) {
        // Convert binary number to Gray code using the formula:
        // Gray code = i XOR (i right-shifted by 1)
        // This ensures adjacent codes differ by exactly one bit
        const grayValue = i ^ (i >> 1);
        result.push(grayValue);
    }
  
    return result;
}