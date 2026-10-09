var canPartition = function(nums) {
    // Calculate the total sum of all elements
    let totalSum = 0;

    for (const num of nums) {
        totalSum += num;
    }

    // If the total sum is odd, equal partitioning is impossible
    if (totalSum % 2 === 1) {
        return false;
    }

    const n = nums.length;
    const targetSum = totalSum / 2;

    // dp[i][j] represents whether sum j can be achieved
    // using the first i elements
    const dp = Array.from(
        { length: n + 1 },
        () => Array(targetSum + 1).fill(false)
    );

    // Base case: sum 0 is always achievable
    dp[0][0] = true;

    // Fill the DP table
    for (let i = 1; i <= n; i++) {
        const currentNum = nums[i - 1];

        for (let j = 0; j <= targetSum; j++) {
            // Option 1: Do not include the current number
            dp[i][j] = dp[i - 1][j];

            // Option 2: Include the current number
            if (j >= currentNum) {
                dp[i][j] =
                    dp[i][j] || dp[i - 1][j - currentNum];
            }
        }
    }

    return dp[n][targetSum];
};