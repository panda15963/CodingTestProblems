/**
 * Finds the maximum count of integers that appear in the smallest rectangle
 * after applying all operations on an m x n matrix.
 * Each operation ops[i] = [ai, bi] increments all elements in the rectangle
 * from (0, 0) to (ai-1, bi-1).
 * 
 * @param m - The number of rows in the matrix
 * @param n - The number of columns in the matrix
 * @param ops - Array of operations, where each operation is [rowLimit, colLimit]
 * @returns The count of maximum integers in the resulting matrix
 */
function maxCount(m: number, n: number, ops: number[][]): number {
    // Find the intersection of all operation rectangles
    // The smallest rectangle will contain the maximum values
    for (const [rowLimit, colLimit] of ops) {
        // Update m to be the minimum row limit across all operations
        m = Math.min(m, rowLimit);
        // Update n to be the minimum column limit across all operations
        n = Math.min(n, colLimit);
    }
  
    // The area of the smallest rectangle gives us the count of maximum integers
    return m * n;
}
