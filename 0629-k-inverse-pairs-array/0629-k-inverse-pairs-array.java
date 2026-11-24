class Solution {
    public int kInversePairs(int n, int k) {
        // Modulo value for large number handling
        final int MOD = 1_000_000_007;
      
        // dp[j] represents the number of permutations with exactly j inverse pairs
        // using numbers from 1 to current i
        int[] dp = new int[k + 1];
      
        // prefixSum[j] stores the prefix sum of dp array up to index j-1
        // This helps optimize the range sum calculation
        int[] prefixSum = new int[k + 2];
      
        // Base case: empty permutation has 0 inverse pairs
        dp[0] = 1;
      
        // Initialize prefix sum array (all 1s except index 0)
        Arrays.fill(prefixSum, 1);
        prefixSum[0] = 0;
      
        // Build up the solution for each number from 1 to n
        for (int i = 1; i <= n; ++i) {
            // Calculate dp values for current i
            for (int j = 1; j <= k; ++j) {
                // When inserting number i into a permutation of (i-1) numbers,
                // we can create 0 to min(j, i-1) new inverse pairs
                // dp[i][j] = sum of dp[i-1][j-min(j, i-1)] to dp[i-1][j]
                int minInversePairs = Math.max(0, j - (i - 1));
                dp[j] = (prefixSum[j + 1] - prefixSum[minInversePairs] + MOD) % MOD;
            }
          
            // Update prefix sum array for next iteration
            for (int j = 1; j <= k + 1; ++j) {
                prefixSum[j] = (prefixSum[j - 1] + dp[j - 1]) % MOD;
            }
        }
      
        // Return the number of permutations with exactly k inverse pairs
        return dp[k];
    }
}
