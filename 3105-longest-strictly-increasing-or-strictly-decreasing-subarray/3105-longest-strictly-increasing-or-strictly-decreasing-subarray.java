public class Solution {
    public int longestMonotonicSubarray(int[] nums) {
        int n = nums.length;
        int res = 1;

        for (int i = 0; i < n - 1; i++) {
            int curLen = 1;
            for (int j = i + 1; j < n; j++) {
                if (nums[j] == nums[j - 1] || ((nums[i] < nums[i + 1]) != (nums[j - 1] < nums[j]))) {
                    break;
                }
                curLen++;
            }
            res = Math.max(res, curLen);
        }

        return res;
    }
}