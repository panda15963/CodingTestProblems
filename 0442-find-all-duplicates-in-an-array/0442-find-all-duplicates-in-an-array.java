class Solution {
    /**
     * Finds all duplicate numbers in an array where 1 ≤ nums[i] ≤ n (n = size of array).
     * Uses cyclic sort to place each number at its corresponding index (number i at index i-1).
     * 
     * @param nums Input array containing integers from 1 to n
     * @return List of integers that appear twice in the array
     */
    public List<Integer> findDuplicates(int[] nums) {
        int n = nums.length;
      
        // Phase 1: Cyclic sort - Place each number at its correct position
        // For each position, keep swapping until the current number is at its correct index
        for (int i = 0; i < n; i++) {
            // Keep swapping while:
            // - Current number is not at its correct position (nums[i] should be at index nums[i] - 1)
            // - The target position doesn't already have the correct number
            while (nums[i] != nums[nums[i] - 1]) {
                swap(nums, i, nums[i] - 1);
            }
        }
      
        // Phase 2: Identify duplicates
        // After sorting, if nums[i] != i + 1, then nums[i] is a duplicate
        List<Integer> duplicateNumbers = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            // If the number at index i is not i + 1, it means this number is a duplicate
            // (The original number i + 1 was replaced by a duplicate)
            if (nums[i] != i + 1) {
                duplicateNumbers.add(nums[i]);
            }
        }
      
        return duplicateNumbers;
    }
  
    /**
     * Swaps two elements in the array.
     * 
     * @param nums The array containing elements to swap
     * @param i Index of the first element
     * @param j Index of the second element
     */
    private void swap(int[] nums, int i, int j) {
        int temp = nums[i];
        nums[i] = nums[j];
        nums[j] = temp;
    }
}
