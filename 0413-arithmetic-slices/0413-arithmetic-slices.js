function numberOfArithmeticSlices(nums) {
    let totalSlices = 0;
    let currentSliceCount = 0;
    let currentDifference = 3000;

    for (let i = 0; i < nums.length - 1; i++) {
        const currentElement = nums[i];
        const nextElement = nums[i + 1];
        const difference = nextElement - currentElement;

        if (difference === currentDifference) {
            currentSliceCount++;
        } else {
            currentDifference = difference;
            currentSliceCount = 0;
        }

        totalSlices += currentSliceCount;
    }

    return totalSlices;
}