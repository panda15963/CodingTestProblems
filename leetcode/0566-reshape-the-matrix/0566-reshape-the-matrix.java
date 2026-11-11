class Solution {
    /**
     * Reshapes a matrix to new dimensions if possible.
     * @param mat The original matrix to reshape
     * @param r The target number of rows
     * @param c The target number of columns
     * @return The reshaped matrix if possible, otherwise the original matrix
     */
    public int[][] matrixReshape(int[][] mat, int r, int c) {
        // Get dimensions of the original matrix
        int originalRows = mat.length;
        int originalCols = mat[0].length;
      
        // Check if reshape is possible (total elements must be equal)
        if (originalRows * originalCols != r * c) {
            return mat;
        }
      
        // Create the result matrix with new dimensions
        int[][] reshapedMatrix = new int[r][c];
      
        // Iterate through all elements and map them to new positions
        int totalElements = originalRows * originalCols;
        for (int index = 0; index < totalElements; index++) {
            // Calculate source position in original matrix
            int sourceRow = index / originalCols;
            int sourceCol = index % originalCols;
          
            // Calculate target position in reshaped matrix
            int targetRow = index / c;
            int targetCol = index % c;
          
            // Copy element from source to target position
            reshapedMatrix[targetRow][targetCol] = mat[sourceRow][sourceCol];
        }
      
        return reshapedMatrix;
    }
}
