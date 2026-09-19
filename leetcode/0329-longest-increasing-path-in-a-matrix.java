class Solution {
    public int longestIncreasingPath(int[][] matrix) {
        int m = matrix.length;
        int n = matrix[0].length;

        int[][] dp = new int[m][n];

        int[][] dir = {
            {-1, 0},
            {1, 0},
            {0, 1},
            {0, -1}
        };

        int ans = 0;

        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                ans = Math.max(ans, dfs(i, j, matrix, dp, dir));
            }
        }

        return ans;
    }

    private int dfs(
        int x,
        int y,
        int[][] matrix,
        int[][] dp,
        int[][] dir
    ) {
        if (dp[x][y] != 0) {
            return dp[x][y];
        }

        int m = matrix.length;
        int n = matrix[0].length;

        int maxLen = 1;

        for (int[] d : dir) {
            int nx = x + d[0];
            int ny = y + d[1];

            if (
                nx >= 0 && nx < m &&
                ny >= 0 && ny < n &&
                matrix[nx][ny] > matrix[x][y]
            ) {
                int len = 1 + dfs(nx, ny, matrix, dp, dir);
                maxLen = Math.max(maxLen, len);
            }
        }

        dp[x][y] = maxLen;
        return maxLen;
    }
}