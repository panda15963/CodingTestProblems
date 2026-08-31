/**
 * Trie node structure for storing words
 * Each node contains an array of 26 children (for lowercase letters a-z)
 * and a boolean flag to mark the end of a word
 */
class Trie {
    Trie[] children = new Trie[26];
    boolean isEnd;
}

/**
 * Data structure that supports adding words and searching with wildcard '.'
 * Uses a Trie (prefix tree) for efficient storage and retrieval
 */
class WordDictionary {
    private Trie root;

    /**
     * Initialize the WordDictionary with an empty Trie
     */
    public WordDictionary() {
        root = new Trie();
    }

    /**
     * Adds a word to the data structure
     * @param word The word to be added (contains only lowercase letters)
     */
    public void addWord(String word) {
        Trie currentNode = root;
      
        // Traverse through each character in the word
        for (char ch : word.toCharArray()) {
            int index = ch - 'a';
          
            // Create a new node if path doesn't exist
            if (currentNode.children[index] == null) {
                currentNode.children[index] = new Trie();
            }
          
            // Move to the next node
            currentNode = currentNode.children[index];
        }
      
        // Mark the end of the word
        currentNode.isEnd = true;
    }

    /**
     * Search for a word in the data structure
     * @param word The word to search (may contain '.' as wildcard for any letter)
     * @return true if the word exists, false otherwise
     */
    public boolean search(String word) {
        return searchHelper(word, root);
    }

    /**
     * Helper method for recursive search with wildcard support
     * @param word The word or remaining substring to search
     * @param currentNode The current Trie node being examined
     * @return true if the word pattern matches, false otherwise
     */
    private boolean searchHelper(String word, Trie currentNode) {
        // Process each character in the word
        for (int i = 0; i < word.length(); i++) {
            char ch = word.charAt(i);
          
            if (ch == '.') {
                // Wildcard case: try all possible children
                for (Trie childNode : currentNode.children) {
                    if (childNode != null && 
                        searchHelper(word.substring(i + 1), childNode)) {
                        return true;
                    }
                }
                return false;
            } else {
                // Regular character case
                int index = ch - 'a';
              
                // If no child exists for this character, word doesn't exist
                if (currentNode.children[index] == null) {
                    return false;
                }
              
                // Move to the next node
                currentNode = currentNode.children[index];
            }
        }
      
        // Check if we've reached a valid word ending
        return currentNode.isEnd;
    }
}

/**
 * Your WordDictionary object will be instantiated and called as such:
 * WordDictionary obj = new WordDictionary();
 * obj.addWord(word);
 * boolean param_2 = obj.search(word);
 */
