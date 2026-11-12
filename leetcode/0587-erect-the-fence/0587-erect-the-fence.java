class Solution {
    /**
     * Finds the convex hull of given points using Andrew's Monotone Chain algorithm.
     * The convex hull is the smallest convex polygon that contains all points.
     * 
     * @param trees 2D array where each element represents a point [x, y]
     * @return Array of points that form the convex hull
     */
    public int[][] outerTrees(int[][] trees) {
        int n = trees.length;
      
        // If less than 4 points, all points are on the convex hull
        if (n < 4) {
            return trees;
        }
      
        // Sort points lexicographically (first by x-coordinate, then by y-coordinate)
        Arrays.sort(trees, (point1, point2) -> {
            return point1[0] == point2[0] ? point1[1] - point2[1] : point1[0] - point2[0];
        });
      
        // Track which points are already included in the hull
        boolean[] visited = new boolean[n];
      
        // Stack to store indices of points in the convex hull
        int[] stack = new int[n + 10];
        int stackSize = 1;  // Start with the first point (index 0)
      
        // Build lower hull (left to right)
        for (int i = 1; i < n; ++i) {
            // Remove points that make a clockwise turn (negative cross product)
            while (stackSize > 1 && 
                   crossProduct(trees[stack[stackSize - 1]], 
                               trees[stack[stackSize - 2]], 
                               trees[i]) < 0) {
                visited[stack[--stackSize]] = false;
            }
            visited[i] = true;
            stack[stackSize++] = i;
        }
      
        // Mark the size of lower hull
        int lowerHullSize = stackSize;
      
        // Build upper hull (right to left)
        for (int i = n - 1; i >= 0; --i) {
            // Skip points already in lower hull
            if (visited[i]) {
                continue;
            }
          
            // Remove points that make a clockwise turn (negative cross product)
            while (stackSize > lowerHullSize && 
                   crossProduct(trees[stack[stackSize - 1]], 
                               trees[stack[stackSize - 2]], 
                               trees[i]) < 0) {
                --stackSize;
            }
            stack[stackSize++] = i;
        }
      
        // Convert stack indices to actual points
        // Exclude last point as it's duplicate of the first point
        int[][] result = new int[stackSize - 1][2];
        for (int i = 0; i < result.length; ++i) {
            result[i] = trees[stack[i]];
        }
      
        return result;
    }
  
    /**
     * Calculates the cross product of vectors BA and BC.
     * Positive value indicates counter-clockwise turn.
     * Negative value indicates clockwise turn.
     * Zero indicates collinear points.
     * 
     * @param a Point A
     * @param b Point B
     * @param c Point C
     * @return Cross product value
     */
    private int crossProduct(int[] a, int[] b, int[] c) {
        return (b[0] - a[0]) * (c[1] - b[1]) - (b[1] - a[1]) * (c[0] - b[0]);
    }
}
