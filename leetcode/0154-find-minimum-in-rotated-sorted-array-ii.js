/**
 * @param {number[]} nums
 * @return {number}
 */
var findMin = function(nums) {
    let left = 0;
    let right = nums.length - 1;

    while (left < right) {
        let mid = Math.floor((left + right) / 2);

        if (nums[mid] > nums[right]) {
            // The minimum is in the right half
            left = mid + 1;
        } else if (nums[mid] < nums[right]) {
            // The minimum is at mid or in the left half
            right = mid;
        } else {
            // When nums[mid] === nums[right], we can't be sure where the minimum is.
            // Safely shrink the search space by moving the right pointer by 1.
            right--;
        }
    }

    return nums[left];
};
