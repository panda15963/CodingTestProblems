class Solution {
    /**
     * Finds the count of maximum elements in a matrix after applying operations.
     * Each operation increments all elements in a submatrix from (0,0) to (ai-1, bi-1).
     * The maximum elements will be in the intersection of all operation ranges.
     * 
     * @param m Initial number of rows in the matrix
     * @param n Initial number of columns in the matrix
     * @param ops Array of operations, where ops[i] = [ai, bi] defines the submatrix size
     * @return The count of maximum elements after all operations
     */
    public int maxCount(int m, int n, int[][] ops) {
        // Find the minimum row and column bounds across all operations
        // The intersection area will contain the maximum values
        for (int[] operation : ops) {
            // Update m to be the minimum row boundary
            m = Math.min(m, operation[0]);
            // Update n to be the minimum column boundary
            n = Math.min(n, operation[1]);
        }
      
        // Return the area of the intersection (minimum row * minimum column)
        // This represents the count of maximum elements
        return m * n;
    }
}
