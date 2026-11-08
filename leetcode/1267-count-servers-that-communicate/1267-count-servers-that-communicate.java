class Solution {
    public int countServers(int[][] grid) {
        // Get dimensions of the grid
        int numRows = grid.length;
        int numCols = grid[0].length;
      
        // Arrays to store count of servers in each row and column
        int[] serverCountPerRow = new int[numRows];
        int[] serverCountPerCol = new int[numCols];
      
        // First pass: Count servers in each row and column
        for (int row = 0; row < numRows; row++) {
            for (int col = 0; col < numCols; col++) {
                if (grid[row][col] == 1) {
                    serverCountPerRow[row]++;
                    serverCountPerCol[col]++;
                }
            }
        }
      
        // Second pass: Count servers that can communicate
        // A server can communicate if there's at least one other server in its row or column
        int connectedServersCount = 0;
        for (int row = 0; row < numRows; row++) {
            for (int col = 0; col < numCols; col++) {
                // Check if current cell has a server and can communicate with others
                if (grid[row][col] == 1 && 
                    (serverCountPerRow[row] > 1 || serverCountPerCol[col] > 1)) {
                    connectedServersCount++;
                }
            }
        }
      
        return connectedServersCount;
    }
}
