function findMin(nums) {
    const n = nums.length;
    let left = 0;
    let right = n - 1;
    let firstTrueIndex = -1;

    // nums[mid] <= nums[n - 1]인 첫 번째 위치를 찾음
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);

        if (nums[mid] <= nums[n - 1]) {
            firstTrueIndex = mid;
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }

    return nums[firstTrueIndex];
}