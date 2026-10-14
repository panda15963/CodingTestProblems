class Solution {
    private int n;
  
    /**
     * Find the k-th smallest number in lexicographical order from 1 to n
     * @param n The upper bound of the range [1, n]
     * @param k The position of the number to find (1-indexed)
     * @return The k-th smallest number in lexicographical order
     */
    public int findKthNumber(int n, int k) {
        this.n = n;
        long currentNumber = 1;
        k--; // Convert to 0-indexed, as we start from number 1
      
        // Traverse the lexicographical tree until we find the k-th number
        while (k > 0) {
            // Count how many numbers exist in the subtree rooted at currentNumber
            int subtreeNodeCount = count(currentNumber);
          
            if (k >= subtreeNodeCount) {
                // The k-th number is not in this subtree, move to the next sibling
                k -= subtreeNodeCount;
                currentNumber++;
            } else {
                // The k-th number is in this subtree, go down to the first child
                k--;
                currentNumber *= 10;
            }
        }
      
        return (int) currentNumber;
    }
  
    /**
     * Count the number of valid integers in the subtree rooted at 'current'
     * in the lexicographical tree, bounded by n
     * @param current The root of the subtree
     * @return The count of valid numbers in this subtree
     */
    public int count(long current) {
        long nextSibling = current + 1;
        long totalCount = 0;
      
        // Count nodes level by level in the lexicographical tree
        while (current <= n) {
            // At each level, count valid numbers between current and nextSibling-1
            // But not exceeding n
            totalCount += Math.min(n - current + 1, nextSibling - current);
          
            // Move to the next level (multiply by 10 for lexicographical tree)
            nextSibling *= 10;
            current *= 10;
        }
      
        return (int) totalCount;
    }
}
