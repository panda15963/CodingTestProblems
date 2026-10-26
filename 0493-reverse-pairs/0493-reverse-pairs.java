class Solution {
    private int[] nums;
    private int[] tempArray;  // Temporary array for merge operation

    /**
     * Counts the number of reverse pairs in the array.
     * A reverse pair is defined as (i, j) where i < j and nums[i] > 2 * nums[j].
     * 
     * @param nums Input array
     * @return Number of reverse pairs
     */
    public int reversePairs(int[] nums) {
        this.nums = nums;
        int length = nums.length;
        this.tempArray = new int[length];
      
        // Perform merge sort and count reverse pairs simultaneously
        return mergeSort(0, length - 1);
    }

    /**
     * Recursive merge sort that counts reverse pairs.
     * 
     * @param left Left boundary index (inclusive)
     * @param right Right boundary index (inclusive)
     * @return Number of reverse pairs in the range [left, right]
     */
    private int mergeSort(int left, int right) {
        // Base case: single element or invalid range
        if (left >= right) {
            return 0;
        }
      
        // Calculate middle point
        int mid = (left + right) >> 1;
      
        // Recursively count reverse pairs in left and right halves
        int reversePairCount = mergeSort(left, mid) + mergeSort(mid + 1, right);
      
        // Count reverse pairs between left and right halves
        // Using two pointers to find pairs where nums[i] > 2 * nums[j]
        int i = left;
        int j = mid + 1;
        while (i <= mid && j <= right) {
            // Use long to avoid integer overflow when multiplying by 2
            if (nums[i] <= nums[j] * 2L) {
                i++;
            } else {
                // All elements from i to mid form reverse pairs with nums[j]
                reversePairCount += mid - i + 1;
                j++;
            }
        }
      
        // Merge the two sorted halves
        i = left;
        j = mid + 1;
        int tempIndex = 0;
      
        // Merge elements in sorted order
        while (i <= mid && j <= right) {
            if (nums[i] <= nums[j]) {
                tempArray[tempIndex++] = nums[i++];
            } else {
                tempArray[tempIndex++] = nums[j++];
            }
        }
      
        // Copy remaining elements from left half
        while (i <= mid) {
            tempArray[tempIndex++] = nums[i++];
        }
      
        // Copy remaining elements from right half
        while (j <= right) {
            tempArray[tempIndex++] = nums[j++];
        }
      
        // Copy merged elements back to original array
        for (i = left; i <= right; i++) {
            nums[i] = tempArray[i - left];
        }
      
        return reversePairCount;
    }
}
