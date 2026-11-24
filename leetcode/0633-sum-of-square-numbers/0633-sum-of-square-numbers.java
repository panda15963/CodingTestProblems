class Solution {
    /**
     * Determines if a non-negative integer c can be expressed as the sum of two squares.
     * Uses two-pointer technique to find if there exist integers a and b such that a² + b² = c.
     *
     * @param c the target non-negative integer to check
     * @return true if c can be expressed as sum of two squares, false otherwise
     */
    public boolean judgeSquareSum(int c) {
        // Initialize left pointer starting from 0
        long left = 0;

        // Initialize right pointer starting from the square root of c (maximum possible value)
        long right = (long) Math.sqrt(c);

        // Use two-pointer approach to search for valid pair
        while (left <= right) {
            // Calculate the sum of squares of current pair
            long sumOfSquares = left * left + right * right;

            // Check if we found the exact sum
            if (sumOfSquares == c) {
                return true;
            }

            // If sum is less than target, increase left pointer to get larger sum
            if (sumOfSquares < c) {
                left++;
            }
            // If sum is greater than target, decrease right pointer to get smaller sum
            else {
                right--;
            }
        }

        // No valid pair found
        return false;
    }
}
