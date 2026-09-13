function lengthOfLIS(nums) {
    let longest = 1;

    const dp = new Array(nums.length).fill(-Infinity);
    dp[0] = 1;

    for (let i = 1; i < nums.length; i++) {
        for (let j = 0; j <= i; j++) {
            if (nums[i] > nums[j]) {
                dp[i] = Math.max(dp[i], dp[j] + 1);
            }
        }

        if (dp[i] === -Infinity) {
            dp[i] = 1;
        }

        longest = Math.max(longest, dp[i]);
    }

    return longest;
}