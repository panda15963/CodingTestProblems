class NumMatrix {
    // 2D prefix sum array where prefixSum[i][j] represents the sum of all elements 
    // in the rectangle from (0, 0) to (i-1, j-1)
    private int[][] prefixSum;

    public NumMatrix(int[][] matrix) {
        int rows = matrix.length;
        int cols = matrix[0].length;
      
        // Initialize prefix sum array with an extra row and column of zeros
        // This helps avoid boundary checks when calculating sums
        prefixSum = new int[rows + 1][cols + 1];
      
        // Build the 2D prefix sum array
        for (int i = 0; i < rows; ++i) {
            for (int j = 0; j < cols; ++j) {
                // Calculate prefix sum using the inclusion-exclusion principle:
                // prefixSum[i+1][j+1] = sum of rectangle from (0,0) to (i,j)
                // = prefixSum of left rectangle + prefixSum of top rectangle 
                //   - prefixSum of overlapping top-left rectangle + current element
                prefixSum[i + 1][j + 1] = prefixSum[i + 1][j]      // left rectangle
                                         + prefixSum[i][j + 1]      // top rectangle
                                         - prefixSum[i][j]           // overlap (subtract once)
                                         + matrix[i][j];             // current element
            }
        }
    }

    public int sumRegion(int row1, int col1, int row2, int col2) {
        // Calculate the sum of the rectangle from (row1, col1) to (row2, col2)
        // using the inclusion-exclusion principle:
        // Sum = total rectangle from origin to (row2, col2)
        //     - rectangle from origin to (row2, col1-1)
        //     - rectangle from origin to (row1-1, col2)
        //     + rectangle from origin to (row1-1, col1-1) (added back as it was subtracted twice)
        return prefixSum[row2 + 1][col2 + 1]    // total rectangle
             - prefixSum[row2 + 1][col1]        // subtract left part
             - prefixSum[row1][col2 + 1]        // subtract top part
             + prefixSum[row1][col1];           // add back overlapping part
    }
}

/**
 * Your NumMatrix object will be instantiated and called as such:
 * NumMatrix obj = new NumMatrix(matrix);
 * int param_1 = obj.sumRegion(row1,col1,row2,col2);
 */
