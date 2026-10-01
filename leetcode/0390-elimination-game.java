class Solution {
    public int lastRemaining(int n) {
        // Track the first and last elements in the remaining sequence
        int firstElement = 1;
        int lastElement = n;
      
        // Step size between consecutive elements in the current sequence
        int stepSize = 1;
      
        // Keep track of remaining count and current round
        int remainingCount = n;
        int round = 0;
      
        // Continue elimination until only one element remains
        while (remainingCount > 1) {
            if (round % 2 == 0) {
                // Even round: eliminate from left to right
                // First element always moves forward
                firstElement += stepSize;
              
                // Last element moves backward only if count is odd
                if (remainingCount % 2 == 1) {
                    lastElement -= stepSize;
                }
            } else {
                // Odd round: eliminate from right to left
                // Last element always moves backward
                lastElement -= stepSize;
              
                // First element moves forward only if count is odd
                if (remainingCount % 2 == 1) {
                    firstElement += stepSize;
                }
            }
          
            // Update for next round
            remainingCount /= 2;  // Half of the elements remain after each round
            stepSize *= 2;        // Double the step size between remaining elements
            round++;
        }
      
        // When only one element remains, first and last converge to the same value
        return firstElement;
    }
}
