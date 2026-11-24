/**
 * Determines if a non-negative integer c can be expressed as the sum of two squares
 * Uses two-pointer technique to find if there exist integers a and b such that a² + b² = c
 *
 * @param c - The target non-negative integer to check
 * @returns true if c can be expressed as sum of two squares, false otherwise
 */
function judgeSquareSum(c: number): boolean {
    // Initialize two pointers:
    // left starts at 0 (minimum possible value)
    // right starts at the square root of c (maximum possible value for b)
    let left: number = 0;
    let right: number = Math.floor(Math.sqrt(c));

    // Use two-pointer approach to search for valid pair
    while (left <= right) {
        // Calculate the sum of squares of current pair
        const sumOfSquares: number = left * left + right * right;

        if (sumOfSquares === c) {
            // Found a valid pair where a² + b² = c
            return true;
        } else if (sumOfSquares < c) {
            // Sum is too small, increase left pointer to get larger sum
            left++;
        } else {
            // Sum is too large, decrease right pointer to get smaller sum
            right--;
        }
    }

    // No valid pair found
    return false;
}
