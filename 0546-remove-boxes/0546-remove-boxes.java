class Solution {
    // Memoization table: dp[left][right][extraBoxes] stores the maximum points
    // for boxes[left...right] with extraBoxes same-colored boxes to the right
    private int[][][] dp;
    private int[] boxes;

    public int removeBoxes(int[] boxes) {
        this.boxes = boxes;
        int n = boxes.length;
        dp = new int[n][n][n];
        return calculateMaxPoints(0, n - 1, 0);
    }

    /**
     * Calculate maximum points for removing boxes in range [left, right]
     * @param left - left boundary of the range
     * @param right - right boundary of the range
     * @param extraCount - number of boxes to the right of position 'right' (outside
     *                     the current range [left, right]) that share the same color
     *                     as boxes[right] and will be merged with it when removed
     * @return maximum points achievable
     */
    private int calculateMaxPoints(int left, int right, int extraCount) {
        // Base case: no boxes in range
        if (left > right) {
            return 0;
        }
      
        // Optimization: merge consecutive same-colored boxes at the right end
        // This reduces redundant calculations
        while (left < right && boxes[right] == boxes[right - 1]) {
            right--;
            extraCount++;
        }
      
        // Return memoized result if already calculated
        if (dp[left][right][extraCount] > 0) {
            return dp[left][right][extraCount];
        }
      
        // Option 1: Remove all boxes at the right end together
        // Remove boxes[right] along with extraCount same-colored boxes
        int maxPoints = calculateMaxPoints(left, right - 1, 0) + 
                        (extraCount + 1) * (extraCount + 1);
      
        // Option 2: Look for boxes with same color as boxes[right] in the range
        // and try to merge them before removal
        for (int mid = left; mid < right; mid++) {
            if (boxes[mid] == boxes[right]) {
                // Remove boxes between mid and right first,
                // then merge boxes[mid] with boxes[right] and extra boxes
                int points = calculateMaxPoints(mid + 1, right - 1, 0) + 
                            calculateMaxPoints(left, mid, extraCount + 1);
                maxPoints = Math.max(maxPoints, points);
            }
        }
      
        // Memoize and return the result
        dp[left][right][extraCount] = maxPoints;
        return maxPoints;
    }
}
