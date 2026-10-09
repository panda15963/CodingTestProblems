/**
 * Binary Trie data structure for finding maximum XOR value
 * Each node has at most 2 children (0 and 1) representing binary digits
 */
class Trie {
    // Array to store child nodes: children[0] for bit 0, children[1] for bit 1
    private Trie[] children = new Trie[2];

    /**
     * Constructor for Trie node
     */
    public Trie() {
    }

    /**
     * Inserts a number into the trie by its binary representation
     * @param x The number to insert
     */
    public void insert(int x) {
        Trie currentNode = this;
      
        // Process each bit from most significant (30th) to least significant (0th)
        // Using 30 as starting point since we're dealing with 31-bit positive integers
        for (int bitPosition = 30; bitPosition >= 0; --bitPosition) {
            // Extract the bit at current position (0 or 1)
            int bitValue = (x >> bitPosition) & 1;
          
            // Create new node if path doesn't exist
            if (currentNode.children[bitValue] == null) {
                currentNode.children[bitValue] = new Trie();
            }
          
            // Move to the child node
            currentNode = currentNode.children[bitValue];
        }
    }

    /**
     * Searches for the maximum XOR value with the given number
     * @param x The number to find maximum XOR with
     * @return The maximum XOR value possible with x and any number in the trie
     */
    public int search(int x) {
        Trie currentNode = this;
        int maxXorValue = 0;
      
        // Process each bit from most significant to least significant
        for (int bitPosition = 30; bitPosition >= 0; --bitPosition) {
            // Extract the bit at current position
            int bitValue = (x >> bitPosition) & 1;
          
            // Try to go opposite direction for maximum XOR
            // XOR is maximized when bits are different (0^1=1, 1^0=1)
            int oppositeBit = bitValue ^ 1;
          
            if (currentNode.children[oppositeBit] != null) {
                // Opposite bit exists, add 1 to this bit position in result
                maxXorValue |= (1 << bitPosition);
                currentNode = currentNode.children[oppositeBit];
            } else {
                // Opposite bit doesn't exist, follow the same bit path
                currentNode = currentNode.children[bitValue];
            }
        }
      
        return maxXorValue;
    }
}

/**
 * Solution class for LeetCode problem: Maximum XOR of Two Numbers in an Array
 */
class Solution {
    /**
     * Finds the maximum XOR of any two numbers in the array
     * @param nums Array of non-negative integers
     * @return Maximum XOR value of any two numbers in the array
     */
    public int findMaximumXOR(int[] nums) {
        // Initialize trie data structure
        Trie trie = new Trie();
        int maximumXor = 0;
      
        // For each number in the array
        for (int currentNum : nums) {
            // Insert current number into trie
            trie.insert(currentNum);
          
            // Find maximum XOR with current number and all previously inserted numbers
            // Update global maximum if a larger XOR is found
            maximumXor = Math.max(maximumXor, trie.search(currentNum));
        }
      
        return maximumXor;
    }
}
