class Solution {
    /**
     * Finds the smallest missing positive integer in an unsorted array.
     * Uses cyclic sort to place each positive number at its corresponding index.
     * Time Complexity: O(n), Space Complexity: O(1)
     * 
     * @param nums the input array
     * @return the smallest missing positive integer
     */
    public int firstMissingPositive(int[] nums) {
        int arrayLength = nums.length;
      
        // Phase 1: Place each positive number at its correct position
        // For a number k where 1 <= k <= n, place it at index k-1
        for (int currentIndex = 0; currentIndex < arrayLength; currentIndex++) {
            // Keep swapping while:
            // 1. Current number is positive
            // 2. Current number is within valid range [1, n]
            // 3. Current number is not already at its correct position
            while (nums[currentIndex] > 0 && 
                   nums[currentIndex] <= arrayLength && 
                   nums[currentIndex] != nums[nums[currentIndex] - 1]) {
                // Swap current number to its correct position
                int targetIndex = nums[currentIndex] - 1;
                swap(nums, currentIndex, targetIndex);
            }
        }
      
        // Phase 2: Find the first position where number doesn't match index + 1
        for (int index = 0; index < arrayLength; index++) {
            if (nums[index] != index + 1) {
                // The missing positive is index + 1
                return index + 1;
            }
        }
      
        // All numbers from 1 to n are present, so the answer is n + 1
        return arrayLength + 1;
    }
  
    /**
     * Helper method to swap two elements in the array
     * 
     * @param nums the array
     * @param firstIndex index of the first element
     * @param secondIndex index of the second element
     */
    private void swap(int[] nums, int firstIndex, int secondIndex) {
        int temp = nums[firstIndex];
        nums[firstIndex] = nums[secondIndex];
        nums[secondIndex] = temp;
    }
}
