// Trie node structure for efficient word storage and retrieval
interface TrieNode {
    children: TrieNode[];  // Array of 26 children nodes (for each letter a-z)
    ref: number;           // Reference index to the word in the words array (-1 if not a word end)
}

// Create a new Trie node
function createTrieNode(): TrieNode {
    return {
        children: new Array(26),
        ref: -1
    };
}

// Insert a word into the Trie with its reference index
function insertWord(root: TrieNode, word: string, referenceIndex: number): void {
    let currentNode = root;

    // Traverse through each character in the word
    for (let i = 0; i < word.length; i++) {
        // Convert character to index (0-25 for a-z)
        const charIndex = word.charCodeAt(i) - 97;

        // Create new node if path doesn't exist
        if (currentNode.children[charIndex] == null) {
            currentNode.children[charIndex] = createTrieNode();
        }

        // Move to the next node
        currentNode = currentNode.children[charIndex];
    }

    // Mark the end of word with its reference index
    currentNode.ref = referenceIndex;
}

// Find all words from the dictionary that exist in the board
function findWords(board: string[][], words: string[]): string[] {
    // Build Trie from all words
    const trieRoot = createTrieNode();
    for (let i = 0; i < words.length; i++) {
        insertWord(trieRoot, words[i], i);
    }

    const rows = board.length;
    const cols = board[0].length;
    const result: string[] = [];

    // Direction vectors for moving up, right, down, left
    const directions = [-1, 0, 1, 0, -1];

    // DFS function to explore the board from current position
    const dfs = (node: TrieNode, row: number, col: number): void => {
        // Get the character index for current board position
        const charIndex = board[row][col].charCodeAt(0) - 97;

        // If no child exists for this character, return
        if (node.children[charIndex] == null) {
            return;
        }

        // Move to the child node
        node = node.children[charIndex];

        // If current node marks end of a word, add it to result
        if (node.ref !== -1) {
            result.push(words[node.ref]);
            node.ref = -1;  // Mark as visited to avoid duplicates
        }

        // Temporarily mark current cell as visited
        const originalChar = board[row][col];
        board[row][col] = '#';

        // Explore all four directions
        for (let k = 0; k < 4; k++) {
            const nextRow = row + directions[k];
            const nextCol = col + directions[k + 1];

            // Check if next position is valid and not visited
            if (nextRow >= 0 && nextRow < rows &&
                nextCol >= 0 && nextCol < cols &&
                board[nextRow][nextCol] !== '#') {
                dfs(node, nextRow, nextCol);
            }
        }

        // Restore original character (backtrack)
        board[row][col] = originalChar;
    };

    // Start DFS from every cell in the board
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            dfs(trieRoot, i, j);
        }
    }

    return result;
}
