class Solution {
    // Instance variables for array dimensions and memoization
    private int arrayLength;
    private int maxDistance;
    private int[] heights;
    private Integer[] memo;  // Memoization array to store computed results

    /**
     * Finds the maximum number of indices you can visit in the array.
     * You can jump from index i to index j if:
     * 1. i != j
     * 2. |i - j| <= d
     * 3. All elements between i and j are strictly less than arr[i]
     * 
     * @param arr Array of heights
     * @param d Maximum jump distance
     * @return Maximum number of indices that can be visited
     */
    public int maxJumps(int[] arr, int d) {
        // Initialize instance variables
        arrayLength = arr.length;
        this.maxDistance = d;
        this.heights = arr;
        memo = new Integer[arrayLength];
      
        int maxVisited = 1;
      
        // Try starting from each index and find the maximum path
        for (int startIndex = 0; startIndex < arrayLength; startIndex++) {
            maxVisited = Math.max(maxVisited, dfs(startIndex));
        }
      
        return maxVisited;
    }

    /**
     * Depth-first search to find the maximum number of jumps from index i.
     * Uses memoization to avoid recomputation.
     * 
     * @param currentIndex Current position in the array
     * @return Maximum number of indices reachable from currentIndex (including itself)
     */
    private int dfs(int currentIndex) {
        // Return cached result if already computed
        if (memo[currentIndex] != null) {
            return memo[currentIndex];
        }
      
        // Start with 1 (current position counts as visited)
        int maxJumpsFromHere = 1;
      
        // Try jumping to the left
        for (int targetIndex = currentIndex - 1; targetIndex >= 0; targetIndex--) {
            // Stop if distance exceeds limit or target is not lower
            if (currentIndex - targetIndex > maxDistance || heights[targetIndex] >= heights[currentIndex]) {
                break;
            }
            // Update maximum if jumping to targetIndex yields better result
            maxJumpsFromHere = Math.max(maxJumpsFromHere, 1 + dfs(targetIndex));
        }
      
        // Try jumping to the right
        for (int targetIndex = currentIndex + 1; targetIndex < arrayLength; targetIndex++) {
            // Stop if distance exceeds limit or target is not lower
            if (targetIndex - currentIndex > maxDistance || heights[targetIndex] >= heights[currentIndex]) {
                break;
            }
            // Update maximum if jumping to targetIndex yields better result
            maxJumpsFromHere = Math.max(maxJumpsFromHere, 1 + dfs(targetIndex));
        }
      
        // Cache and return the result
        memo[currentIndex] = maxJumpsFromHere;
        return maxJumpsFromHere;
    }
}