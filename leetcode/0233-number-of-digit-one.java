class Solution {
    private int digitCount;                    // Total number of digits in n
    private char[] digitsArray;                // Array of digits representing n
    private Integer[][] memoization;           // DP memoization table [position][count of ones]

    /**
     * Counts the total number of digit '1' appearing in all numbers from 0 to n
     * @param n The upper bound number
     * @return Total count of digit '1' in range [0, n]
     */
    public int countDigitOne(int n) {
        // Convert number to char array for digit-by-digit processing
        digitsArray = String.valueOf(n).toCharArray();
        digitCount = digitsArray.length;
      
        // Initialize memoization table
        // First dimension: current position in the number
        // Second dimension: count of ones accumulated so far
        memoization = new Integer[digitCount][digitCount];
      
        // Start DFS from position 0, with 0 ones counted, and limit flag true
        return dfs(0, 0, true);
    }

    /**
     * Recursive function to count digit '1' using digit DP approach
     * @param position Current position/index in the number being constructed
     * @param onesCount Count of '1's accumulated in the current number being formed
     * @param isLimit Whether we're still bounded by the original number n
     * @return Total count of '1's in all valid numbers from current state
     */
    private int dfs(int position, int onesCount, boolean isLimit) {
        // Base case: reached the end of digits
        if (position >= digitCount) {
            return onesCount;
        }
      
        // Check memoization: only use cached result when not limited by upper bound
        if (!isLimit && memoization[position][onesCount] != null) {
            return memoization[position][onesCount];
        }
      
        // Determine the upper bound for current digit
        // If limited, can only go up to current digit of n; otherwise can use 0-9
        int upperBound = isLimit ? digitsArray[position] - '0' : 9;
      
        int totalCount = 0;
      
        // Try all possible digits from 0 to upperBound at current position
        for (int digit = 0; digit <= upperBound; digit++) {
            // Recursively count for next position
            // Update onesCount if current digit is 1
            // Update isLimit: remains true only if we're at limit AND chose the upperBound digit
            totalCount += dfs(
                position + 1, 
                onesCount + (digit == 1 ? 1 : 0), 
                isLimit && (digit == upperBound)
            );
        }
      
        // Store result in memoization table only when not limited
        // (limited states are specific to the input and shouldn't be cached)
        if (!isLimit) {
            memoization[position][onesCount] = totalCount;
        }
      
        return totalCount;
    }
}
