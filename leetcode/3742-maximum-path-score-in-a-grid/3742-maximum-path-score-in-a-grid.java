import java.util.*;

class Solution {
    private int[][] grid;
    private Integer[][][] memo;
    private final int INF = 1 << 30;

    public int maxPathScore(int[][] grid, int k) {
        this.grid = grid;
        int m = grid.length;
        int n = grid[0].length;
        // Use Integer object to distinguish between uncomputed and -1 (invalid)
        memo = new Integer[m][n][k + 1];
        
        int result = dfs(m - 1, n - 1, k);
        return result < 0 ? -1 : result;
    }

    private int dfs(int r, int c, int remK) {
        // Base: Out of bounds or budget exceeded
        if (r < 0 || c < 0 || remK < 0) return -INF;
        
        // Base: Starting point
        if (r == 0 && c == 0) return 0;
        
        if (memo[r][c][remK] != null) return memo[r][c][remK];

        int score = grid[r][c];
        int cost = (grid[r][c] > 0) ? 1 : 0;
        
        // Find max score from previous possible steps (Up or Left)
        int fromUp = dfs(r - 1, c, remK - cost);
        int fromLeft = dfs(r, c - 1, remK - cost);
        
        int maxPrev = Math.max(fromUp, fromLeft);
        
        // If both paths are invalid, mark this state as invalid
        if (maxPrev <= -INF) {
            return memo[r][c][remK] = -INF;
        }

        return memo[r][c][remK] = score + maxPrev;
    }
}