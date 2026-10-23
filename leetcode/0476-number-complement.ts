/**
 * Finds the complement of a given positive integer.
 * The complement is obtained by flipping all bits in the binary representation.
 * 
 * @param num - The positive integer to find the complement of
 * @returns The complement of the input number
 * 
 * Example: 
 * Input: 5 (binary: 101)
 * Output: 2 (binary: 010)
 */
function findComplement(num: number): number {
    // Convert number to binary string to get its bit length
    const bitLength: number = num.toString(2).length;
  
    // Create a mask with all bits set to 1 for the given bit length
    // For example: if bitLength is 3, mask will be 111 in binary (7 in decimal)
    const mask: number = (1 << bitLength) - 1;
  
    // XOR the number with the mask to flip all bits
    // This gives us the complement
    return num ^ mask;
}
