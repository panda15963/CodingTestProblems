function permute(nums: number[]): number[][] {
    const result: number[][] = [];

    const backTracking = (
        comb: number[],
        depth: number
    ): void => {
        if (depth === 0) {
            result.push([...comb]);
            return;
        }

        for (let i = 0; i < nums.length; i++) {
            if (comb.includes(nums[i])) {
                continue;
            }

            comb.push(nums[i]);
            backTracking(comb, depth - 1);
            comb.pop();
        }
    };

    backTracking([], nums.length);

    return result;
}