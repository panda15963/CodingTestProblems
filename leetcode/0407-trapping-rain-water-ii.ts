function trapRainWater(heightMap: number[][]): number {
    // Using a min-heap to process cells by height (lowest first)
    // Array format: [height, row, col]
    type HeightPosition = [number, number, number];
    const minHeap: HeightPosition[] = [];
  
    // Helper function to maintain min-heap property
    const heapPush = (item: HeightPosition): void => {
        minHeap.push(item);
        let currentIndex = minHeap.length - 1;
      
        // Bubble up to maintain min-heap property
        while (currentIndex > 0) {
            const parentIndex = Math.floor((currentIndex - 1) / 2);
            if (minHeap[currentIndex][0] < minHeap[parentIndex][0]) {
                [minHeap[currentIndex], minHeap[parentIndex]] = [minHeap[parentIndex], minHeap[currentIndex]];
                currentIndex = parentIndex;
            } else {
                break;
            }
        }
    };
  
    // Helper function to extract minimum element from heap
    const heapPop = (): HeightPosition => {
        const minItem = minHeap[0];
        minHeap[0] = minHeap[minHeap.length - 1];
        minHeap.pop();
      
        if (minHeap.length === 0) return minItem;
      
        // Bubble down to maintain min-heap property
        let currentIndex = 0;
        while (true) {
            let smallestIndex = currentIndex;
            const leftChild = 2 * currentIndex + 1;
            const rightChild = 2 * currentIndex + 2;
          
            if (leftChild < minHeap.length && minHeap[leftChild][0] < minHeap[smallestIndex][0]) {
                smallestIndex = leftChild;
            }
            if (rightChild < minHeap.length && minHeap[rightChild][0] < minHeap[smallestIndex][0]) {
                smallestIndex = rightChild;
            }
          
            if (smallestIndex !== currentIndex) {
                [minHeap[currentIndex], minHeap[smallestIndex]] = [minHeap[smallestIndex], minHeap[currentIndex]];
                currentIndex = smallestIndex;
            } else {
                break;
            }
        }
      
        return minItem;
    };
  
    const rows = heightMap.length;
    const cols = heightMap[0].length;
  
    // Track visited cells to avoid revisiting
    const visited: boolean[][] = Array(rows).fill(null).map(() => Array(cols).fill(false));
  
    // Add all boundary cells to the heap as starting points
    // Water can flow out from boundaries, so they determine water levels
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            if (row === 0 || row === rows - 1 || col === 0 || col === cols - 1) {
                heapPush([heightMap[row][col], row, col]);
                visited[row][col] = true;
            }
        }
    }
  
    let totalWater = 0;
  
    // Direction vectors for moving up, right, down, left
    const directions = [-1, 0, 1, 0, -1];
  
    // Process cells from lowest to highest height
    while (minHeap.length > 0) {
        // Get the cell with minimum height from the boundary
        const [currentHeight, currentRow, currentCol] = heapPop();
      
        // Check all 4 adjacent cells
        for (let dir = 0; dir < 4; dir++) {
            const nextRow = currentRow + directions[dir];
            const nextCol = currentCol + directions[dir + 1];
          
            // If the adjacent cell is valid and not visited
            if (nextRow >= 0 && nextRow < rows && 
                nextCol >= 0 && nextCol < cols && 
                !visited[nextRow][nextCol]) {
              
                // Water trapped = difference between water level and ground height
                // Water level is determined by the minimum boundary height encountered
                totalWater += Math.max(0, currentHeight - heightMap[nextRow][nextCol]);
              
                visited[nextRow][nextCol] = true;
              
                // Add the cell to heap with updated water level
                // The water level for this cell becomes the max of its height and current water level
                heapPush([Math.max(heightMap[nextRow][nextCol], currentHeight), nextRow, nextCol]);
            }
        }
    }
  
    return totalWater;
}
