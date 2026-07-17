/**
 * @param {number[]} nums
 * @return {void}
 */
var nextPermutation = function(nums) {
    const len = nums.length;

    if (nums === null || len <= 1) {
        return;
    }

    // 1. 뒤에서부터 처음으로 감소하는 원소 찾기
    let i = len - 2;

    while (i >= 0 && nums[i] >= nums[i + 1]) {
        i--;
    }

    // 2. 감소하는 원소가 존재하면
    if (i >= 0) {
        let j = len - 1;

        // 뒤에서부터 nums[i]보다 큰 첫 번째 원소 찾기
        while (nums[j] <= nums[i]) {
            j--;
        }

        // 3. 두 원소 교환
        swap(nums, i, j);
    }

    // 4. i 이후 구간 뒤집기
    reverse(nums, i + 1, len - 1);
};

function swap(nums, i, j) {
    const temp = nums[i];
    nums[i] = nums[j];
    nums[j] = temp;
}

function reverse(nums, left, right) {
    while (left < right) {
        swap(nums, left++, right--);
    }
}