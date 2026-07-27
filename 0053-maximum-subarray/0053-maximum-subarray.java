class Solution {
    public int maxSubArray(int[] nums) {
        int ans = nums[0];
        int subMax = nums[0];
        for (int i = 1; i < nums.length; i++){
            subMax = Math.max(subMax + nums[i], nums[i]);
            ans = Math.max(subMax, ans);
        }
        return ans;
    }
}