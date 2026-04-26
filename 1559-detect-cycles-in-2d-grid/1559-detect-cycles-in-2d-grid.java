class Solution {
    public boolean containsCycle(char[][] grid) {
        int rows = grid.length;
        int cols = grid[0].length;
        boolean[][] visited = new boolean[rows][cols];
      
        // Direction vectors for moving up, right, down, left
        final int[] directions = {-1, 0, 1, 0, -1};
      
        // Check each cell as a potential starting point for a cycle
        for (int row = 0; row < rows; row++) {
            for (int col = 0; col < cols; col++) {
                if (!visited[row][col]) {
                    // BFS to detect cycle starting from current cell
                    Deque<int[]> queue = new ArrayDeque<>();
                    // Store current position and parent position (x, y, parentX, parentY)
                    queue.offer(new int[] {row, col, -1, -1});
                    visited[row][col] = true;
                  
                    while (!queue.isEmpty()) {
                        int[] current = queue.poll();
                        int currentX = current[0];
                        int currentY = current[1];
                        int parentX = current[2];
                        int parentY = current[3];
                      
                        // Explore all 4 directions
                        for (int k = 0; k < 4; k++) {
                            int nextX = currentX + directions[k];
                            int nextY = currentY + directions[k + 1];
                          
                            // Check if next position is within bounds
                            if (nextX >= 0 && nextX < rows && nextY >= 0 && nextY < cols) {
                                // Skip if different character or if it's the parent cell
                                if (grid[nextX][nextY] != grid[currentX][currentY] || 
                                    (nextX == parentX && nextY == parentY)) {
                                    continue;
                                }
                              
                                // If we've visited this cell before, we found a cycle
                                if (visited[nextX][nextY]) {
                                    return true;
                                }
                              
                                // Mark as visited and add to queue with current cell as parent
                                queue.offer(new int[] {nextX, nextY, currentX, currentY});
                                visited[nextX][nextY] = true;
                            }
                        }
                    }
                }
            }
        }
      
        return false;
    }
}
