function findMin(nums: number[]): number {
    const n: number = nums.length;
    let left: number = 0;
    let right: number = n - 1;
    let firstTrueIndex: number = -1;

    // Binary search using the template: find first index where nums[mid] <= nums[n-1]
    while (left <= right) {
        const mid: number = Math.floor((left + right) / 2);

        // Feasible condition: nums[mid] <= nums[n-1]
        if (nums[mid] <= nums[n - 1]) {
            firstTrueIndex = mid;
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }

    // firstTrueIndex points to the minimum element
    return nums[firstTrueIndex];
}
