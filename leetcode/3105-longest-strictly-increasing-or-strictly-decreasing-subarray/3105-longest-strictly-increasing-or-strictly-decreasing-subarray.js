/**
 * @param {number[]} nums
 * @return {number}
 */
var longestMonotonicSubarray = function(nums) {
    let n = nums.length;
    let res = 1;

    for (let i = 0; i < n - 1; i++) {
        let curLen = 1;

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
};