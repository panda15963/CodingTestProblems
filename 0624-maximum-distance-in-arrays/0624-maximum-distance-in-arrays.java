class Solution {
    public int maxDistance(List<List<Integer>> arrays) {
        // Initialize the maximum distance
        int maxDist = 0;
      
        // Initialize min and max values from the first array
        // Each array is sorted, so first element is min and last element is max
        int minValue = arrays.get(0).get(0);
        int maxValue = arrays.get(0).get(arrays.get(0).size() - 1);
      
        // Iterate through remaining arrays starting from index 1
        for (int i = 1; i < arrays.size(); ++i) {
            List<Integer> currentArray = arrays.get(i);
          
            // Calculate distances:
            // Distance between current array's min and previous max
            int distanceWithMax = Math.abs(currentArray.get(0) - maxValue);
            // Distance between current array's max and previous min
            int distanceWithMin = Math.abs(currentArray.get(currentArray.size() - 1) - minValue);
          
            // Update maximum distance
            maxDist = Math.max(maxDist, Math.max(distanceWithMax, distanceWithMin));
          
            // Update global min and max values for next iteration
            minValue = Math.min(minValue, currentArray.get(0));
            maxValue = Math.max(maxValue, currentArray.get(currentArray.size() - 1));
        }
      
        return maxDist;
    }
}
