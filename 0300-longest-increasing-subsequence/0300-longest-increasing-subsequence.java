class Solution {
    public int lengthOfLIS(int[] nums) {
        int longest = 1;

        int[] dp = new int[nums.length];
        dp[0] = 1;

        for (int i = 1; i < nums.length; i++) {
            dp[i] = Integer.MIN_VALUE;

            for (int j = 0; j <= i; j++) {
                if (nums[i] > nums[j]) {
                    dp[i] = Math.max(dp[i], dp[j] + 1);
                }
            }

            if (dp[i] == Integer.MIN_VALUE) {
                dp[i] = 1;
            }

            longest = Math.max(longest, dp[i]);
        }

        return longest;
    }
}