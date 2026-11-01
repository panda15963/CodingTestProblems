var minMoves = function(nums) {
    let minValue = Infinity;
    let sum = 0;

    for (const num of nums) {
        sum += num;
        minValue = Math.min(minValue, num);
    }

    return sum - minValue * nums.length;
};