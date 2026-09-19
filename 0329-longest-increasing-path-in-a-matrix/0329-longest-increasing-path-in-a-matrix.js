var longestIncreasingPath = function(matrix) {
    const m = matrix.length;
    const n = matrix[0].length;

    const dp = Array.from(
        { length: m },
        () => new Array(n).fill(-1)
    );

    const dir = [
        [-1, 0],
        [1, 0],
        [0, 1],
        [0, -1]
    ];

    const dfs = (x, y) => {
        if (dp[x][y] !== -1) {
            return dp[x][y];
        }

        let maxLen = 1;

        for (const [dx, dy] of dir) {
            const nx = x + dx;
            const ny = y + dy;

            if (
                nx >= 0 && nx < m &&
                ny >= 0 && ny < n &&
                matrix[nx][ny] > matrix[x][y]
            ) {
                const len = 1 + dfs(nx, ny);
                maxLen = Math.max(maxLen, len);
            }
        }

        dp[x][y] = maxLen;
        return maxLen;
    };

    let ans = 0;

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            ans = Math.max(ans, dfs(i, j));
        }
    }

    return ans;
};