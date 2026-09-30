class Solution {
    /**
     * Generate numbers from 1 to n in lexicographical order.
     * Uses an iterative approach to traverse numbers as if they were in a trie structure.
     * 
     * @param n The upper bound of numbers to generate (inclusive)
     * @return List of integers from 1 to n in lexicographical order
     */
    public List<Integer> lexicalOrder(int n) {
        // Initialize result list with capacity n for efficiency
        List<Integer> result = new ArrayList<>(n);
      
        // Start with the current number as 1
        int currentNumber = 1;
      
        // Generate exactly n numbers
        for (int i = 0; i < n; i++) {
            // Add current number to the result
            result.add(currentNumber);
          
            // Try to go deeper in the trie (multiply by 10)
            // This moves from a number like 1 to 10, or 12 to 120
            if (currentNumber * 10 <= n) {
                currentNumber *= 10;
            } else {
                // Cannot go deeper, need to move to the next sibling or backtrack
              
                // Backtrack if we're at a number ending in 9 (no next sibling)
                // or if incrementing would exceed n
                while (currentNumber % 10 == 9 || currentNumber + 1 > n) {
                    // Move up one level in the trie (divide by 10)
                    currentNumber /= 10;
                }
              
                // Move to the next sibling at the current level
                currentNumber++;
            }
        }
      
        return result;
    }
}
