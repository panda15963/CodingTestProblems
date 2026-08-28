/**
 * Finds the bitwise AND of all numbers in the range [left, right] inclusive.
 * 
 * The algorithm works by finding the common prefix of left and right in their binary representation.
 * It repeatedly clears the rightmost set bit of 'right' until right becomes less than or equal to left.
 * This effectively finds the longest common prefix of all numbers in the range.
 * 
 * @param left - The starting number of the range (inclusive)
 * @param right - The ending number of the range (inclusive)
 * @returns The bitwise AND of all numbers in the range
 */
function rangeBitwiseAnd(left: number, right: number): number {
    // Keep clearing the rightmost set bit of 'right' until it becomes less than or equal to 'left'
    // This finds the common binary prefix of all numbers in the range
    while (left < right) {
        // Clear the rightmost set bit using Brian Kernighan's algorithm
        // right & (right - 1) removes the lowest set bit
        right &= right - 1;
    }
  
    // The remaining value is the bitwise AND of all numbers in the range
    return right;
}
