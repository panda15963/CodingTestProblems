var maxCoins = function(nums) {
    const n = nums.length;

    // Add 1 to both ends
    const balloons = new Array(n + 2);
    balloons[0] = 1;
    balloons[n + 1] = 1;

    for (let i = 0; i < n; i++) {
        balloons[i + 1] = nums[i];
    }

    // dp[i][j] = maximum coins from bursting balloons between i and j
    const dp = Array.from(
        { length: n + 2 },
        () => Array(n + 2).fill(0)
    );

    for (let i = n - 1; i >= 0; i--) {
        for (let j = i + 2; j <= n + 1; j++) {
            for (let k = i + 1; k < j; k++) {
                const currentCoins =
                    dp[i][k] +
                    dp[k][j] +
                    balloons[i] * balloons[k] * balloons[j];

                dp[i][j] = Math.max(dp[i][j], currentCoins);
            }
        }
    }

    return dp[0][n + 1];
};