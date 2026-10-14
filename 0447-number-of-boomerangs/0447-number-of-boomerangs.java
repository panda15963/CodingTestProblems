class Solution {
    public int numberOfBoomerangs(int[][] points) {
        int totalBoomerangs = 0;
      
        // For each point, treat it as the middle point of potential boomerangs
        for (int[] centerPoint : points) {
            // Map to store distance -> count of points at that distance
            Map<Integer, Integer> distanceCount = new HashMap<>();
          
            // Calculate distance from center point to all other points
            for (int[] targetPoint : points) {
                // Calculate squared Euclidean distance (no need for square root since we only compare)
                int squaredDistance = (centerPoint[0] - targetPoint[0]) * (centerPoint[0] - targetPoint[0]) + 
                                     (centerPoint[1] - targetPoint[1]) * (centerPoint[1] - targetPoint[1]);
              
                // If we've seen this distance before, we can form new boomerangs
                // with the current point and all previous points at the same distance
                totalBoomerangs += distanceCount.getOrDefault(squaredDistance, 0);
              
                // Update the count for this distance
                distanceCount.merge(squaredDistance, 1, Integer::sum);
            }
        }
      
        // Multiply by 2 because for each valid triplet (i, j, k), 
        // we can also form (i, k, j) as another valid boomerang
        return totalBoomerangs << 1;
    }
}
