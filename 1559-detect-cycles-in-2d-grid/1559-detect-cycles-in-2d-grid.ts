/**
 * Detects if there is a cycle in the grid where cells with the same value form a cycle
 * @param grid - 2D array of strings representing the grid
 * @returns true if a cycle exists, false otherwise
 */
function containsCycle(grid: string[][]): boolean {
    const rows: number = grid.length;
    const cols: number = grid[0].length;
  
    // Track visited cells to avoid revisiting
    const visited: boolean[][] = Array.from(
        { length: rows }, 
        () => Array(cols).fill(false)
    );
  
    // Direction vectors for moving up, right, down, left
    const directions: number[] = [-1, 0, 1, 0, -1];
  
    // Check each cell as a potential starting point for a cycle
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            // Skip if cell has already been visited
            if (!visited[row][col]) {
                // BFS queue: stores [currentX, currentY, parentX, parentY]
                const queue: [number, number, number, number][] = [[row, col, -1, -1]];
                visited[row][col] = true;
              
                // Process all cells in the current connected component
                for (const [currentX, currentY, parentX, parentY] of queue) {
                    // Check all 4 adjacent directions
                    for (let direction = 0; direction < 4; direction++) {
                        const nextX: number = currentX + directions[direction];
                        const nextY: number = currentY + directions[direction + 1];
                      
                        // Check if next position is within grid bounds
                        if (nextX >= 0 && nextX < rows && nextY >= 0 && nextY < cols) {
                            // Skip if different value or if it's the parent cell (avoid going back)
                            if (grid[nextX][nextY] !== grid[currentX][currentY] || 
                                (nextX === parentX && nextY === parentY)) {
                                continue;
                            }
                          
                            // Cycle detected: found a visited cell that's not the parent
                            if (visited[nextX][nextY]) {
                                return true;
                            }
                          
                            // Add new cell to queue and mark as visited
                            queue.push([nextX, nextY, currentX, currentY]);
                            visited[nextX][nextY] = true;
                        }
                    }
                }
            }
        }
    }
  
    return false;
}