class Solution {
    public int getMinDistance(int[] nums, int target, int start) {
        // Get the length of the input array
        int arrayLength = nums.length;
      
        // Initialize minimum distance to the maximum possible value (array length)
        int minDistance = arrayLength;
      
        // Iterate through each element in the array
        for (int currentIndex = 0; currentIndex < arrayLength; ++currentIndex) {
            // Check if current element equals the target value
            if (nums[currentIndex] == target) {
                // Calculate distance between current index and start position
                int currentDistance = Math.abs(currentIndex - start);
              
                // Update minimum distance if current distance is smaller
                minDistance = Math.min(minDistance, currentDistance);
            }
        }
      
        // Return the minimum distance found
        return minDistance;
    }
}