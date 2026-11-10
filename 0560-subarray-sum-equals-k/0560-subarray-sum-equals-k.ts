function subarraySum(nums: number[], k: number): number {
    const map: Map<number, number> = new Map();

    map.set(0, 1);

    let res: number = 0;
    let sum: number = 0;

    for (let i = 0; i < nums.length; i++) {
        sum += nums[i];

        res += map.get(sum - k) ?? 0;

        map.set(sum, (map.get(sum) ?? 0) + 1);
    }

    return res;
}