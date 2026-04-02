/**
 * @param {number[][]} coins
 * @return {number}
 */
var maximumAmount = function(coins) {
    const m = coins.length;
    const n = coins[0].length;
    const NEG = -Infinity;

    const dp = Array.from({ length: m }, () =>
        Array.from({ length: n }, () => [NEG, NEG, NEG])
    );

    const start = coins[0][0];
    if (start >= 0) {
        dp[0][0][0] = start;
    } else {
        dp[0][0][0] = start;
        dp[0][0][1] = 0;
    }

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (i === 0 && j === 0) continue;

            const val = coins[i][j];

            for (let k = 0; k <= 2; k++) {
                let bestPrev = NEG;

                if (i > 0) bestPrev = Math.max(bestPrev, dp[i - 1][j][k]);
                if (j > 0) bestPrev = Math.max(bestPrev, dp[i][j - 1][k]);

                if (bestPrev !== NEG) {
                    dp[i][j][k] = Math.max(dp[i][j][k], bestPrev + val);
                }

                if (val < 0 && k > 0) {
                    let bestNeutralPrev = NEG;

                    if (i > 0) bestNeutralPrev = Math.max(bestNeutralPrev, dp[i - 1][j][k - 1]);
                    if (j > 0) bestNeutralPrev = Math.max(bestNeutralPrev, dp[i][j - 1][k - 1]);

                    if (bestNeutralPrev !== NEG) {
                        dp[i][j][k] = Math.max(dp[i][j][k], bestNeutralPrev);
                    }
                }
            }
        }
    }

    return Math.max(dp[m - 1][n - 1][0], dp[m - 1][n - 1][1], dp[m - 1][n - 1][2]);
};