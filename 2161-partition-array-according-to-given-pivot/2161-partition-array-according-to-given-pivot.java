class Solution {
    /**
     * Rearranges the array such that every element less than pivot appears before 
     * all elements equal to pivot, and every element greater than pivot appears after.
     * The relative order of elements in each group is preserved.
     * 
     * @param nums  The input array to be rearranged
     * @param pivot The pivot value used for partitioning
     * @return      A new array with elements rearranged around the pivot
     */
    public int[] pivotArray(int[] nums, int pivot) {
        // Get the length of the input array
        int n = nums.length;
      
        // Create a result array of the same size
        int[] result = new int[n];
      
        // Index pointer for placing elements in the result array
        int index = 0;
      
        // First pass: Place all elements less than pivot
        for (int num : nums) {
            if (num < pivot) {
                result[index++] = num;
            }
        }
      
        // Second pass: Place all elements equal to pivot
        for (int num : nums) {
            if (num == pivot) {
                result[index++] = num;
            }
        }
      
        // Third pass: Place all elements greater than pivot
        for (int num : nums) {
            if (num > pivot) {
                result[index++] = num;
            }
        }
      
        return result;
    }
}