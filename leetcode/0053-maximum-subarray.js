/**
 * @param {number[]} nums
 * @return {number}
 */
function maxSubArray(nums) {
    let ans = nums[0];
    let subMax = nums[0];

    for (let i = 1; i < nums.length; i++) {
        subMax = Math.max(subMax + nums[i], nums[i]);
        ans = Math.max(subMax, ans);
    }

    return ans;
}