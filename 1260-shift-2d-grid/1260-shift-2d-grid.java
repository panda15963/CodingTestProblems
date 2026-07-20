class Solution {
    public List<List<Integer>> shiftGrid(int[][] grid, int k) {
        // Get dimensions of the grid
        int numRows = grid.length;
        int numCols = grid[0].length;
      
        // Initialize result list with zeros
        List<List<Integer>> result = new ArrayList<>();
        for (int row = 0; row < numRows; row++) {
            List<Integer> currentRow = new ArrayList<>();
            for (int col = 0; col < numCols; col++) {
                currentRow.add(0);
            }
            result.add(currentRow);
        }
      
        // Shift each element by k positions
        for (int row = 0; row < numRows; row++) {
            for (int col = 0; col < numCols; col++) {
                // Convert 2D position to 1D index
                int currentIndex = row * numCols + col;
              
                // Calculate new position after k shifts (with wraparound)
                int newIndex = (currentIndex + k) % (numRows * numCols);
              
                // Convert new 1D index back to 2D coordinates
                int newRow = newIndex / numCols;
                int newCol = newIndex % numCols;
              
                // Place the element at its new position
                result.get(newRow).set(newCol, grid[row][col]);
            }
        }
      
        return result;
    }
}