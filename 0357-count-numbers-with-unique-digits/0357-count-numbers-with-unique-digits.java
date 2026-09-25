class Solution {
    // Memoization table: dp[position][usedDigitsMask]
    // Stores the count of valid numbers for a given position and set of used digits
    private Integer[][] dp;

    /**
     * Counts numbers with unique digits from 0 to 10^n - 1
     * @param n The number of digits (1 <= n <= 8)
     * @return Count of numbers with all unique digits
     */
    public int countNumbersWithUniqueDigits(int n) {
        // Initialize memoization table
        // First dimension: position index (0 to n-1)
        // Second dimension: bitmask representing used digits (2^10 possible states)
        dp = new Integer[n][1 << 10];
      
        // Start DFS from the most significant digit position
        // Initial mask is 0 (no digits used), leading zero flag is true
        return dfs(n - 1, 0, true);
    }

    /**
     * Recursive function to count valid numbers using digit DP
     * @param position Current digit position (from left to right, 0-indexed)
     * @param usedDigitsMask Bitmask representing which digits have been used
     * @param hasLeadingZero True if we're still in leading zeros
     * @return Count of valid numbers from this state
     */
    private int dfs(int position, int usedDigitsMask, boolean hasLeadingZero) {
        // Base case: all positions filled
        if (position < 0) {
            return 1;
        }
      
        // Use memoization only when not dealing with leading zeros
        // (leading zeros affect the count differently)
        if (!hasLeadingZero && dp[position][usedDigitsMask] != null) {
            return dp[position][usedDigitsMask];
        }
      
        int count = 0;
      
        // Try each digit from 0 to 9
        for (int digit = 0; digit <= 9; digit++) {
            // Check if this digit has already been used (bit is set in mask)
            if ((usedDigitsMask >> digit & 1) == 1) {
                continue;
            }
          
            // Handle leading zero case
            if (hasLeadingZero && digit == 0) {
                // Continue with leading zeros, don't mark 0 as used
                count += dfs(position - 1, usedDigitsMask, true);
            } else {
                // Place the digit and mark it as used in the bitmask
                count += dfs(position - 1, usedDigitsMask | (1 << digit), false);
            }
        }
      
        // Store result in memoization table (only for non-leading-zero states)
        if (!hasLeadingZero) {
            dp[position][usedDigitsMask] = count;
        }
      
        return count;
    }
}
