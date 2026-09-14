class NumArray {
    // Prefix sum array where prefixSum[i] stores sum of elements from index 0 to i-1
    private int[] prefixSum;

    /**
     * Constructor initializes the prefix sum array
     * @param nums Input array of integers
     */
    public NumArray(int[] nums) {
        int length = nums.length;
      
        // Create prefix sum array with size n+1 for easier calculation
        // prefixSum[0] = 0, prefixSum[i] = sum of nums[0] to nums[i-1]
        prefixSum = new int[length + 1];
      
        // Build prefix sum array
        for (int i = 0; i < length; i++) {
            prefixSum[i + 1] = prefixSum[i] + nums[i];
        }
    }

    /**
     * Returns the sum of elements between indices left and right (inclusive)
     * @param left Starting index (inclusive)
     * @param right Ending index (inclusive)
     * @return Sum of elements from nums[left] to nums[right]
     */
    public int sumRange(int left, int right) {
        // Sum from left to right = prefixSum[right+1] - prefixSum[left]
        // This works because prefixSum[right+1] contains sum up to index right
        // and prefixSum[left] contains sum up to index left-1
        return prefixSum[right + 1] - prefixSum[left];
    }
}

/**
 * Your NumArray object will be instantiated and called as such:
 * NumArray obj = new NumArray(nums);
 * int param_1 = obj.sumRange(left,right);
 */
