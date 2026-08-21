class Solution {
    public int calculateMinimumHP(int[][] dungeon) {
        // Get dimensions of the dungeon
        int rows = dungeon.length;
        int cols = dungeon[0].length;
      
        // Create DP table with extra row and column for boundary conditions
        // dp[i][j] represents minimum health needed to reach bottom-right from position (i,j)
        int[][] dp = new int[rows + 1][cols + 1];
      
        // Initialize all cells with a large value (acts as infinity)
        for (int[] row : dp) {
            Arrays.fill(row, Integer.MAX_VALUE);
        }
      
        // Base case: Set boundary cells adjacent to destination
        // Knight needs at least 1 HP to survive after reaching the princess
        dp[rows][cols - 1] = 1;  // Cell below the destination
        dp[rows - 1][cols] = 1;  // Cell to the right of the destination
      
        // Fill the DP table from bottom-right to top-left
        for (int i = rows - 1; i >= 0; i--) {
            for (int j = cols - 1; j >= 0; j--) {
                // Calculate minimum health needed at current cell
                // We need enough health to survive current cell and reach the next cell
                int minHealthFromNext = Math.min(dp[i + 1][j], dp[i][j + 1]);
              
                // If current cell has positive value (potion), it reduces required health
                // If current cell has negative value (damage), it increases required health
                // Minimum health must be at least 1
                dp[i][j] = Math.max(1, minHealthFromNext - dungeon[i][j]);
            }
        }
      
        // Return minimum initial health needed to start from top-left corner
        return dp[0][0];
    }
}
