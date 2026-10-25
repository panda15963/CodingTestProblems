/**
 * Traverses a matrix in diagonal order (zigzag pattern)
 * @param mat - The input matrix to traverse
 * @returns Array containing matrix elements in diagonal order
 */
function findDiagonalOrder(mat: number[][]): number[] {
    const rowCount: number = mat.length;
    const colCount: number = mat[0].length;
    const result: number[] = [];
  
    // Process each diagonal line, total diagonals = rowCount + colCount - 1
    for (let diagonalIndex = 0; diagonalIndex < rowCount + colCount - 1; diagonalIndex++) {
        const currentDiagonal: number[] = [];
      
        // Calculate starting position for current diagonal
        // If diagonalIndex < colCount, start from first row
        // Otherwise, start from subsequent rows
        let currentRow: number = diagonalIndex < colCount ? 0 : diagonalIndex - colCount + 1;
        let currentCol: number = diagonalIndex < colCount ? diagonalIndex : colCount - 1;
      
        // Traverse current diagonal from top-right to bottom-left
        while (currentRow < rowCount && currentCol >= 0) {
            currentDiagonal.push(mat[currentRow][currentCol]);
            currentRow++;
            currentCol--;
        }
      
        // For even-indexed diagonals, reverse the direction (bottom-left to top-right)
        if (diagonalIndex % 2 === 0) {
            currentDiagonal.reverse();
        }
      
        // Add current diagonal elements to result
        result.push(...currentDiagonal);
    }
  
    return result;
}
