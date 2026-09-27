class Solution {
    public int splitArray(int[] nums, int k) {
        // Initialize binary search bounds
        int left = 0;
        int right = 0;

        for (int num : nums) {
            left = Math.max(left, num);
            right += num;
        }

        int firstTrueIndex = -1;

        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (feasible(nums, mid, k)) {
                firstTrueIndex = mid;
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        }

        return firstTrueIndex;
    }

    private boolean feasible(int[] nums, int maxSum, int k) {
        int currentSum = 0;
        int subarrayCount = 1;

        for (int num : nums) {
            if (currentSum + num > maxSum) {
                currentSum = num;
                subarrayCount++;
            } else {
                currentSum += num;
            }
        }

        return subarrayCount <= k;
    }
}
