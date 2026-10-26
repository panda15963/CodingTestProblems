class Solution {
    private int result;

    public int findTargetSumWays(int[] nums, int target) {
        result = 0;
        dfs(nums, target, 0, 0);
        return result;
    }

    private void dfs(int[] nums, int target, int curr, int index) {
        if (index == nums.length) {
            if (curr == target) {
                result++;
            }
            return;
        }

        dfs(nums, target, curr - nums[index], index + 1);
        dfs(nums, target, curr + nums[index], index + 1);
    }
}