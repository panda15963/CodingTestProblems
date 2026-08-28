class Solution {
    public int rangeBitwiseAnd(int left, int right) {
        // The idea is to find the common prefix of all numbers in range [left, right]
        // We achieve this by repeatedly turning off the rightmost set bit of 'right'
        // until 'right' becomes less than or equal to 'left'
      
        // Continue while right is greater than left
        while (left < right) {
            // Turn off the rightmost set bit in 'right'
            // This operation: right & (right - 1) removes the rightmost 1-bit
            // Example: 12 (1100) & 11 (1011) = 8 (1000)
            right &= (right - 1);
        }
      
        // At this point, 'right' contains the common prefix of all numbers
        // in the range, which is the bitwise AND result
        return right;
    }
}
