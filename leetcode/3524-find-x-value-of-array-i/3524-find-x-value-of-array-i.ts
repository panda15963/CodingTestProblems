function resultArray(nums: number[], k: number): number[] {
    const ans: number[] = new Array(k).fill(0);
    let dp: number[] = new Array(k).fill(0);

    for (const num of nums) {
        const newDp: number[] = new Array(k).fill(0);
        const numMod: number = num % k;

        // Start new subarray with only `num`
        newDp[numMod] = 1;

        // Extend all previous subarrays
        for (let i = 0; i < k; i++) {
            const newMod: number = (i * numMod) % k;
            newDp[newMod] += dp[i];
        }

        // Accumulate counts
        for (let i = 0; i < k; i++) {
            ans[i] += newDp[i];
        }

        dp = newDp;
    }

    return ans;
}