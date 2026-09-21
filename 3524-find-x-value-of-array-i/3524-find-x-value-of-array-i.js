var resultArray = function(nums, k) {
    const ans = new Array(k).fill(0);
    let dp = new Array(k).fill(0);

    for (const num of nums) {
        const newDp = new Array(k).fill(0);
        const numMod = num % k;

        // Start new subarray with only `num`
        newDp[numMod] = 1;

        // Extend all previous subarrays
        for (let i = 0; i < k; i++) {
            const newMod = (i * numMod) % k;
            newDp[newMod] += dp[i];
        }

        // Accumulate counts
        for (let i = 0; i < k; i++) {
            ans[i] += newDp[i];
        }

        dp = newDp;
    }

    return ans;
};