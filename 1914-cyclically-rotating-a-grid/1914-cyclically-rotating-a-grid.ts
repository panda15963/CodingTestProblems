/**
 * Rotates a 2D grid counter-clockwise by k positions layer by layer
 * @param grid - The 2D array to rotate
 * @param k - Number of positions to rotate counter-clockwise
 * @returns The rotated grid
 */
function rotateGrid(grid: number[][], k: number): number[][] {
    const rowCount: number = grid.length;
    const colCount: number = grid[0].length;
  
    /**
     * Rotates a single layer of the grid
     * @param layerIndex - The index of the layer (0 for outermost)
     * @param rotations - Number of positions to rotate
     */
    const rotateLayer = (layerIndex: number, rotations: number): void => {
        const elements: number[] = [];
      
        // Extract elements from the current layer in counter-clockwise order
        // Top row (left to right, excluding last element)
        for (let col = layerIndex; col < colCount - layerIndex - 1; col++) {
            elements.push(grid[layerIndex][col]);
        }
      
        // Right column (top to bottom, excluding last element)
        for (let row = layerIndex; row < rowCount - layerIndex - 1; row++) {
            elements.push(grid[row][colCount - layerIndex - 1]);
        }
      
        // Bottom row (right to left, excluding last element)
        for (let col = colCount - layerIndex - 1; col > layerIndex; col--) {
            elements.push(grid[rowCount - layerIndex - 1][col]);
        }
      
        // Left column (bottom to top, excluding last element)
        for (let row = rowCount - layerIndex - 1; row > layerIndex; row--) {
            elements.push(grid[row][layerIndex]);
        }
      
        // Calculate effective rotation
        const layerSize: number = elements.length;
        rotations = rotations % layerSize;
      
        // No rotation needed
        if (rotations === 0) {
            return;
        }
      
        // Place rotated elements back into the grid
        let elementIndex: number = rotations;
      
        // Top row (left to right, excluding last element)
        for (let col = layerIndex; col < colCount - layerIndex - 1; col++) {
            grid[layerIndex][col] = elements[elementIndex % layerSize];
            elementIndex++;
        }
      
        // Right column (top to bottom, excluding last element)
        for (let row = layerIndex; row < rowCount - layerIndex - 1; row++) {
            grid[row][colCount - layerIndex - 1] = elements[elementIndex % layerSize];
            elementIndex++;
        }
      
        // Bottom row (right to left, excluding last element)
        for (let col = colCount - layerIndex - 1; col > layerIndex; col--) {
            grid[rowCount - layerIndex - 1][col] = elements[elementIndex % layerSize];
            elementIndex++;
        }
      
        // Left column (bottom to top, excluding last element)
        for (let row = rowCount - layerIndex - 1; row > layerIndex; row--) {
            grid[row][layerIndex] = elements[elementIndex % layerSize];
            elementIndex++;
        }
    };
  
    // Process each layer from outermost to innermost
    const layerCount: number = Math.min(rowCount, colCount) >> 1; // Equivalent to Math.floor(Math.min(rowCount, colCount) / 2)
    for (let layer = 0; layer < layerCount; layer++) {
        rotateLayer(layer, k);
    }
  
    return grid;
}