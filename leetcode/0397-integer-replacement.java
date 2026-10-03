class Solution {
    /**
     * Finds the minimum number of operations to reduce n to 1.
     * Operations allowed: if n is even, divide by 2; if n is odd, add or subtract 1.
     * 
     * @param n The positive integer to reduce to 1
     * @return The minimum number of operations required
     */
    public int integerReplacement(int n) {
        int operationCount = 0;
      
        // Continue until n becomes 1
        while (n != 1) {
            // Check if n is even (last bit is 0)
            if ((n & 1) == 0) {
                // If even, divide by 2 using unsigned right shift
                n >>>= 1;
            } 
            // Check if n is odd and last two bits are both 1 (binary ends with 11)
            // Exception: when n is 3, we should decrement instead of increment
            else if (n != 3 && (n & 3) == 3) {
                // Increment n (this leads to more consecutive zeros after division)
                ++n;
            } 
            // For other odd numbers (binary ends with 01) or when n is 3
            else {
                // Decrement n
                --n;
            }
          
            // Increment the operation counter
            ++operationCount;
        }
      
        return operationCount;
    }
}
