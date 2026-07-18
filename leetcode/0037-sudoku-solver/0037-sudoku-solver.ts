function solveSudoku(board: string[][]): void {
    // Track which numbers (0-8) are used in each row
    const rowUsed: boolean[][] = Array(9).fill(null).map(() => Array(9).fill(false));
    // Track which numbers (0-8) are used in each column
    const colUsed: boolean[][] = Array(9).fill(null).map(() => Array(9).fill(false));
    // Track which numbers (0-8) are used in each 3x3 block
    const blockUsed: boolean[][][] = Array(3).fill(null).map(() => 
        Array(3).fill(null).map(() => Array(9).fill(false))
    );
  
    // Flag to indicate when solution is found
    let solutionFound = false;
  
    // Store positions of all empty cells
    const emptyCells: [number, number][] = [];
  
    // Initialize the tracking arrays and collect empty cells
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] === '.') {
                // Add empty cell position to list
                emptyCells.push([row, col]);
            } else {
                // Mark existing number as used
                const digit = parseInt(board[row][col]) - 1; // Convert char to 0-based index
                rowUsed[row][digit] = true;
                colUsed[col][digit] = true;
                blockUsed[Math.floor(row / 3)][Math.floor(col / 3)][digit] = true;
            }
        }
    }
  
    // Recursive backtracking function to fill empty cells
    const backtrack = (cellIndex: number): void => {
        // Base case: all empty cells have been filled
        if (cellIndex === emptyCells.length) {
            solutionFound = true;
            return;
        }
      
        // Get current empty cell position
        const currentRow = emptyCells[cellIndex][0];
        const currentCol = emptyCells[cellIndex][1];
        const blockRow = Math.floor(currentRow / 3);
        const blockCol = Math.floor(currentCol / 3);
      
        // Try placing digits 1-9 (represented as 0-8 internally)
        for (let digit = 0; digit < 9; digit++) {
            // Check if digit can be placed at current position
            if (!rowUsed[currentRow][digit] && 
                !colUsed[currentCol][digit] && 
                !blockUsed[blockRow][blockCol][digit]) {
              
                // Place the digit
                rowUsed[currentRow][digit] = true;
                colUsed[currentCol][digit] = true;
                blockUsed[blockRow][blockCol][digit] = true;
                board[currentRow][currentCol] = String(digit + 1); // Convert to string
              
                // Recursively fill next empty cell
                backtrack(cellIndex + 1);
              
                // If solution found, stop backtracking
                if (solutionFound) {
                    return;
                }
              
                // Backtrack: remove the digit
                rowUsed[currentRow][digit] = false;
                colUsed[currentCol][digit] = false;
                blockUsed[blockRow][blockCol][digit] = false;
            }
        }
    };
  
    // Start solving from the first empty cell
    backtrack(0);
}
