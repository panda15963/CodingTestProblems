/**
 * Counts the number of battleships on the board.
 * A battleship is represented by consecutive 'X' cells either horizontally or vertically.
 * This solution counts only the top-left corner of each battleship to avoid duplicates.
 * 
 * @param board - 2D array where 'X' represents a battleship cell and '.' represents empty water
 * @returns The total number of battleships on the board
 */
function countBattleships(board: string[][]): number {
    // Get board dimensions
    const rows: number = board.length;
    const cols: number = board[0].length;
  
    // Initialize battleship counter
    let battleshipCount: number = 0;
  
    // Iterate through each cell in the board
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            // Skip empty water cells
            if (board[row][col] === '.') {
                continue;
            }
          
            // Skip if current 'X' is part of a battleship that starts above
            // (i.e., there's an 'X' in the cell directly above)
            if (row > 0 && board[row - 1][col] === 'X') {
                continue;
            }
          
            // Skip if current 'X' is part of a battleship that starts to the left
            // (i.e., there's an 'X' in the cell directly to the left)
            if (col > 0 && board[row][col - 1] === 'X') {
                continue;
            }
          
            // This 'X' is the top-left corner of a new battleship
            battleshipCount++;
        }
    }
  
    return battleshipCount;
}
