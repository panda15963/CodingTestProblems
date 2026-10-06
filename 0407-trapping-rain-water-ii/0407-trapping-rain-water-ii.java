class Solution {
    public int trapRainWater(int[][] heightMap) {
        // Get dimensions of the height map
        int rows = heightMap.length;
        int cols = heightMap[0].length;
      
        // Track visited cells to avoid processing them multiple times
        boolean[][] visited = new boolean[rows][cols];
      
        // Min heap to process cells by height (lowest first)
        // Each element: [height, row, col]
        PriorityQueue<int[]> minHeap = new PriorityQueue<>((a, b) -> a[0] - b[0]);
      
        // Add all boundary cells to the priority queue as starting points
        // These cells cannot trap water as they are on the edges
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                if (i == 0 || i == rows - 1 || j == 0 || j == cols - 1) {
                    minHeap.offer(new int[] {heightMap[i][j], i, j});
                    visited[i][j] = true;
                }
            }
        }
      
        // Initialize result to store total trapped water
        int totalWater = 0;
      
        // Direction vectors for moving up, right, down, left
        int[] directions = {-1, 0, 1, 0, -1};
      
        // Process cells from lowest height to highest (water flows from high to low)
        while (!minHeap.isEmpty()) {
            int[] current = minHeap.poll();
            int currentHeight = current[0];
            int currentRow = current[1];
            int currentCol = current[2];
          
            // Check all 4 adjacent cells
            for (int k = 0; k < 4; k++) {
                int nextRow = currentRow + directions[k];
                int nextCol = currentCol + directions[k + 1];
              
                // Check if the adjacent cell is within bounds and unvisited
                if (nextRow >= 0 && nextRow < rows && 
                    nextCol >= 0 && nextCol < cols && 
                    !visited[nextRow][nextCol]) {
                  
                    // Calculate water trapped at this cell
                    // Water level is determined by the minimum boundary height encountered so far
                    totalWater += Math.max(0, currentHeight - heightMap[nextRow][nextCol]);
                  
                    // Mark cell as visited
                    visited[nextRow][nextCol] = true;
                  
                    // Add cell to queue with updated height (max of current water level and cell height)
                    // This ensures water level never decreases as we move inward
                    minHeap.offer(new int[] {
                        Math.max(currentHeight, heightMap[nextRow][nextCol]), 
                        nextRow, 
                        nextCol
                    });
                }
            }
        }
      
        return totalWater;
    }
}
