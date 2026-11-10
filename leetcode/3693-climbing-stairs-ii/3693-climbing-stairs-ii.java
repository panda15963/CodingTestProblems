import java.util.Arrays;

class Solution {
    public int climbStairs(int n, int[] costs) {
        int[] dp = new int[n + 1];
        Arrays.fill(dp, Integer.MAX_VALUE);

        dp[0] = 0;

        for (int i = 0; i < n; i++) {
            for (int step = 1; step <= 3; step++) {
                int j = i + step;

                if (j <= n) {
                    int cost = dp[i] + costs[j - 1] + (step * step);

                    dp[j] = Math.min(dp[j], cost);
                }
            }
        }

        return dp[n];
    }
}