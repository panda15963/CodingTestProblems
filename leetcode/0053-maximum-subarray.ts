/**
 * @param nums
 * @returns
 */
function maxSubArray(nums: number[]): number {
    let ans: number = nums[0];
    let subMax: number = nums[0];

    for (let i = 1; i < nums.length; i++) {
        subMax = Math.max(subMax + nums[i], nums[i]);
        ans = Math.max(subMax, ans);
    }

    return ans;
}