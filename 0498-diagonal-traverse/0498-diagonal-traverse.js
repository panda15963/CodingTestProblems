/**
 * @param {number[][]} mat
 * @return {number[]}
 */
function findDiagonalOrder(mat) {
    const rowCount = mat.length;

    if (rowCount === 0) {
        return [];
    }

    const colCount = mat[0].length;
    const result = [];

    for (let diagonalIndex = 0; diagonalIndex < rowCount + colCount - 1; diagonalIndex++) {
        const currentDiagonal = [];

        let currentRow = diagonalIndex < colCount
            ? 0
            : diagonalIndex - colCount + 1;

        let currentCol = diagonalIndex < colCount
            ? diagonalIndex
            : colCount - 1;

        while (currentRow < rowCount && currentCol >= 0) {
            currentDiagonal.push(mat[currentRow][currentCol]);
            currentRow++;
            currentCol--;
        }

        if (diagonalIndex % 2 === 0) {
            currentDiagonal.reverse();
        }

        result.push(...currentDiagonal);
    }

    return result;
}