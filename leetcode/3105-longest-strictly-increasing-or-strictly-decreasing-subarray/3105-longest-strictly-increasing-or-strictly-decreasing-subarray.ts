function longestMonotonicSubarray(nums: number[]): number {
    const n: number = nums.length;
    let res: number = 1;

    for (let i = 0; i < n - 1; i++) {
        let curLen: number = 1;

        for (let j = i + 1; j < n; j++) {
            if (
                nums[j] === nums[j - 1] ||
                (nums[i] < nums[i + 1]) !== (nums[j - 1] < nums[j])
            ) {
                break;
            }

            curLen++;
        }

        res = Math.max(res, curLen);
    }

    return res;
}