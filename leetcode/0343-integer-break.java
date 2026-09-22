class Solution {
    public int integerBreak(int n) {
        // dp[i] represents the maximum product we can get by breaking integer i
        int[] dp = new int[n + 1];
      
        // Base case: when n=1, the maximum product is 1
        dp[1] = 1;
      
        // Fill the dp array for each number from 2 to n
        for (int i = 2; i <= n; ++i) {
            // Try all possible ways to split number i into two parts: j and (i-j)
            for (int j = 1; j < i; ++j) {
                // For each split, we have two choices:
                // 1. Don't break (i-j) further: product = j * (i-j)
                // 2. Break (i-j) further: product = j * dp[i-j]
                // Take the maximum of current value and both choices
                dp[i] = Math.max(dp[i], Math.max(j * (i - j), j * dp[i - j]));
            }
        }
      
        // Return the maximum product for integer n
        return dp[n];
    }
}
