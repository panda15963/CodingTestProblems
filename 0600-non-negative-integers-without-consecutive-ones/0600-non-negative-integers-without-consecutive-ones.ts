/**
 * Counts the number of integers from 0 to n that don't have consecutive 1s in binary representation
 * @param n - The upper bound integer
 * @returns The count of valid integers without consecutive 1s in binary
 */
function findIntegers(n: number): number {
    // Get the number of bits needed to represent n
    const bitLength: number = n.toString(2).length;
  
    // Memoization table: dp[position][previousBit]
    // Stores the count of valid numbers for a given position and previous bit
    const memoTable: number[][] = Array.from(
        { length: bitLength }, 
        () => Array(2).fill(-1)
    );
  
    /**
     * Depth-first search to count valid integers using digit DP technique
     * @param position - Current bit position (from most significant to least)
     * @param previousBit - The bit value at the previous (higher) position
     * @param isLimit - Whether we're still bounded by the original number n
     * @returns Count of valid integers from this state
     */
    const countValidIntegers = (
        position: number, 
        previousBit: number, 
        isLimit: boolean
    ): number => {
        // Base case: processed all bits successfully
        if (position < 0) {
            return 1;
        }
      
        // Return memoized result if available and not limited by n
        if (!isLimit && memoTable[position][previousBit] !== -1) {
            return memoTable[position][previousBit];
        }
      
        // Determine the maximum bit value we can place at current position
        const maxBitValue: number = isLimit ? (n >> position) & 1 : 1;
      
        let totalCount: number = 0;
      
        // Try placing 0 or 1 at current position
        for (let currentBit = 0; currentBit <= maxBitValue; currentBit++) {
            // Skip if we would have consecutive 1s
            if (previousBit === 1 && currentBit === 1) {
                continue;
            }
          
            // Recursively count valid numbers with current bit placed
            totalCount += countValidIntegers(
                position - 1, 
                currentBit, 
                isLimit && currentBit === maxBitValue
            );
        }
      
        // Memoize result when not limited by n
        if (!isLimit) {
            memoTable[position][previousBit] = totalCount;
        }
      
        return totalCount;
    };
  
    // Start DFS from most significant bit with no previous bit and limited by n
    return countValidIntegers(bitLength - 1, 0, true);
}
