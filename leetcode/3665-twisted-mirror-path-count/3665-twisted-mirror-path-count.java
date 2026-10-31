import java.util.*;

class Solution {
    private static final int MOD = 1_000_000_007;

    private int rows;
    private int cols;
    private int[][] grid;
    private int[][] memo;

    private int[] reflect(int r, int c, boolean direction) {
        // direction: true = right, false = down
        while (r >= 0 && r < rows &&
               c >= 0 && c < cols &&
               grid[r][c] == 1) {

            if (direction) {
                r++;
                direction = false;
            } else {
                c++;
                direction = true;
            }
        }

        return new int[]{r, c};
    }

    private int dp(int r, int c) {
        if (r < 0 || r >= rows || c < 0 || c >= cols) {
            return 0;
        }

        if (grid[r][c] == 1) {
            return 0;
        }

        if (r == rows - 1 && c == cols - 1) {
            return 1;
        }

        if (memo[r][c] != -1) {
            return memo[r][c];
        }

        long total = 0;

        // Move right
        int nR = r;
        int nC = c + 1;

        if (nC < cols) {
            if (grid[nR][nC] == 0) {
                total += dp(nR, nC);
            } else {
                int[] pos = reflect(nR + 1, nC, false);
                int reflectR = pos[0];
                int reflectC = pos[1];

                if (reflectR >= 0 && reflectR < rows &&
                    reflectC >= 0 && reflectC < cols &&
                    grid[reflectR][reflectC] == 0) {

                    total += dp(reflectR, reflectC);
                }
            }
        }

        // Move down
        nR = r + 1;
        nC = c;

        if (nR < rows) {
            if (grid[nR][nC] == 0) {
                total += dp(nR, nC);
            } else {
                int[] pos = reflect(nR, nC + 1, true);
                int reflectR = pos[0];
                int reflectC = pos[1];

                if (reflectR >= 0 && reflectR < rows &&
                    reflectC >= 0 && reflectC < cols &&
                    grid[reflectR][reflectC] == 0) {

                    total += dp(reflectR, reflectC);
                }
            }
        }

        return memo[r][c] = (int) (total % MOD);
    }

    public int uniquePaths(int[][] grid) {
        this.grid = grid;
        this.rows = grid.length;
        this.cols = grid[0].length;

        memo = new int[rows][cols];

        for (int[] row : memo) {
            Arrays.fill(row, -1);
        }

        return dp(0, 0);
    }
}