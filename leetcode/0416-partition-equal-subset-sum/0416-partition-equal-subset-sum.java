class Solution {
    public boolean canPartition(int[] nums) {
        // Calculate the total sum of all elements
        int totalSum = 0;
        for (int num : nums) {
            totalSum += num;
        }
      
        // If total sum is odd, we cannot partition into two equal subsets
        if (totalSum % 2 == 1) {
            return false;
        }
      
        int n = nums.length;
        int targetSum = totalSum / 2;  // Each subset should sum to half of total
      
        // dp[i][j] represents whether we can achieve sum j using first i elements
        boolean[][] dp = new boolean[n + 1][targetSum + 1];
      
        // Base case: we can always achieve sum 0 with 0 elements
        dp[0][0] = true;
      
        // Fill the DP table
        for (int i = 1; i <= n; i++) {
            int currentNum = nums[i - 1];
          
            for (int j = 0; j <= targetSum; j++) {
                // Option 1: Don't include current number
                dp[i][j] = dp[i - 1][j];
              
                // Option 2: Include current number (if it doesn't exceed target)
                if (j >= currentNum) {
                    dp[i][j] = dp[i][j] || dp[i - 1][j - currentNum];
                }
            }
        }
      
        // Return whether we can achieve targetSum using all n elements
        return dp[n][targetSum];
    }
}
