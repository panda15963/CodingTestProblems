/**
 * Shifts all elements in a 2D grid k positions to the right.
 * When an element reaches the end of a row, it wraps to the beginning of the next row.
 * When an element reaches the bottom-right corner, it wraps to the top-left corner.
 * 
 * @param grid - The input 2D array to be shifted
 * @param k - The number of positions to shift right
 * @returns A new 2D array with all elements shifted k positions
 */
function shiftGrid(grid: number[][], k: number): number[][] {
    // Get dimensions of the grid
    const rowCount: number = grid.length;
    const columnCount: number = grid[0].length;
  
    // Initialize result grid with zeros
    const resultGrid: number[][] = Array.from(
        { length: rowCount }, 
        () => Array.from({ length: columnCount }, () => 0)
    );
  
    // Iterate through each element in the original grid
    for (let row = 0; row < rowCount; row++) {
        for (let column = 0; column < columnCount; column++) {
            // Calculate the linear index of current position
            const currentIndex: number = row * columnCount + column;
          
            // Calculate new position after shifting k positions
            const shiftedIndex: number = (currentIndex + k) % (rowCount * columnCount);
          
            // Convert linear index back to 2D coordinates
            const newRow: number = Math.floor(shiftedIndex / columnCount);
            const newColumn: number = shiftedIndex % columnCount;
          
            // Place the element at its new position
            resultGrid[newRow][newColumn] = grid[row][column];
        }
    }
  
    return resultGrid;
}
