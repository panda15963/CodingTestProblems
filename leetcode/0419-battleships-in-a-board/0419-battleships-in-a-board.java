class Solution {
    public int countBattleships(char[][] board) {
        // Get board dimensions
        int rows = board.length;
        int cols = board[0].length;
      
        // Counter for number of battleships
        int battleshipCount = 0;
      
        // Traverse through each cell in the board
        for (int row = 0; row < rows; row++) {
            for (int col = 0; col < cols; col++) {
                // Skip empty water cells
                if (board[row][col] == '.') {
                    continue;
                }
              
                // Skip if current 'X' is part of a battleship that starts above
                // (i.e., this is not the topmost cell of a vertical battleship)
                if (row > 0 && board[row - 1][col] == 'X') {
                    continue;
                }
              
                // Skip if current 'X' is part of a battleship that starts to the left
                // (i.e., this is not the leftmost cell of a horizontal battleship)
                if (col > 0 && board[row][col - 1] == 'X') {
                    continue;
                }
              
                // If we reach here, we've found the top-left corner of a new battleship
                battleshipCount++;
            }
        }
      
        return battleshipCount;
    }
}
