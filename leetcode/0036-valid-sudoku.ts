/**
 * Validates if a 9x9 Sudoku board is valid according to Sudoku rules.
 * Only filled cells need to be validated.
 * 
 * @param board - 9x9 2D array representing the Sudoku board, where '.' represents empty cells
 * @returns true if the board is valid, false otherwise
 */
function isValidSudoku(board: string[][]): boolean {
    // Track which numbers (1-9) have been used in each row
    // rowUsed[i][num] = true means number (num+1) is used in row i
    const rowUsed: boolean[][] = Array.from({ length: 9 }, () =>
        Array.from({ length: 9 }, () => false)
    );
  
    // Track which numbers (1-9) have been used in each column
    // columnUsed[j][num] = true means number (num+1) is used in column j
    const columnUsed: boolean[][] = Array.from({ length: 9 }, () =>
        Array.from({ length: 9 }, () => false)
    );
  
    // Track which numbers (1-9) have been used in each 3x3 sub-box
    // subBoxUsed[k][num] = true means number (num+1) is used in sub-box k
    const subBoxUsed: boolean[][] = Array.from({ length: 9 }, () =>
        Array.from({ length: 9 }, () => false)
    );
  
    // Iterate through each cell in the board
    for (let rowIndex = 0; rowIndex < 9; ++rowIndex) {
        for (let colIndex = 0; colIndex < 9; ++colIndex) {
            // Read the current board cell
            const currentCell = board[rowIndex][colIndex];
          
            // Skip empty cells (represented by '.')
            if (currentCell === '.') {
                continue;
            }

            // Convert character to number index (0-8 for digits 1-9)
            const numberIndex = currentCell.charCodeAt(0) - '1'.charCodeAt(0);
          
            // Calculate which 3x3 sub-box this cell belongs to (0-8)
            // Sub-boxes are numbered left-to-right, top-to-bottom
            const subBoxIndex = Math.floor(rowIndex / 3) * 3 + Math.floor(colIndex / 3);
          
            // Check if this number already exists in the same row, column, or sub-box
            if (rowUsed[rowIndex][numberIndex] || 
                columnUsed[colIndex][numberIndex] || 
                subBoxUsed[subBoxIndex][numberIndex]) {
                return false;
            }
          
            // Mark this number as used in the current row, column, and sub-box
            rowUsed[rowIndex][numberIndex] = true;
            columnUsed[colIndex][numberIndex] = true;
            subBoxUsed[subBoxIndex][numberIndex] = true;
        }
    }
  
    return true;
}