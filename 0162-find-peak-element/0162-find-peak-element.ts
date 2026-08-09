function findPeakElement(nums: number[]): number {
    let start: number = 0;
    let end: number = nums.length - 1;

    while (start < end) {
        const mid: number = Math.floor((start + end) / 2);

        if (nums[mid] < nums[mid + 1]) {
            start = mid + 1;
        } else {
            end = mid;
        }
    }

    return start;
}