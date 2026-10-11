var sumOfSquares = function(nums) {
    const arrayLength = nums.length;
    let sumOfSquaresResult = 0;

    for (let index = 0; index < arrayLength; index++) {
        if (arrayLength % (index + 1) === 0) {
            sumOfSquaresResult += nums[index] * nums[index];
        }
    }

    return sumOfSquaresResult;
};