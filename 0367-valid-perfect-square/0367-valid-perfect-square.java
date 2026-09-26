class Solution {
    /**
     * Determines if num is a perfect square using the binary search template.
     * Feasible condition: mid * mid >= num
     * We find the first value where this is true, then check if it's an exact match.
     */
    public boolean isPerfectSquare(int num) {
        int left = 1;
        int right = num;
        int firstTrueIndex = -1;

        while (left <= right) {
            int mid = left + (right - left) / 2;
            // Use long to prevent overflow
            if ((long) mid * mid >= num) {
                firstTrueIndex = mid;
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        }

        // Check if the found value squared equals num exactly
        return firstTrueIndex != -1 && (long) firstTrueIndex * firstTrueIndex == num;
    }
}
