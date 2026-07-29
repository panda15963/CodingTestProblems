class Solution {
    public boolean searchMatrix(int[][] matrix, int target) {
        // Get dimensions of the matrix
        int rows = matrix.length;
        int cols = matrix[0].length;

        // Initialize binary search boundaries
        int left = 0;
        int right = rows * cols - 1;
        int firstTrueIndex = -1;

        // Binary search using the template: find first index where element >= target
        while (left <= right) {
            int mid = left + (right - left) / 2;

            // Convert 1D index to 2D coordinates
            int row = mid / cols;
            int col = mid % cols;

            // Feasible condition: matrix[row][col] >= target
            if (matrix[row][col] >= target) {
                firstTrueIndex = mid;
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        }

        // Check if firstTrueIndex points to the target
        if (firstTrueIndex == -1) {
            return false;
        }
        int row = firstTrueIndex / cols;
        int col = firstTrueIndex % cols;
        return matrix[row][col] == target;
    }
}
