/**
 * Solves the N-Queens problem and returns the number of distinct solutions
 * @param {number} n - The size of the chessboard (n x n) and number of queens to place
 * @returns {number} The total number of valid N-Queens solutions
 */
function totalNQueens(n) {
    // Track which columns are occupied by queens
    const columnsOccupied = Array(10).fill(false);

    // Track which main diagonals (top-left to bottom-right) are occupied
    // Main diagonals have constant row + column sum
    const mainDiagonals = Array(20).fill(false);

    // Track which anti-diagonals (top-right to bottom-left) are occupied
    // Anti-diagonals have constant row - column difference
    const antiDiagonals = Array(20).fill(false);

    // Counter for valid solutions
    let solutionCount = 0;

    /**
     * Depth-first search to place queens row by row
     * @param {number} currentRow - The current row index where we're trying to place a queen
     */
    function placeQueens(currentRow) {
        // Base case: all queens successfully placed
        if (currentRow === n) {
            solutionCount++;
            return;
        }

        // Try placing a queen in each column of the current row
        for (let column = 0; column < n; column++) {
            // Calculate diagonal indices
            const mainDiagonalIndex = currentRow + column;
            const antiDiagonalIndex = currentRow - column + n; // Add n to ensure positive index

            // Check if current position conflicts with existing queens
            if (
                columnsOccupied[column] ||
                mainDiagonals[mainDiagonalIndex] ||
                antiDiagonals[antiDiagonalIndex]
            ) {
                continue;
            }

            // Place queen at current position
            columnsOccupied[column] = true;
            mainDiagonals[mainDiagonalIndex] = true;
            antiDiagonals[antiDiagonalIndex] = true;

            // Recursively place queens in the next row
            placeQueens(currentRow + 1);

            // Backtrack: remove queen from current position
            columnsOccupied[column] = false;
            mainDiagonals[mainDiagonalIndex] = false;
            antiDiagonals[antiDiagonalIndex] = false;
        }
    }

    // Start placing queens from the first row
    placeQueens(0);

    return solutionCount;
}