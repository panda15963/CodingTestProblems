var findPeakElement = function (nums) {
    let start = 0;
    let end = nums.length - 1;

    while (start < end) {
        const mid = Math.floor((start + end) / 2);

        if (nums[mid] < nums[mid + 1]) {
            start = mid + 1;
        } else {
            end = mid;
        }
    }

    return start;
};