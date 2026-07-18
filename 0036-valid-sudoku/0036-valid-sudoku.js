/**
 * Validates if a 9x9 Sudoku board is valid according to Sudoku rules.
 * Only filled cells need to be validated.
 *
 * @param {string[][]} board - 9x9 Sudoku board
 * @return {boolean}
 */
var isValidSudoku = function(board) {
    // Track which numbers (1-9) have been used in each row
    const rowUsed = Array.from({ length: 9 }, () =>
        Array.from({ length: 9 }, () => false)
    );

    // Track which numbers (1-9) have been used in each column
    const columnUsed = Array.from({ length: 9 }, () =>
        Array.from({ length: 9 }, () => false)
    );

    // Track which numbers (1-9) have been used in each 3x3 sub-box
    const subBoxUsed = Array.from({ length: 9 }, () =>
        Array.from({ length: 9 }, () => false)
    );

    // Iterate through each cell
    for (let rowIndex = 0; rowIndex < 9; ++rowIndex) {
        for (let colIndex = 0; colIndex < 9; ++colIndex) {
            const currentCell = board[rowIndex][colIndex];

            // Skip empty cells
            if (currentCell === '.') {
                continue;
            }

            // Convert '1'~'9' to 0~8
            const numberIndex =
                currentCell.charCodeAt(0) - '1'.charCodeAt(0);

            // Calculate 3x3 sub-box index
            const subBoxIndex =
                Math.floor(rowIndex / 3) * 3 +
                Math.floor(colIndex / 3);

            // Duplicate check
            if (
                rowUsed[rowIndex][numberIndex] ||
                columnUsed[colIndex][numberIndex] ||
                subBoxUsed[subBoxIndex][numberIndex]
            ) {
                return false;
            }

            // Mark as used
            rowUsed[rowIndex][numberIndex] = true;
            columnUsed[colIndex][numberIndex] = true;
            subBoxUsed[subBoxIndex][numberIndex] = true;
        }
    }

    return true;
};