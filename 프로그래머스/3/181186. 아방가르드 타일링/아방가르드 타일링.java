class Solution {
    public int solution(int n) {
        if (n <= 6) {
            int[] base = {0, 1, 3, 10, 23, 62, 170};
            return base[n];
        }
        
        long[] dp = new long[100001];
        dp[1] = 1;
        dp[2] = 3;
        dp[3] = 10;
        dp[4] = 23;
        dp[5] = 62;
        dp[6] = 170;
        
        final int MOD = 1000000007;
        for (int i = 7; i <= n; i++) {
            dp[i] = (dp[i-1] + dp[i-2] * 2 + dp[i-3] * 6 + dp[i-4] - dp[i-6] + 2 * MOD) % MOD;
        }
        return (int) dp[n];
    }
}