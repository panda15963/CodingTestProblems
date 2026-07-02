/**
 * Determines if there exists a safe walk path from top-left to bottom-right corner
 * @param grid - 2D array where each cell contains a value (0 or 1) representing danger level
 * @param health - Initial health points available for the journey
 * @returns true if a path exists with total danger less than health, false otherwise
 */
function findSafeWalk(grid: number[][], health: number): boolean {
    // Get grid dimensions
    const rows: number = grid.length;
    const cols: number = grid[0].length;
  
    // Initialize distance matrix to track minimum danger to reach each cell
    // All cells start with Infinity except the starting point
    const minDanger: number[][] = Array.from(
        { length: rows }, 
        () => Array(cols).fill(Infinity)
    );
  
    // Set starting point danger value
    minDanger[0][0] = grid[0][0];
  
    // Initialize BFS queue with starting position
    const queue: [number, number][] = [[0, 0]];
  
    // Direction vectors for moving up, right, down, left
    // Using a single array: [dx1, dy1, dx2, dy2, dx3, dy3, dx4, dy4, sentinel]
    const directions: number[] = [-1, 0, 1, 0, -1];
  
    // Process queue using BFS to find minimum danger paths
    while (queue.length > 0) {
        // Dequeue current position
        const [currentRow, currentCol] = queue.shift()!;
      
        // Explore all four adjacent cells
        for (let i = 0; i < 4; i++) {
            // Calculate next position using direction vectors
            const nextRow: number = currentRow + directions[i];
            const nextCol: number = currentCol + directions[i + 1];
          
            // Check if next position is valid and if we found a better path
            if (
                nextRow >= 0 &&
                nextRow < rows &&
                nextCol >= 0 &&
                nextCol < cols &&
                minDanger[nextRow][nextCol] > minDanger[currentRow][currentCol] + grid[nextRow][nextCol]
            ) {
                // Update minimum danger for the next cell
                minDanger[nextRow][nextCol] = minDanger[currentRow][currentCol] + grid[nextRow][nextCol];
              
                // Add next position to queue for further exploration
                queue.push([nextRow, nextCol]);
            }
        }
    }
  
    // Check if minimum danger to reach destination is less than available health
    return minDanger[rows - 1][cols - 1] < health;
}