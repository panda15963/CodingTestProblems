class Solution {
    public int arrayNesting(int[] nums) {
        int arrayLength = nums.length;
        boolean[] visited = new boolean[arrayLength];
        int maxCycleLength = 0;
      
        // Check each index as a potential starting point for a cycle
        for (int startIndex = 0; startIndex < arrayLength; startIndex++) {
            // Skip if this index is already part of a previously found cycle
            if (visited[startIndex]) {
                continue;
            }
          
            // Start exploring the cycle from current index
            int currentIndex = nums[startIndex];
            int currentCycleLength = 1;
            visited[currentIndex] = true;
          
            // Follow the chain until we return to the starting element
            while (nums[currentIndex] != nums[startIndex]) {
                currentIndex = nums[currentIndex];  // Move to next index in the cycle
                currentCycleLength++;
                visited[currentIndex] = true;  // Mark as visited
            }
          
            // Update maximum cycle length found so far
            maxCycleLength = Math.max(maxCycleLength, currentCycleLength);
        }
      
        return maxCycleLength;
    }
}
