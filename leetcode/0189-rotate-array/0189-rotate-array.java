class Solution {
    private int[] nums;

    /**
     * Rotates the array to the right by k steps.
     * Uses the reversal algorithm: reverse entire array, then reverse first k elements, then reverse remaining elements.
     * @param nums the array to be rotated
     * @param k the number of steps to rotate right
     */
    public void rotate(int[] nums, int k) {
        this.nums = nums;
        int n = nums.length;
      
        // Handle cases where k is greater than array length
        k = k % n;
      
        // Step 1: Reverse the entire array
        reverse(0, n - 1);
      
        // Step 2: Reverse the first k elements
        reverse(0, k - 1);
      
        // Step 3: Reverse the remaining elements from k to end
        reverse(k, n - 1);
    }

    /**
     * Helper method to reverse elements in the array between indices i and j (inclusive).
     * @param i starting index
     * @param j ending index
     */
    private void reverse(int i, int j) {
        // Swap elements from both ends moving towards the center
        while (i < j) {
            // Swap elements at positions i and j
            int temp = nums[i];
            nums[i] = nums[j];
            nums[j] = temp;
          
            // Move pointers towards center
            i++;
            j--;
        }
    }
}
