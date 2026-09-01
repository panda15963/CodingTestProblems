class Solution {
    public List<List<Integer>> getSkyline(int[][] buildings) {
        // Collect all unique x-coordinates (building starts and ends)
        Set<Integer> uniquePositions = new TreeSet<>();
        for (int[] building : buildings) {
            uniquePositions.add(building[0]);  // left edge
            uniquePositions.add(building[1]);  // right edge
        }
      
        // Create a mapping from x-coordinate to compressed index
        Map<Integer, Integer> positionToIndex = new HashMap<>();
        int index = 0;
        for (int position : uniquePositions) {
            positionToIndex.put(position, index++);
        }
      
        // Track the maximum height at each compressed position
        int[] maxHeights = new int[positionToIndex.size()];
        for (int[] building : buildings) {
            int leftIndex = positionToIndex.get(building[0]);
            int rightIndex = positionToIndex.get(building[1]);
            int height = building[2];
          
            // Update heights for all positions covered by this building
            for (int i = leftIndex; i < rightIndex; i++) {
                maxHeights[i] = Math.max(maxHeights[i], height);
            }
        }
      
        // Convert compressed positions back to actual x-coordinates
        List<Integer> sortedPositions = new ArrayList<>(uniquePositions);
      
        // Build the skyline by finding height changes
        List<List<Integer>> skyline = new ArrayList<>();
        int previousHeight = 0;
      
        for (int i = 0; i < maxHeights.length; i++) {
            // Check if height changes from previous
            if (maxHeights[i] != previousHeight) {
                // Add key point when height changes
                skyline.add(Arrays.asList(sortedPositions.get(i), maxHeights[i]));
                previousHeight = maxHeights[i];
            }
        }
      
        // Add final point if the last building doesn't extend to the end
        if (previousHeight != 0) {
            skyline.add(Arrays.asList(sortedPositions.get(sortedPositions.size() - 1), 0));
        }
      
        return skyline;
    }
}
