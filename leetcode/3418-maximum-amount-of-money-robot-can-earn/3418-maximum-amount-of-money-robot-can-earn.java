class Solution {
    public int maximumAmount(int[][] coins) {
        int m = coins.length;
        int n = coins[0].length;
        int NEG = Integer.MIN_VALUE / 2; // Avoid overflow
        
        int[][][] dp = new int[m][n][3];
        
        // Initialize all to NEG
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                for (int k = 0; k < 3; k++) {
                    dp[i][j][k] = NEG;
                }
            }
        }
        
        int start = coins[0][0];
        if (start >= 0) {
            dp[0][0][0] = start;
        } else {
            dp[0][0][0] = start;
            dp[0][0][1] = 0;
        }
        
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (i == 0 && j == 0) continue;
                
                int val = coins[i][j];
                
                for (int k = 0; k <= 2; k++) {
                    int bestPrev = NEG;
                    
                    if (i > 0) bestPrev = Math.max(bestPrev, dp[i - 1][j][k]);
                    if (j > 0) bestPrev = Math.max(bestPrev, dp[i][j - 1][k]);
                    
                    if (bestPrev != NEG) {
                        dp[i][j][k] = Math.max(dp[i][j][k], bestPrev + val);
                    }
                    
                    if (val < 0 && k > 0) {
                        int bestNeutralPrev = NEG;
                        
                        if (i > 0) bestNeutralPrev = Math.max(bestNeutralPrev, dp[i - 1][j][k - 1]);
                        if (j > 0) bestNeutralPrev = Math.max(bestNeutralPrev, dp[i][j - 1][k - 1]);
                        
                        if (bestNeutralPrev != NEG) {
                            dp[i][j][k] = Math.max(dp[i][j][k], bestNeutralPrev);
                        }
                    }
                }
            }
        }
        
        return Math.max(dp[m - 1][n - 1][0], 
                       Math.max(dp[m - 1][n - 1][1], dp[m - 1][n - 1][2]));
    }
}