/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var maximumJumps = function(nums, target) {
    const n = nums.length;
    // Initialize DP array with -1 (meaning unreachable)
    const dp = new Array(n).fill(-1);
    
    // Base case: 0 jumps to reach the starting index
    dp[0] = 0;

    for (let j = 1; j < n; j++) {
        for (let i = 0; i < j; i++) {
            // Check if index i was reachable and if jump to j is valid
            if (dp[i] !== -1 && Math.abs(nums[j] - nums[i]) <= target) {
                dp[j] = Math.max(dp[j], dp[i] + 1);
            }
        }
    }

    return dp[n - 1];
};
