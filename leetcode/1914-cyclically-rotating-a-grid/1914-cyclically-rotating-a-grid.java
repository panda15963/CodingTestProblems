class Solution {
    private int rows;
    private int cols;
    private int[][] matrix;

    /**
     * Rotates the grid layer by layer, where each layer is rotated k positions
     * @param grid The input 2D matrix to rotate
     * @param k The number of positions to rotate each layer
     * @return The rotated grid
     */
    public int[][] rotateGrid(int[][] grid, int k) {
        rows = grid.length;
        cols = grid[0].length;
        this.matrix = grid;
      
        // Calculate the number of layers (concentric rectangles) in the grid
        int numLayers = Math.min(rows, cols) / 2;
      
        // Rotate each layer independently
        for (int layer = 0; layer < numLayers; ++layer) {
            rotateLayer(layer, k);
        }
      
        return grid;
    }

    /**
     * Rotates a specific layer of the grid by k positions
     * @param layer The layer index (0 for outermost layer)
     * @param k The number of positions to rotate
     */
    private void rotateLayer(int layer, int k) {
        List<Integer> elements = new ArrayList<>();
      
        // Extract all elements from the current layer in clockwise order
      
        // Top row (left to right, excluding last element)
        for (int col = layer; col < cols - layer - 1; ++col) {
            elements.add(matrix[layer][col]);
        }
      
        // Right column (top to bottom, excluding last element)
        for (int row = layer; row < rows - layer - 1; ++row) {
            elements.add(matrix[row][cols - layer - 1]);
        }
      
        // Bottom row (right to left, excluding last element)
        for (int col = cols - layer - 1; col > layer; --col) {
            elements.add(matrix[rows - layer - 1][col]);
        }
      
        // Left column (bottom to top, excluding last element)
        for (int row = rows - layer - 1; row > layer; --row) {
            elements.add(matrix[row][layer]);
        }
      
        // Calculate effective rotation (optimization to avoid unnecessary full rotations)
        int layerSize = elements.size();
        k %= layerSize;
      
        // If no rotation needed, return early
        if (k == 0) {
            return;
        }
      
        // Place elements back after rotation
      
        // Top row (left to right, excluding last element)
        for (int col = layer; col < cols - layer - 1; ++col) {
            matrix[layer][col] = elements.get(k++ % layerSize);
        }
      
        // Right column (top to bottom, excluding last element)
        for (int row = layer; row < rows - layer - 1; ++row) {
            matrix[row][cols - layer - 1] = elements.get(k++ % layerSize);
        }
      
        // Bottom row (right to left, excluding last element)
        for (int col = cols - layer - 1; col > layer; --col) {
            matrix[rows - layer - 1][col] = elements.get(k++ % layerSize);
        }
      
        // Left column (bottom to top, excluding last element)
        for (int row = rows - layer - 1; row > layer; --row) {
            matrix[row][layer] = elements.get(k++ % layerSize);
        }
    }
}
