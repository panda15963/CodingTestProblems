function solution(n) {
    if (n <= 6) {
        const base = [0, 1, 3, 10, 23, 62, 170];
        return base[n];
    }
    
    const dp = new Array(100001).fill(0);
    dp[1] = 1;
    dp[2] = 3;
    dp[3] = 10;
    dp[4] = 23;
    dp[5] = 62;
    dp[6] = 170;
    
    const MOD = 1000000007;
    for (let i = 7; i <= n; i++) {
        dp[i] = (dp[i-1] + dp[i-2] * 2 + dp[i-3] * 6 + dp[i-4] - dp[i-6] + 2 * MOD) % MOD;
    }
    return dp[n];
}