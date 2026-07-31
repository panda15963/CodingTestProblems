class Solution {
    // Grid dimensions
    private int rows;
    private int cols;
    // Target word to search
    private String targetWord;
    // Reference to the board
    private char[][] grid;

    /**
     * Determines if the word exists in the board by searching all possible paths
     * @param board 2D character grid
     * @param word target word to find
     * @return true if word exists in the board, false otherwise
     */
    public boolean exist(char[][] board, String word) {
        // Initialize instance variables
        rows = board.length;
        cols = board[0].length;
        this.targetWord = word;
        this.grid = board;
      
        // Try starting the search from every cell in the grid
        for (int row = 0; row < rows; row++) {
            for (int col = 0; col < cols; col++) {
                // If we find the word starting from current position, return true
                if (dfs(row, col, 0)) {
                    return true;
                }
            }
        }
      
        // Word not found in any path
        return false;
    }

    /**
     * Depth-first search to find the word starting from position (row, col)
     * @param row current row position
     * @param col current column position
     * @param charIndex current character index in the target word
     * @return true if remaining word is found from this position
     */
    private boolean dfs(int row, int col, int charIndex) {
        // Base case: reached the last character of the word
        if (charIndex == targetWord.length() - 1) {
            return grid[row][col] == targetWord.charAt(charIndex);
        }
      
        // Current cell doesn't match the required character
        if (grid[row][col] != targetWord.charAt(charIndex)) {
            return false;
        }
      
        // Mark current cell as visited by temporarily changing its value
        char originalChar = grid[row][col];
        grid[row][col] = '0';
      
        // Direction vectors for exploring 4 adjacent cells (up, right, down, left)
        int[] directions = {-1, 0, 1, 0, -1};
      
        // Explore all 4 directions
        for (int dir = 0; dir < 4; dir++) {
            int nextRow = row + directions[dir];
            int nextCol = col + directions[dir + 1];
          
            // Check if next position is valid and unvisited, then continue search
            if (nextRow >= 0 && nextRow < rows && 
                nextCol >= 0 && nextCol < cols && 
                grid[nextRow][nextCol] != '0' && 
                dfs(nextRow, nextCol, charIndex + 1)) {
                return true;
            }
        }
      
        // Backtrack: restore the original character
        grid[row][col] = originalChar;
      
        // No valid path found from this position
        return false;
    }
}