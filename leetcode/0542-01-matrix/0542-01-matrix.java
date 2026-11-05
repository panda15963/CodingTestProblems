class Solution {
    public int[][] updateMatrix(int[][] mat) {
        // Get matrix dimensions
        int rows = mat.length;
        int cols = mat[0].length;
      
        // Initialize result matrix with -1 (unvisited marker)
        int[][] distances = new int[rows][cols];
        for (int[] row : distances) {
            Arrays.fill(row, -1);
        }
      
        // Initialize BFS queue
        Deque<int[]> queue = new ArrayDeque<>();
      
        // Add all cells with 0 to the queue as starting points
        // These cells have distance 0 to the nearest 0
        for (int row = 0; row < rows; row++) {
            for (int col = 0; col < cols; col++) {
                if (mat[row][col] == 0) {
                    queue.offer(new int[] {row, col});
                    distances[row][col] = 0;
                }
            }
        }
      
        // Direction vectors for moving up, right, down, left
        // Using a compact representation: dirs[i] and dirs[i+1] form a direction pair
        int[] directions = {-1, 0, 1, 0, -1};
      
        // Perform multi-source BFS
        while (!queue.isEmpty()) {
            // Get current cell coordinates
            int[] currentCell = queue.poll();
            int currentRow = currentCell[0];
            int currentCol = currentCell[1];
          
            // Explore all 4 adjacent cells
            for (int dir = 0; dir < 4; dir++) {
                int nextRow = currentRow + directions[dir];
                int nextCol = currentCol + directions[dir + 1];
              
                // Check if the adjacent cell is valid and unvisited
                if (nextRow >= 0 && nextRow < rows && 
                    nextCol >= 0 && nextCol < cols && 
                    distances[nextRow][nextCol] == -1) {
                  
                    // Update distance for the adjacent cell
                    distances[nextRow][nextCol] = distances[currentRow][currentCol] + 1;
                  
                    // Add the adjacent cell to queue for further exploration
                    queue.offer(new int[] {nextRow, nextCol});
                }
            }
        }
      
        return distances;
    }
}
