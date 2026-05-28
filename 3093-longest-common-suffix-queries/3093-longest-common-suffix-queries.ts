// Global variables to represent the Trie structure
const ALPHABET_SIZE = 26;
let trieChildren: (number | null)[][] = [];
let trieLength: number[] = [];
let trieIndex: number[] = [];
let nodeCount: number = 0;

/**
 * Creates a new trie node and returns its index
 */
function createTrieNode(): number {
    const nodeId = nodeCount++;
    trieChildren[nodeId] = new Array(ALPHABET_SIZE).fill(null);
    trieLength[nodeId] = Infinity;
    trieIndex[nodeId] = Infinity;
    return nodeId;
}

/**
 * Inserts a word into the trie with its corresponding index
 * The word is inserted in reverse order (from last character to first)
 * @param word - The word to insert
 * @param wordIndex - The index of the word in the original array
 */
function insert(word: string, wordIndex: number): void {
    let currentNode = 0; // Start from root
  
    // Update root node if current word is shorter
    if (trieLength[currentNode] > word.length) {
        trieLength[currentNode] = word.length;
        trieIndex[currentNode] = wordIndex;
    }
  
    // Traverse the word from last character to first
    for (let charPos = word.length - 1; charPos >= 0; charPos--) {
        const charIndex = word.charCodeAt(charPos) - 'a'.charCodeAt(0);
      
        // Create child node if it doesn't exist
        if (trieChildren[currentNode][charIndex] === null) {
            trieChildren[currentNode][charIndex] = createTrieNode();
        }
      
        currentNode = trieChildren[currentNode][charIndex]!;
      
        // Update node if current word is shorter
        if (trieLength[currentNode] > word.length) {
            trieLength[currentNode] = word.length;
            trieIndex[currentNode] = wordIndex;
        }
    }
}

/**
 * Queries the trie to find the index of the shortest word with matching suffix
 * @param word - The word to query
 * @returns The index of the shortest matching word
 */
function query(word: string): number {
    let currentNode = 0; // Start from root
  
    // Traverse the word from last character to first
    for (let charPos = word.length - 1; charPos >= 0; charPos--) {
        const charIndex = word.charCodeAt(charPos) - 'a'.charCodeAt(0);
      
        // Stop if no matching child exists
        if (trieChildren[currentNode][charIndex] === null) {
            break;
        }
      
        currentNode = trieChildren[currentNode][charIndex]!;
    }
  
    return trieIndex[currentNode];
}

/**
 * Finds indices of shortest words in wordsContainer that have matching suffixes with wordsQuery
 * @param wordsContainer - Array of words to build the trie from
 * @param wordsQuery - Array of words to query
 * @returns Array of indices corresponding to shortest matching words
 */
function stringIndices(wordsContainer: string[], wordsQuery: string[]): number[] {
    // Initialize trie data structures
    trieChildren = [];
    trieLength = [];
    trieIndex = [];
    nodeCount = 0;
  
    // Create root node
    createTrieNode();
  
    // Build trie from container words
    for (let i = 0; i < wordsContainer.length; i++) {
        insert(wordsContainer[i], i);
    }
  
    // Process queries and build result array
    const queryCount = wordsQuery.length;
    const result: number[] = new Array(queryCount);
  
    for (let i = 0; i < queryCount; i++) {
        result[i] = query(wordsQuery[i]);
    }
  
    return result;
}