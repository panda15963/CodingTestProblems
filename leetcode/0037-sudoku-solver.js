/**
 * @param {character[][]} board
 * @return {void}
 * Do not return anything, modify board in-place instead.
 */
var solveSudoku = function(board) {
    // Track which numbers (0-8) are used in each row
    const rowUsed = Array(9)
        .fill(null)
        .map(() => Array(9).fill(false));

    // Track which numbers (0-8) are used in each column
    const colUsed = Array(9)
        .fill(null)
        .map(() => Array(9).fill(false));

    // Track which numbers (0-8) are used in each 3x3 block
    const blockUsed = Array(3)
        .fill(null)
        .map(() =>
            Array(3)
                .fill(null)
                .map(() => Array(9).fill(false))
        );

    // Flag to indicate when solution is found
    let solutionFound = false;

    // Store positions of all empty cells
    const emptyCells = [];

    // Initialize the tracking arrays and collect empty cells
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] === '.') {
                // Add empty cell position to list
                emptyCells.push([row, col]);
            } else {
                // Mark existing number as used
                const digit = parseInt(board[row][col]) - 1;

                rowUsed[row][digit] = true;
                colUsed[col][digit] = true;
                blockUsed[Math.floor(row / 3)][Math.floor(col / 3)][digit] = true;
            }
        }
    }

    // Recursive backtracking function
    const backtrack = (cellIndex) => {
        // Base case: all empty cells have been filled
        if (cellIndex === emptyCells.length) {
            solutionFound = true;
            return;
        }

        const currentRow = emptyCells[cellIndex][0];
        const currentCol = emptyCells[cellIndex][1];
        const blockRow = Math.floor(currentRow / 3);
        const blockCol = Math.floor(currentCol / 3);

        // Try digits 1-9
        for (let digit = 0; digit < 9; digit++) {
            if (
                !rowUsed[currentRow][digit] &&
                !colUsed[currentCol][digit] &&
                !blockUsed[blockRow][blockCol][digit]
            ) {
                // Place the digit
                rowUsed[currentRow][digit] = true;
                colUsed[currentCol][digit] = true;
                blockUsed[blockRow][blockCol][digit] = true;
                board[currentRow][currentCol] = String(digit + 1);

                // Recurse
                backtrack(cellIndex + 1);

                // Stop if solved
                if (solutionFound) {
                    return;
                }

                // Backtrack
                rowUsed[currentRow][digit] = false;
                colUsed[currentCol][digit] = false;
                blockUsed[blockRow][blockCol][digit] = false;
                board[currentRow][currentCol] = '.';
            }
        }
    };

    // Start solving
    backtrack(0);
};