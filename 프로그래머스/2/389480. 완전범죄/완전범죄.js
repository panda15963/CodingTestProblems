function solution(info, n, m) {
    let dp = Array.from({ length: info.length + 1 }, () => {
        return Array(m).fill(Infinity);
    });

    dp[0][0] = 0;

    for (let r = 1; r <= info.length; r++) {
        let [aScore, bScore] = info[r - 1];
        for (let c = 0; c < m; c++) {
            dp[r][c] = Math.min(dp[r - 1][c] + aScore, dp[r][c]);

            if (c + bScore < m) {
                dp[r][c + bScore] = Math.min(dp[r - 1][c], dp[r][c + bScore]);
            }
        }
    }
    let min = Infinity;

    dp[info.length].forEach((v) => {
        if (v < n) {
            min = Math.min(min, v);
        }
    });

    return min === Infinity ? -1 : min;
}