class Solution {
    /**
     * Determines if a given integer is a power of two.
     * 
     * A number is a power of two if it has exactly one bit set in its binary representation.
     * For example: 1 (2^0) = 0001, 2 (2^1) = 0010, 4 (2^2) = 0100, 8 (2^3) = 1000
     * 
     * The algorithm uses a bit manipulation trick:
     * - If n is a power of two, it has only one bit set to 1
     * - Subtracting 1 from n flips all the bits after the rightmost set bit (including the set bit)
     * - Therefore, n & (n-1) will be 0 only if n is a power of two
     * 
     * Example: n = 8 (1000 in binary)
     *          n - 1 = 7 (0111 in binary)
     *          n & (n-1) = 1000 & 0111 = 0000 (equals 0, so 8 is a power of two)
     * 
     * @param n The integer to check
     * @return true if n is a power of two, false otherwise
     */
    public boolean isPowerOfTwo(int n) {
        // Check if n is positive (negative numbers and zero cannot be powers of two)
        // AND check if n has only one bit set using the bit manipulation trick
        return n > 0 && (n & (n - 1)) == 0;
    }
}
