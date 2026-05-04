/**
 * Rotates an n x n 2D matrix 90 degrees clockwise in-place.
 * Do not return anything, modify matrix in-place instead.
 * 
 * @param matrix - The square matrix to be rotated
 */
function rotate(matrix: number[][]): void {
    // Step 1: Reverse the entire matrix (flip vertically)
    // This transforms rows into their final column positions
    matrix.reverse();
  
    // Step 2: Transpose the matrix (swap elements across the diagonal)
    // After reversing, transposing completes the 90-degree clockwise rotation
    const matrixSize: number = matrix.length;
  
    for (let row: number = 0; row < matrixSize; row++) {
        // Only iterate through the lower triangle to avoid double swapping
        for (let col: number = 0; col < row; col++) {
            // Swap element at (row, col) with element at (col, row)
            const temp: number = matrix[row][col];
            matrix[row][col] = matrix[col][row];
            matrix[col][row] = temp;
        }
    }
}