
var kInversePairs = function(n, k) {
    const MOD = 1000000007;

    // dp[j] represents the number of permutations
    // with exactly j inverse pairs
    const dp = new Array(k + 1).fill(0);
    dp[0] = 1;

    // Prefix sum array
    const prefixSum = new Array(k + 2).fill(1);
    prefixSum[0] = 0;

    // Iterate through numbers from 1 to n
    for (let i = 1; i <= n; ++i) {

        // Calculate DP values
        for (let j = 1; j <= k; ++j) {
            const minInversePairs = Math.max(0, j - (i - 1));

            dp[j] = (
                prefixSum[j + 1] -
                prefixSum[minInversePairs] +
                MOD
            ) % MOD;
        }

        // Update prefix sums
        for (let j = 1; j <= k + 1; ++j) {
            prefixSum[j] = (
                prefixSum[j - 1] + dp[j - 1]
            ) % MOD;
        }
    }

    return dp[k];
};
