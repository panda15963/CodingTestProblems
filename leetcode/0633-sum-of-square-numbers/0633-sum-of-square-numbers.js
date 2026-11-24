
var judgeSquareSum = function(c) {
    // Initialize two pointers
    let left = 0;
    let right = Math.floor(Math.sqrt(c));

    // Two-pointer approach
    while (left <= right) {
        // Calculate sum of squares
        const sumOfSquares = left * left + right * right;

        if (sumOfSquares === c) {
            // Found a valid pair
            return true;
        } else if (sumOfSquares < c) {
            // Sum is too small
            left++;
        } else {
            // Sum is too large
            right--;
        }
    }

    // No valid pair found
    return false;
};
