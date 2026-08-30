/**
 * Trie (Prefix Tree) implementation for efficient string storage and retrieval.
 * Supports insertion, exact word search, and prefix search operations.
 * Assumes all inputs contain only lowercase English letters 'a' to 'z'.
 */
class Trie {
    // Array to store child nodes for each letter (a-z)
    private Trie[] children;
  
    // Flag to mark if current node represents end of a word
    private boolean isEndOfWord;

    /**
     * Constructor initializes an empty Trie node.
     * Creates an array of 26 slots for lowercase English letters.
     */
    public Trie() {
        children = new Trie[26];
        isEndOfWord = false;
    }

    /**
     * Inserts a word into the Trie.
     * Time Complexity: O(n) where n is the length of the word.
     * 
     * @param word The word to be inserted into the Trie
     */
    public void insert(String word) {
        Trie currentNode = this;
      
        // Traverse through each character in the word
        for (char character : word.toCharArray()) {
            // Calculate the index for the character (0 for 'a', 1 for 'b', etc.)
            int index = character - 'a';
          
            // Create a new node if the path doesn't exist
            if (currentNode.children[index] == null) {
                currentNode.children[index] = new Trie();
            }
          
            // Move to the child node
            currentNode = currentNode.children[index];
        }
      
        // Mark the last node as end of the word
        currentNode.isEndOfWord = true;
    }

    /**
     * Searches for an exact word in the Trie.
     * Time Complexity: O(n) where n is the length of the word.
     * 
     * @param word The word to search for
     * @return true if the word exists in the Trie, false otherwise
     */
    public boolean search(String word) {
        Trie prefixEndNode = searchPrefix(word);
      
        // Word exists only if we found the prefix AND it's marked as end of word
        return prefixEndNode != null && prefixEndNode.isEndOfWord;
    }

    /**
     * Checks if any word in the Trie starts with the given prefix.
     * Time Complexity: O(n) where n is the length of the prefix.
     * 
     * @param prefix The prefix to search for
     * @return true if any word starts with the prefix, false otherwise
     */
    public boolean startsWith(String prefix) {
        Trie prefixEndNode = searchPrefix(prefix);
      
        // Prefix exists if we can traverse the entire prefix path
        return prefixEndNode != null;
    }

    /**
     * Helper method to search for a prefix in the Trie.
     * Returns the node where the prefix ends, or null if prefix doesn't exist.
     * 
     * @param prefix The prefix string to search for
     * @return The Trie node at the end of the prefix path, or null if not found
     */
    private Trie searchPrefix(String prefix) {
        Trie currentNode = this;
      
        // Traverse through each character in the prefix
        for (char character : prefix.toCharArray()) {
            // Calculate the index for the character
            int index = character - 'a';
          
            // If path doesn't exist, prefix is not in the Trie
            if (currentNode.children[index] == null) {
                return null;
            }
          
            // Move to the child node
            currentNode = currentNode.children[index];
        }
      
        // Return the node where the prefix ends
        return currentNode;
    }
}

/**
 * Your Trie object will be instantiated and called as such:
 * Trie obj = new Trie();
 * obj.insert(word);
 * boolean param_2 = obj.search(word);
 * boolean param_3 = obj.startsWith(prefix);
 */
