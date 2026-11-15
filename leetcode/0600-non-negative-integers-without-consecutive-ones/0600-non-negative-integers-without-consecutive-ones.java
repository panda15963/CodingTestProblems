class Solution {
    private int n;
    private Integer[][] memo; // Memoization table: memo[bitPosition][previousBit]
  
    /**
     * Finds the count of integers in the range [0, n] that don't have consecutive 1s in binary
     * @param n The upper bound of the range
     * @return Count of valid integers without consecutive 1s
     */
    public int findIntegers(int n) {
        this.n = n;
      
        // Calculate the number of bits in n (highest bit position)
        int bitCount = Integer.SIZE - Integer.numberOfLeadingZeros(n);
      
        // Initialize memoization table
        memo = new Integer[bitCount][2];
      
        // Start DFS from the most significant bit
        return dfs(bitCount - 1, 0, true);
    }
  
    /**
     * Recursive function to count valid numbers using digit DP
     * @param bitPosition Current bit position being processed (from MSB to LSB)
     * @param previousBit The bit value placed at the previous (higher) position
     * @param isLimit Whether we're still bounded by the original number n
     * @return Count of valid integers from current state
     */
    private int dfs(int bitPosition, int previousBit, boolean isLimit) {
        // Base case: processed all bits successfully
        if (bitPosition < 0) {
            return 1;
        }
      
        // Check memoization for non-limit states
        if (!isLimit && memo[bitPosition][previousBit] != null) {
            return memo[bitPosition][previousBit];
        }
      
        // Determine the upper bound for current bit
        // If we're at limit, we can only go up to the corresponding bit in n
        // Otherwise, we can use 0 or 1
        int upperBound = isLimit ? (n >> bitPosition & 1) : 1;
      
        int count = 0;
      
        // Try placing each valid bit (0 or 1) at current position
        for (int currentBit = 0; currentBit <= upperBound; currentBit++) {
            // Skip if placing 1 would create consecutive 1s
            if (currentBit == 1 && previousBit == 1) {
                continue;
            }
          
            // Recursively count valid numbers with current bit placed
            // Update limit flag: we remain limited only if we're currently limited AND placing the max bit
            count += dfs(bitPosition - 1, currentBit, isLimit && currentBit == upperBound);
        }
      
        // Memoize result for non-limit states
        if (!isLimit) {
            memo[bitPosition][previousBit] = count;
        }
      
        return count;
    }
}
