class Solution {
    /**
     * Finds the largest rectangle containing only 1's in a binary matrix.
     * Uses dynamic programming to build histogram heights for each row,
     * then finds the largest rectangle in each histogram.
     * 
     * @param matrix 2D char array containing '0's and '1's
     * @return area of the largest rectangle containing only 1's
     */
    public int maximalRectangle(char[][] matrix) {
        int numCols = matrix[0].length;
        // Heights array represents histogram heights at current row
        int[] heights = new int[numCols];
        int maxArea = 0;
      
        // Process each row to build cumulative histogram
        for (char[] currentRow : matrix) {
            for (int col = 0; col < numCols; col++) {
                if (currentRow[col] == '1') {
                    // Increment height if current cell is '1'
                    heights[col] += 1;
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
  
    /**
     * Calculates the largest rectangle area in a histogram.
     * Uses monotonic stack to find left and right boundaries for each bar.
     * 
     * @param heights array representing histogram bar heights
     * @return area of the largest rectangle in the histogram
     */
    private int largestRectangleArea(int[] heights) {
        int maxArea = 0;
        int n = heights.length;
        Deque<Integer> stack = new ArrayDeque<>();
      
        // Arrays to store left and right boundaries for each bar
        int[] leftBoundary = new int[n];   // Index of nearest smaller element on left
        int[] rightBoundary = new int[n];  // Index of nearest smaller element on right
      
        // Initialize right boundaries to n (beyond last index)
        Arrays.fill(rightBoundary, n);
      
        // Single pass to find both left and right boundaries
        for (int i = 0; i < n; i++) {
            // Pop elements from stack that are >= current height
            // These elements have found their right boundary (current index)
            while (!stack.isEmpty() && heights[stack.peek()] >= heights[i]) {
                rightBoundary[stack.pop()] = i;
            }
          
            // Set left boundary for current element
            leftBoundary[i] = stack.isEmpty() ? -1 : stack.peek();
          
            // Push current index to stack
            stack.push(i);
        }
      
        // Calculate maximum rectangle area for each bar as height
        for (int i = 0; i < n; i++) {
            // Width = rightBoundary - leftBoundary - 1
            // Area = height * width
            int width = rightBoundary[i] - leftBoundary[i] - 1;
            int area = heights[i] * width;
            maxArea = Math.max(maxArea, area);
        }
      
        return maxArea;
    }
}
