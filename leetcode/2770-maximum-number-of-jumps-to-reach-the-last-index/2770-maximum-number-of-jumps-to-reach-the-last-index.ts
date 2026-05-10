function maximumJumps(nums: number[], target: number): number {
    const n = nums.length;
    // Initialize DP array with -1 (unreachable)
    const dp: number[] = new Array(n).fill(-1);
    
    // Base case: 0 jumps to reach the start
    dp[0] = 0;

    for (let j = 1; j < n; j++) {
        for (let i = 0; i < j; i++) {
            // If i is reachable and jump is valid
            if (dp[i] !== -1 && Math.abs(nums[j] - nums[i]) <= target) {
                dp[j] = Math.max(dp[j], dp[i] + 1);
            }
        }
    }

    return dp[n - 1];
}
