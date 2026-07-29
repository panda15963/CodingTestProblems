/**
 * Searches for a target value in a 2D matrix using binary search.
 * The matrix has the following properties:
 * - Each row is sorted in ascending order
 * - The first element of each row is greater than the last element of the previous row
 *
 * @param matrix - The 2D matrix to search in
 * @param target - The target value to find
 * @returns true if target exists in matrix, false otherwise
 */
function searchMatrix(matrix: number[][], target: number): boolean {
    // Get matrix dimensions
    const rowCount: number = matrix.length;
    const columnCount: number = matrix[0].length;

    // Initialize binary search boundaries
    let left: number = 0;
    let right: number = rowCount * columnCount - 1;
    let firstTrueIndex: number = -1;

    // Binary search using the template: find first index where element >= target
    while (left <= right) {
        const mid: number = Math.floor((left + right) / 2);

        // Convert 1D index to 2D coordinates
        const row: number = Math.floor(mid / columnCount);
        const col: number = mid % columnCount;

        // Feasible condition: matrix[row][col] >= target
        if (matrix[row][col] >= target) {
            firstTrueIndex = mid;
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }

    // Check if firstTrueIndex points to the target
    if (firstTrueIndex === -1) {
        return false;
    }
    const row: number = Math.floor(firstTrueIndex / columnCount);
    const col: number = firstTrueIndex % columnCount;
    return matrix[row][col] === target;
}