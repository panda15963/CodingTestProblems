/**
 * Trie (Prefix Tree) data structure for efficient word searching
 */
class Trie {
    // Array to store 26 child nodes (one for each lowercase letter)
    Trie[] children = new Trie[26];
    // Index reference to the word in the words array (-1 means no word ends here)
    int wordIndex = -1;

    /**
     * Inserts a word into the trie with its corresponding index
     * @param word - the word to insert
     * @param index - the index of the word in the words array
     */
    public void insert(String word, int index) {
        Trie currentNode = this;

        // Traverse through each character of the word
        for (int i = 0; i < word.length(); i++) {
            // Calculate the index for the character (0-25 for 'a'-'z')
            int charIndex = word.charAt(i) - 'a';

            // Create a new node if it doesn't exist
            if (currentNode.children[charIndex] == null) {
                currentNode.children[charIndex] = new Trie();
            }

            // Move to the child node
            currentNode = currentNode.children[charIndex];
        }

        // Mark the end of the word with its index
        currentNode.wordIndex = index;
    }
}

/**
 * Solution class to find all words from a list that exist in a 2D board
 */
class Solution {
    private char[][] board;
    private String[] words;
    private List<String> result = new ArrayList<>();

    /**
     * Finds all words from the words array that can be formed in the board
     * @param board - 2D character grid
     * @param words - array of words to search for
     * @return list of found words
     */
    public List<String> findWords(char[][] board, String[] words) {
        this.board = board;
        this.words = words;

        // Build the trie with all words
        Trie trieRoot = new Trie();
        for (int i = 0; i < words.length; i++) {
            trieRoot.insert(words[i], i);
        }

        int rows = board.length;
        int cols = board[0].length;

        // Start DFS from each cell in the board
        for (int row = 0; row < rows; row++) {
            for (int col = 0; col < cols; col++) {
                dfs(trieRoot, row, col);
            }
        }

        return result;
    }

    /**
     * Depth-first search to find words starting from current position
     * @param currentNode - current trie node
     * @param row - current row position in board
     * @param col - current column position in board
     */
    private void dfs(Trie currentNode, int row, int col) {
        // Get the character index for the current board position
        int charIndex = board[row][col] - 'a';

        // If no child exists for this character, return
        if (currentNode.children[charIndex] == null) {
            return;
        }

        // Move to the child node
        currentNode = currentNode.children[charIndex];

        // If a word ends at this node, add it to results
        if (currentNode.wordIndex != -1) {
            result.add(words[currentNode.wordIndex]);
            // Mark as visited to avoid duplicates
            currentNode.wordIndex = -1;
        }

        // Mark current cell as visited
        char originalChar = board[row][col];
        board[row][col] = '#';

        // Direction vectors for up, right, down, left movement
        int[] directions = {-1, 0, 1, 0, -1};

        // Explore all four adjacent cells
        for (int k = 0; k < 4; k++) {
            int newRow = row + directions[k];
            int newCol = col + directions[k + 1];

            // Check if the new position is valid and not visited
            if (newRow >= 0 && newRow < board.length &&
                newCol >= 0 && newCol < board[0].length &&
                board[newRow][newCol] != '#') {
                dfs(currentNode, newRow, newCol);
            }
        }

        // Restore the original character (backtrack)
        board[row][col] = originalChar;
    }
}
