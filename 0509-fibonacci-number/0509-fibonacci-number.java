class Solution {
    /**
     * Calculates the nth Fibonacci number using iterative approach.
     * Time Complexity: O(n)
     * Space Complexity: O(1)
     * 
     * @param n the position in the Fibonacci sequence (0-indexed)
     * @return the nth Fibonacci number
     */
    public int fib(int n) {
        // Initialize the first two Fibonacci numbers
        // previous represents F(i-1), current represents F(i)
        int previous = 0;
        int current = 1;
      
        // Iterate n times to compute the nth Fibonacci number
        while (n-- > 0) {
            // Calculate the next Fibonacci number: F(i+1) = F(i) + F(i-1)
            int next = previous + current;
          
            // Shift the window: move current to previous, and next to current
            previous = current;
            current = next;
        }
      
        // After n iterations, 'previous' holds the nth Fibonacci number
        return previous;
    }
}
