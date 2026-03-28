function solution(triangle) {
    const n = triangle.length;

    // 깊은 복사 (원본 유지)
    const dp = triangle.map(row => [...row]);

    for (let i = 1; i < n; i++) {
        for (let j = 0; j <= i; j++) {
            if (j === 0) {
                dp[i][j] += dp[i - 1][j];
            } else if (j === i) {
                dp[i][j] += dp[i - 1][j - 1];
            } else {
                dp[i][j] += Math.max(dp[i - 1][j - 1], dp[i - 1][j]);
            }
        }
    }

    return Math.max(...dp[n - 1]);
}