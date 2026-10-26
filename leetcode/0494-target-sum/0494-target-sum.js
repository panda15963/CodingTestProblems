var findTargetSumWays = function(nums, target) {
    let result = 0;

    const dfs = (index, curr) => {
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
};