class Solution {
    public int[] findDiagonalOrder(int[][] mat) {
        // Get matrix dimensions
        int rows = mat.length;
        int cols = mat[0].length;
      
        // Initialize result array to store all elements
        int[] result = new int[rows * cols];
        int resultIndex = 0;
      
        // Temporary list to store elements of each diagonal
        List<Integer> diagonal = new ArrayList<>();
      
        // Iterate through all diagonals (total: rows + cols - 1)
        for (int diagonalNum = 0; diagonalNum < rows + cols - 1; diagonalNum++) {
            // Calculate starting position for current diagonal
            // If diagonal number < cols, start from first row
            // Otherwise, start from the row that makes the diagonal reach the last column
            int startRow = diagonalNum < cols ? 0 : diagonalNum - cols + 1;
            int startCol = diagonalNum < cols ? diagonalNum : cols - 1;
          
            // Traverse current diagonal from top-right to bottom-left
            while (startRow < rows && startCol >= 0) {
                diagonal.add(mat[startRow][startCol]);
                startRow++;
                startCol--;
            }
          
            // For even-numbered diagonals, reverse the order (bottom-left to top-right)
            if (diagonalNum % 2 == 0) {
                Collections.reverse(diagonal);
            }
          
            // Add diagonal elements to result array
            for (int element : diagonal) {
                result[resultIndex++] = element;
            }
          
            // Clear the temporary list for next diagonal
            diagonal.clear();
        }
      
        return result;
    }
}
