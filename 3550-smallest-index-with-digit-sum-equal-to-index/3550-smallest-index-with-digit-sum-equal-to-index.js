var smallestIndex = function(nums) {
    for (let i = 0; i < nums.length; i++) {
        let digitSum = 0;
        let currentNumber = nums[i];

        while (currentNumber > 0) {
            digitSum += currentNumber % 10;
            currentNumber = Math.floor(currentNumber / 10);
        }

        if (digitSum === i) {
            return i;
        }
    }

    return -1;
};