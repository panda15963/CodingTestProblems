function xorAfterQueries(nums, queries) {
    const MOD = 1000000007n;
    for (let [l, r, k, v] of queries) {
        for (let i = l; i <= r; i += k) {
            nums[i] = Number((BigInt(nums[i]) * BigInt(v)) % MOD);
        }
    }
    return nums.reduce((acc, num) => acc ^ num, 0);
}