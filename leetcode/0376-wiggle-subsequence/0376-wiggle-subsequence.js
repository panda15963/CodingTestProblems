var wiggleMaxLength = function(nums) {
    const arrayLength = nums.length;

    const upSequence = new Array(arrayLength).fill(1);
    const downSequence = new Array(arrayLength).fill(1);

    let maxLength = 1;

    for (let currentIndex = 1; currentIndex < arrayLength; currentIndex++) {
        for (let previousIndex = 0; previousIndex < currentIndex; previousIndex++) {
            if (nums[currentIndex] > nums[previousIndex]) {
                upSequence[currentIndex] = Math.max(
                    upSequence[currentIndex],
                    downSequence[previousIndex] + 1
                );
            } else if (nums[currentIndex] < nums[previousIndex]) {
                downSequence[currentIndex] = Math.max(
                    downSequence[currentIndex],
                    upSequence[previousIndex] + 1
                );
            }
        }

        maxLength = Math.max(
            maxLength,
            upSequence[currentIndex],
            downSequence[currentIndex]
        );
    }

    return maxLength;
};