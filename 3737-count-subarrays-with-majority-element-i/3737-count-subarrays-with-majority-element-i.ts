function countMajoritySubarrays(nums: number[], target: number): number {
    const n = nums.length;
    let ans = 0;

    for (let i = 0; i < n; i++) {
        const cnt = new Map<number, number>();

        for (let j = i; j < n; j++) {
            cnt.set(nums[j], (cnt.get(nums[j]) ?? 0) + 1);

            const len = j - i + 1;

            if ((cnt.get(target) ?? 0) > Math.floor(len / 2)) {
                ans++;
            }
        }
    }

    return ans;
}