class Solution {
    public int maxProductPath(int[][] grid) {
        int m = grid.length, n = grid[0].length;
        long[][] maxDp = new long[m][n];
        long[][] minDp = new long[m][n];

        maxDp[0][0] = grid[0][0];
        minDp[0][0] = grid[0][0];

        // 첫 행
        for (int j = 1; j < n; j++) {
            maxDp[0][j] = maxDp[0][j - 1] * grid[0][j];
            minDp[0][j] = maxDp[0][j];
        }

        // 첫 열
        for (int i = 1; i < m; i++) {
            maxDp[i][0] = maxDp[i - 1][0] * grid[i][0];
            minDp[i][0] = maxDp[i][0];
        }

        // DP
        for (int i = 1; i < m; i++) {
            for (int j = 1; j < n; j++) {
                long val = grid[i][j];

                long maxVal = Math.max(maxDp[i - 1][j], maxDp[i][j - 1]);
                long minVal = Math.min(minDp[i - 1][j], minDp[i][j - 1]);

                if (val >= 0) {
                    maxDp[i][j] = maxVal * val;
                    minDp[i][j] = minVal * val;
                } else {
                    maxDp[i][j] = minVal * val;
                    minDp[i][j] = maxVal * val;
                }
            }
        }

        long res = maxDp[m - 1][n - 1];
        if (res < 0) return -1;

        return (int)(res % 1_000_000_007);
    }
}