var getMoneyAmount = function(n) {
    const dp = Array.from(
        { length: n + 1 },
        () => new Array(n + 1).fill(0)
    );

    for (let rangeStart = n - 1; rangeStart >= 1; rangeStart--) {
        for (let rangeEnd = rangeStart + 1; rangeEnd <= n; rangeEnd++) {
            dp[rangeStart][rangeEnd] =
                rangeEnd + dp[rangeStart][rangeEnd - 1];

            for (let guess = rangeStart; guess < rangeEnd; guess++) {
                const currentCost =
                    guess +
                    Math.max(
                        dp[rangeStart][guess - 1],
                        dp[guess + 1][rangeEnd]
                    );

                dp[rangeStart][rangeEnd] = Math.min(
                    dp[rangeStart][rangeEnd],
                    currentCost
                );
            }
        }
    }

    return dp[1][n];
};