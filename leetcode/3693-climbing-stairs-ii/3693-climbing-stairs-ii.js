/**
 * @param {number} n
 * @param {number[]} costs
 * @return {number}
 */
var climbStairs = function(n, costs) {
    const dp = Array(n + 1).fill(Infinity);

    dp[0] = 0;

    for (let i = 0; i < n; i++) {
        for (let step = 1; step <= 3; step++) {
            const j = i + step;

            if (j <= n) {
                const cost = dp[i] + costs[j - 1] + step ** 2;

                dp[j] = Math.min(dp[j], cost);
            }
        }
    }

    return dp[n];
};