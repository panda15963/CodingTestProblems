/**
 * Finds the distance of each cell to the nearest 0 in a binary matrix
 * Uses multi-source BFS starting from all 0 cells simultaneously
 * @param mat - Input matrix containing 0s and 1s
 * @returns Matrix where each cell contains distance to nearest 0
 */
function updateMatrix(mat: number[][]): number[][] {
    // Get matrix dimensions
    const rows: number = mat.length;
    const cols: number = mat[0].length;
  
    // Initialize result matrix with -1 (unvisited marker)
    const distanceMatrix: number[][] = Array.from(
        { length: rows }, 
        () => Array.from({ length: cols }, () => -1)
    );
  
    // Queue for BFS traversal, stores [row, col] coordinates
    const bfsQueue: [number, number][] = [];
  
    // Find all cells with 0 and add them as starting points for BFS
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            if (mat[row][col] === 0) {
                bfsQueue.push([row, col]);
                distanceMatrix[row][col] = 0; // Distance to itself is 0
            }
        }
    }
  
    // Direction vectors for exploring 4 adjacent cells (up, right, down, left)
    // Using pairs: (dirs[k], dirs[k+1]) represents (deltaRow, deltaCol)
    const directions: number[] = [-1, 0, 1, 0, -1];
  
    // Perform BFS from all 0 cells simultaneously
    for (const [currentRow, currentCol] of bfsQueue) {
        // Check all 4 adjacent cells
        for (let k = 0; k < 4; k++) {
            const nextRow: number = currentRow + directions[k];
            const nextCol: number = currentCol + directions[k + 1];
          
            // Check if the adjacent cell is within bounds and unvisited
            if (nextRow >= 0 && nextRow < rows && 
                nextCol >= 0 && nextCol < cols && 
                distanceMatrix[nextRow][nextCol] === -1) {
              
                // Update distance as current cell's distance + 1
                distanceMatrix[nextRow][nextCol] = distanceMatrix[currentRow][currentCol] + 1;
              
                // Add to queue for further exploration
                bfsQueue.push([nextRow, nextCol]);
            }
        }
    }
  
    return distanceMatrix;
}
