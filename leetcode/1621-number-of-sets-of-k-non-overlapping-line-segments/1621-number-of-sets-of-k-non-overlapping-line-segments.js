var numberOfSets = function(n, k) {
    const dpNotEnding = Array.from(
        { length: n + 1 },
        () => new Array(k + 1).fill(0)
    );

    const dpEnding = Array.from(
        { length: n + 1 },
        () => new Array(k + 1).fill(0)
    );

    const MOD = 10 ** 9 + 7;

    dpNotEnding[1][0] = 1;

    for (let i = 2; i <= n; ++i) {
        for (let j = 0; j <= k; ++j) {
            dpNotEnding[i][j] =
                (dpNotEnding[i - 1][j] + dpEnding[i - 1][j]) % MOD;

            dpEnding[i][j] = dpEnding[i - 1][j];

            if (j > 0) {
                dpEnding[i][j] =
                    (dpEnding[i][j] + dpNotEnding[i - 1][j - 1]) % MOD;

                dpEnding[i][j] =
                    (dpEnding[i][j] + dpEnding[i - 1][j - 1]) % MOD;
            }
        }
    }

    return (dpNotEnding[n][k] + dpEnding[n][k]) % MOD;
};