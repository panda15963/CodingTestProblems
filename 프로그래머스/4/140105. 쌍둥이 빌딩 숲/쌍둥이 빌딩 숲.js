function solution(n, count) {
    const MOD = 1000000007n;

    // DP 배열 생성
    const dp = Array.from({ length: n + 1 }, () =>
        Array(n + 1).fill(0n)
    );

    dp[1][1] = 1n;

    for (let x = 2; x <= n; x++) {
        for (let y = 1; y <= x; y++) {
            let temp = 0n;

            if (y === 1) {
                // (x, 1) = (x-1, 1) * (2 * (x-1))
                temp = dp[x - 1][y] * BigInt(2 * (x - 1));
            } else if (y > 1 && y < x) {
                // (x, y) = (x-1, y) * (2 * (x-1)) + (x-1, y-1)
                temp =
                    dp[x - 1][y] * BigInt(2 * (x - 1)) +
                    dp[x - 1][y - 1];
            } else {
                // (x, x) = (x-1, x-1)
                temp = dp[x - 1][y - 1];
            }

            dp[x][y] = temp % MOD;
        }
    }

    return Number(dp[n][count]);
}

// 테스트
console.log(solution(3, 1)); // 8