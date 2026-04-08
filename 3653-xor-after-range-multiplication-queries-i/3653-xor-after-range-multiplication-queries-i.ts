function xorAfterQueries(nums: number[], queries: number[][]): number {
    const MOD: bigint = 1000000007n;
    for (const [l, r, k, v] of queries) {
        for (let i: number = l; i <= r; i += k) {
            nums[i] = Number((BigInt(nums[i]) * BigInt(v)) % MOD);
        }
    }
    return nums.reduce((acc: number, num: number) => acc ^ num, 0);
}