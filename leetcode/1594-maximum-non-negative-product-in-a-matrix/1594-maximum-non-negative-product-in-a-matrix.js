var maxProductPath = function(grid) {
    const m = grid.length, n = grid[0].length;
    
    const maxDp = Array.from({ length: m }, () => Array(n).fill(0));
    const minDp = Array.from({ length: m }, () => Array(n).fill(0));

    maxDp[0][0] = grid[0][0];
    minDp[0][0] = grid[0][0];

    // 첫 행
    for (let j = 1; j < n; j++) {
        maxDp[0][j] = maxDp[0][j - 1] * grid[0][j];
        minDp[0][j] = maxDp[0][j];
    }

    // 첫 열
    for (let i = 1; i < m; i++) {
        maxDp[i][0] = maxDp[i - 1][0] * grid[i][0];
        minDp[i][0] = maxDp[i][0];
    }

    // DP
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            const val = grid[i][j];

            const candidates = [
                maxDp[i - 1][j] * val,
                minDp[i - 1][j] * val,
                maxDp[i][j - 1] * val,
                minDp[i][j - 1] * val
            ];

            maxDp[i][j] = Math.max(...candidates);
            minDp[i][j] = Math.min(...candidates);
        }
    }

    const res = maxDp[m - 1][n - 1];
    if (res < 0) return -1;

    return res % 1000000007;
};