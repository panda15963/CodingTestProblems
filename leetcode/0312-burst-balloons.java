class Solution {
    public int maxCoins(int[] nums) {
        int n = nums.length;
      
        // Create padded array with 1s at both ends
        // This handles boundary cases when bursting balloons
        int[] balloons = new int[n + 2];
        balloons[0] = 1;
        balloons[n + 1] = 1;
        System.arraycopy(nums, 0, balloons, 1, n);
      
        // dp[i][j] represents maximum coins obtainable by bursting 
        // all balloons between index i and j (exclusive)
        int[][] dp = new int[n + 2][n + 2];
      
        // Iterate through all possible intervals from bottom to top
        // i represents left boundary (exclusive)
        for (int i = n - 1; i >= 0; i--) {
            // j represents right boundary (exclusive)
            for (int j = i + 2; j <= n + 1; j++) {
                // k represents the last balloon to burst in interval (i, j)
                for (int k = i + 1; k < j; k++) {
                    // Calculate coins obtained by bursting balloon k last
                    // = coins from left subproblem + coins from right subproblem
                    //   + coins from bursting k with i and j as neighbors
                    int currentCoins = dp[i][k] + dp[k][j] + 
                                      balloons[i] * balloons[k] * balloons[j];
                    dp[i][j] = Math.max(dp[i][j], currentCoins);
                }
            }
        }
      
        // Return maximum coins for bursting all balloons (between index 0 and n+1)
        return dp[0][n + 1];
    }
}
