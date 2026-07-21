/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function(nums) {
    const result = [];

    const backTracking = (comb, depth) => {
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
};