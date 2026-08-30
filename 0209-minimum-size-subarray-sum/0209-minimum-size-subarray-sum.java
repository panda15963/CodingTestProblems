class Solution {
    /**
     * Find the minimal length of a contiguous subarray whose sum is >= target.
     * Uses prefix sum array and binary search template.
     *
     * @param target the target sum to achieve or exceed
     * @param nums the input array of positive integers
     * @return the minimal length of subarray, or 0 if no such subarray exists
     */
    public int minSubArrayLen(int target, int[] nums) {
        int n = nums.length;

        // Build prefix sum array where prefixSum[i] = sum of nums[0...i-1]
        long[] prefixSum = new long[n + 1];
        for (int i = 0; i < n; i++) {
            prefixSum[i + 1] = prefixSum[i] + nums[i];
        }

        // Initialize answer to impossible value (n + 1)
        int minLength = n + 1;

        // For each starting position i, find the smallest ending position j
        // such that sum of nums[i...j-1] >= target
        for (int i = 0; i <= n; i++) {
            // Binary search template to find first j where prefixSum[j] >= prefixSum[i] + target
            int left = i;
            int right = n;
            int firstTrueIndex = -1;

            while (left <= right) {
                int mid = left + (right - left) / 2;
                if (prefixSum[mid] >= prefixSum[i] + target) {
                    firstTrueIndex = mid;
                    right = mid - 1;
                } else {
                    left = mid + 1;
                }
            }

            // If valid position found, update minimum length
            if (firstTrueIndex != -1) {
                minLength = Math.min(minLength, firstTrueIndex - i);
            }
        }

        // Return the result, or 0 if no valid subarray found
        return minLength <= n ? minLength : 0;
    }
}
