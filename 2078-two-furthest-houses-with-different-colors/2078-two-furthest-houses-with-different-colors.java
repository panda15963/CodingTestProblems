class Solution {
    /**
     * Finds the maximum distance between two houses with different colors.
     * Distance is defined as the absolute difference between their indices.
     * 
     * @param colors Array where colors[i] represents the color of house i
     * @return Maximum distance between two houses with different colors
     */
    public int maxDistance(int[] colors) {
        int maxDist = 0;
        int arrayLength = colors.length;
      
        // Check all pairs of houses
        for (int leftIndex = 0; leftIndex < arrayLength; ++leftIndex) {
            for (int rightIndex = leftIndex + 1; rightIndex < arrayLength; ++rightIndex) {
                // If houses have different colors, update maximum distance
                if (colors[leftIndex] != colors[rightIndex]) {
                    int currentDistance = Math.abs(leftIndex - rightIndex);
                    maxDist = Math.max(maxDist, currentDistance);
                }
            }
        }
      
        return maxDist;
    }
}