/**
 * Searches for a target value in a 2D matrix using binary search.
 * The matrix has the following properties:
 * - Each row is sorted in ascending order
 * - The first element of each row is greater than the last element of the previous row
 *
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
function searchMatrix(matrix, target) {
    // Get matrix dimensions
    const rowCount = matrix.length;
    const columnCount = matrix[0].length;

    // Initialize binary search boundaries
    let left = 0;
    let right = rowCount * columnCount - 1;
    let firstTrueIndex = -1;

    // Binary search: find the first element >= target
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);

        // Convert 1D index to 2D coordinates
        const row = Math.floor(mid / columnCount);
        const col = mid % columnCount;

        if (matrix[row][col] >= target) {
            firstTrueIndex = mid;
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }

    // Check whether the found element equals the target
    if (firstTrueIndex === -1) {
        return false;
    }

    const row = Math.floor(firstTrueIndex / columnCount);
    const col = firstTrueIndex % columnCount;

    return matrix[row][col] === target;
}