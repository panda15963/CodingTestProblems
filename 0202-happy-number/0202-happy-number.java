class Solution {
    /**
     * Determines if a number is a "happy number".
     * A happy number is defined by the following process:
     * - Starting with any positive integer, replace the number by the sum of the squares of its digits
     * - Repeat the process until the number equals 1 (happy) or loops endlessly in a cycle (not happy)
     * 
     * @param n The positive integer to check
     * @return true if n is a happy number, false otherwise
     */
    public boolean isHappy(int n) {
        // Set to track visited numbers and detect cycles
        Set<Integer> visitedNumbers = new HashSet<>();
      
        // Continue until we reach 1 (happy) or find a cycle (not happy)
        while (n != 1 && !visitedNumbers.contains(n)) {
            // Mark current number as visited
            visitedNumbers.add(n);
          
            // Calculate sum of squares of digits
            int sumOfSquares = 0;
            while (n != 0) {
                int digit = n % 10;  // Extract last digit
                sumOfSquares += digit * digit;  // Add square of digit to sum
                n /= 10;  // Remove last digit
            }
          
            // Update n with the new sum for next iteration
            n = sumOfSquares;
        }
      
        // If we exited because n equals 1, it's happy; otherwise, we found a cycle
        return n == 1;
    }
}
