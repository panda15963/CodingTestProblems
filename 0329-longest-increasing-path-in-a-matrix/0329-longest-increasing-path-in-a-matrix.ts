function longestIncreasingPath(matrix: number[][]): number {
    const m: number = matrix.length;
    const n: number = matrix[0].length;

    const dp: number[][] = Array.from(
        { length: m },
        () => new Array(n).fill(-1)
    );

    const dir: number[][] = [
        [-1, 0],
        [1, 0],
        [0, 1],
        [0, -1]
    ];

    function dfs(x: number, y: number): number {
        if (dp[x][y] !== -1) {
            return dp[x][y];
        }

        let maxLen: number = 1;

        for (const [dx, dy] of dir) {
            const nx: number = x + dx;
            const ny: number = y + dy;

            if (
                nx >= 0 && nx < m &&
                ny >= 0 && ny < n &&
                matrix[nx][ny] > matrix[x][y]
            ) {
                const len: number = 1 + dfs(nx, ny);
                maxLen = Math.max(maxLen, len);
            }
        }

        dp[x][y] = maxLen;
        return maxLen;
    }

    let ans: number = 0;

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            ans = Math.max(ans, dfs(i, j));
        }
    }

    return ans;
}