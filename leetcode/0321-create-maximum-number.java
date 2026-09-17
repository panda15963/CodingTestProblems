class Solution {
    /**
     * Create maximum number of length k from two arrays
     * @param nums1 First input array
     * @param nums2 Second input array
     * @param k Target length of result array
     * @return Maximum possible number of length k
     */
    public int[] maxNumber(int[] nums1, int[] nums2, int k) {
        int m = nums1.length;
        int n = nums2.length;
      
        // Calculate minimum and maximum possible elements to take from nums1
        // We need at least (k - n) from nums1 if nums2 doesn't have enough elements
        // We can take at most min(k, m) from nums1
        int minFromNums1 = Math.max(0, k - n);
        int maxFromNums1 = Math.min(k, m);
      
        int[] result = new int[k];
      
        // Try all possible combinations of taking x elements from nums1 and (k-x) from nums2
        for (int countFromNums1 = minFromNums1; countFromNums1 <= maxFromNums1; ++countFromNums1) {
            // Get maximum subsequence of length countFromNums1 from nums1
            int[] maxSubseq1 = f(nums1, countFromNums1);
            // Get maximum subsequence of length (k - countFromNums1) from nums2
            int[] maxSubseq2 = f(nums2, k - countFromNums1);
            // Merge the two subsequences to form maximum number
            int[] mergedArray = merge(maxSubseq1, maxSubseq2);
          
            // Update result if current merged array is greater
            if (compare(mergedArray, result, 0, 0)) {
                result = mergedArray;
            }
        }
      
        return result;
    }

    /**
     * Find maximum subsequence of length k from given array using monotonic stack
     * @param nums Input array
     * @param k Target subsequence length
     * @return Maximum subsequence of length k
     */
    private int[] f(int[] nums, int k) {
        int n = nums.length;
        int[] stack = new int[k];
        int top = -1;  // Stack pointer (index of top element)
        int remainingToDiscard = n - k;  // Number of elements we can still discard
      
        for (int num : nums) {
            // Pop smaller elements from stack if we can still discard elements
            while (top >= 0 && stack[top] < num && remainingToDiscard > 0) {
                --top;
                --remainingToDiscard;
            }
          
            // Push current element if stack is not full
            if (top + 1 < k) {
                stack[++top] = num;
            } else {
                // If stack is full, we discard current element
                --remainingToDiscard;
            }
        }
      
        return stack;
    }

    /**
     * Merge two arrays to create maximum possible number
     * @param nums1 First array
     * @param nums2 Second array
     * @return Merged array forming maximum number
     */
    private int[] merge(int[] nums1, int[] nums2) {
        int m = nums1.length;
        int n = nums2.length;
        int i = 0;  // Pointer for nums1
        int j = 0;  // Pointer for nums2
        int[] mergedResult = new int[m + n];
      
        // Merge arrays by always choosing the larger element
        for (int k = 0; k < m + n; ++k) {
            if (compare(nums1, nums2, i, j)) {
                mergedResult[k] = nums1[i++];
            } else {
                mergedResult[k] = nums2[j++];
            }
        }
      
        return mergedResult;
    }

    /**
     * Compare two arrays lexicographically starting from given indices
     * @param nums1 First array
     * @param nums2 Second array
     * @param i Starting index in nums1
     * @param j Starting index in nums2
     * @return true if nums1[i:] >= nums2[j:], false otherwise
     */
    private boolean compare(int[] nums1, int[] nums2, int i, int j) {
        // If nums1 is exhausted, nums2 is greater or equal
        if (i >= nums1.length) {
            return false;
        }
        // If nums2 is exhausted, nums1 is greater
        if (j >= nums2.length) {
            return true;
        }
        // Compare current elements
        if (nums1[i] > nums2[j]) {
            return true;
        }
        if (nums1[i] < nums2[j]) {
            return false;
        }
        // If equal, recursively compare remaining elements
        return compare(nums1, nums2, i + 1, j + 1);
    }
}
