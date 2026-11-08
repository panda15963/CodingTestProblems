class Solution {
    /**
     * Finds the length of the shortest continuous subarray that, if sorted,
     * would make the entire array sorted in ascending order.
     * 
     * @param nums The input integer array
     * @return The length of the shortest unsorted subarray
     */
    public int findUnsortedSubarray(int[] nums) {
        // Create a sorted copy of the original array
        int[] sortedArray = nums.clone();
        Arrays.sort(sortedArray);
      
        // Initialize left and right pointers
        int leftIndex = 0;
        int rightIndex = sortedArray.length - 1;
      
        // Find the leftmost position where elements differ
        // This marks the start of the unsorted subarray
        while (leftIndex <= rightIndex && nums[leftIndex] == sortedArray[leftIndex]) {
            leftIndex++;
        }
      
        // Find the rightmost position where elements differ
        // This marks the end of the unsorted subarray
        while (leftIndex <= rightIndex && nums[rightIndex] == sortedArray[rightIndex]) {
            rightIndex--;
        }
      
        // Calculate the length of the unsorted subarray
        // If leftIndex > rightIndex, the array is already sorted (returns 0)
        return rightIndex - leftIndex + 1;
    }
}
