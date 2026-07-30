function maximalRectangle(matrix: string[][]): number {
    const numCols = matrix[0].length;
    const heights: number[] = new Array(numCols).fill(0);  // Heights array for histogram calculation
    let maxArea = 0;
  
    // Process each row to build histogram heights
    for (const row of matrix) {
        for (let col = 0; col < numCols; col++) {
            if (row[col] === '1') {
                // Increment height if current cell is '1'
                heights[col]++;
            } else {
                // Reset height to 0 if current cell is '0'
                heights[col] = 0;
            }
        }
        // Calculate max rectangle area for current histogram
        maxArea = Math.max(maxArea, largestRectangleArea(heights));
    }
  
    return maxArea;
}

function largestRectangleArea(heights: number[]): number {
    let maxArea = 0;
    const n = heights.length;
    const indexStack: number[] = [];  // Stack to store indices of histogram bars
  
    // Arrays to store the nearest smaller element indices
    const leftBoundary: number[] = new Array(n).fill(-1);   // Index of nearest smaller element on left
    const rightBoundary: number[] = new Array(n).fill(n);    // Index of nearest smaller element on right
  
    // Single pass to find both left and right boundaries
    for (let i = 0; i < n; i++) {
        // Pop elements from stack that are greater than or equal to current height
        while (indexStack.length > 0 && heights[indexStack[indexStack.length - 1]] >= heights[i]) {
            // Current index i is the right boundary for the popped element
            const poppedIndex = indexStack.pop()!;
            rightBoundary[poppedIndex] = i;
        }
      
        // If stack is not empty, top element is the left boundary for current element
        if (indexStack.length > 0) {
            leftBoundary[i] = indexStack[indexStack.length - 1];
        }
      
        indexStack.push(i);
    }
  
    // Calculate maximum area using the boundaries
    for (let i = 0; i < n; i++) {
        // Width = rightBoundary - leftBoundary - 1
        // Area = height * width
        const width = rightBoundary[i] - leftBoundary[i] - 1;
        const area = heights[i] * width;
        maxArea = Math.max(maxArea, area);
    }
  
    return maxArea;
}
