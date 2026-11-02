var minMoves2 = function(nums) {
    nums.sort((a, b) => a - b);

    const medianValue = nums[nums.length >> 1];

    const totalMoves = nums.reduce(
        (accumulator, currentValue) => {
            return accumulator + Math.abs(currentValue - medianValue);
        },
        0
    );

    return totalMoves;
};