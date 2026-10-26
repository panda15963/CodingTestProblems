function findTargetSumWays(nums: number[], target: number): number {
    let result: number = 0;

    const dfs = (index: number, curr: number): void => {
        if (index === nums.length) {
            if (curr === target) {
                result++;
            }
            return;
        }

        dfs(index + 1, curr - nums[index]);
        dfs(index + 1, curr + nums[index]);
    };

    dfs(0, 0);
    return result;
}