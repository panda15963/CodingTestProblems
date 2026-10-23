var sortPermutation = function(nums) {
    let bitwiseAndResult = -1;

    for (let i = 0; i < nums.length; ++i) {
        if (i !== nums[i]) {
            bitwiseAndResult &= nums[i];
        }
    }

    return Math.max(bitwiseAndResult, 0);
};