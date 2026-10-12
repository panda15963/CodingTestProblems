class Solution {
    /**
     * Finds the right interval for each interval in the given array.
     * The right interval for interval i is the interval j with the smallest start point
     * that is greater than or equal to the end point of interval i.
     * 
     * @param intervals 2D array where each element is [start, end] representing an interval
     * @return array where result[i] is the index of the right interval for intervals[i], or -1 if none exists
     */
    public int[] findRightInterval(int[][] intervals) {
        int n = intervals.length;
      
        // Create array to store start points with their original indices
        // Each element is [startPoint, originalIndex]
        int[][] startPointsWithIndex = new int[n][2];
        for (int i = 0; i < n; i++) {
            startPointsWithIndex[i] = new int[] {intervals[i][0], i};
        }
      
        // Sort by start points in ascending order
        Arrays.sort(startPointsWithIndex, (a, b) -> a[0] - b[0]);
      
        // Build result array
        int[] result = new int[n];
        for (int i = 0; i < n; i++) {
            // For each interval, find the smallest start point >= current interval's end point
            int endPoint = intervals[i][1];
            int index = binarySearchStartPoint(startPointsWithIndex, endPoint);
          
            // If valid index found, get the original index; otherwise, set to -1
            result[i] = (index < n) ? startPointsWithIndex[index][1] : -1;
        }
      
        return result;
    }
  
    /**
     * Binary search to find the leftmost position where start point >= target value.
     * 
     * @param startPointsWithIndex sorted array of [startPoint, originalIndex] pairs
     * @param targetValue the value to search for (end point of an interval)
     * @return index of the first element with start point >= targetValue, or array length if none exists
     */
    private int binarySearchStartPoint(int[][] startPointsWithIndex, int targetValue) {
        int left = 0;
        int right = startPointsWithIndex.length;
      
        // Binary search for leftmost position where startPoint >= targetValue
        while (left < right) {
            int mid = (left + right) >> 1;  // Equivalent to (left + right) / 2
          
            if (startPointsWithIndex[mid][0] >= targetValue) {
                // Found a valid start point, but check if there's a smaller valid one
                right = mid;
            } else {
                // Current start point is too small, search in the right half
                left = mid + 1;
            }
        }
      
        return left;
    }
}
