// Store all shortest transformation sequences
let result: string[][];
// Map to store predecessors for each word in the shortest paths
let predecessors: Map<string, Set<string>>;

function findLadders(beginWord: string, endWord: string, wordList: string[]): string[][] {
    result = [];
  
    // Convert word list to set for O(1) lookup
    const wordSet = new Set<string>(wordList);
  
    // Early return if endWord is not in the word list
    if (!wordSet.has(endWord)) {
        return result;
    }
  
    // Remove beginWord from set to avoid revisiting
    wordSet.delete(beginWord);
  
    // Track the distance (steps) from beginWord to each word
    const distanceMap = new Map<string, number>();
    distanceMap.set(beginWord, 0);
  
    // Initialize predecessors map
    predecessors = new Map<string, Set<string>>();
  
    // BFS queue for level-order traversal
    const queue: string[] = [];
    queue.push(beginWord);
  
    let targetFound = false;
    let currentStep = 0;
  
    // BFS to find all shortest paths
    while (queue.length > 0 && !targetFound) {
        currentStep++;
        const levelSize = queue.length;
      
        // Process all words at current level
        for (let i = 0; i < levelSize; i++) {
            const currentWord = queue.shift()!;
            const wordChars = currentWord.split('');
          
            // Try changing each character position
            for (let charIndex = 0; charIndex < wordChars.length; charIndex++) {
                const originalChar = wordChars[charIndex];
              
                // Try all possible characters a-z
                for (let charCode = 97; charCode <= 122; charCode++) {
                    const newChar = String.fromCharCode(charCode);
                    wordChars[charIndex] = newChar;
                    const transformedWord = wordChars.join('');
                  
                    // If we've seen this word at the same distance, add another predecessor
                    if ((distanceMap.get(transformedWord) ?? 0) === currentStep) {
                        predecessors.get(transformedWord)?.add(currentWord);
                    }
                  
                    // Skip if word not in wordSet (already visited or invalid)
                    if (!wordSet.has(transformedWord)) {
                        continue;
                    }
                  
                    // Record predecessor relationship
                    if (!predecessors.has(transformedWord)) {
                        predecessors.set(transformedWord, new Set<string>());
                    }
                    predecessors.get(transformedWord)!.add(currentWord);
                  
                    // Mark as visited and add to queue
                    wordSet.delete(transformedWord);
                    queue.push(transformedWord);
                    distanceMap.set(transformedWord, currentStep);
                  
                    // Check if we've reached the target
                    if (endWord === transformedWord) {
                        targetFound = true;
                    }
                }
              
                // Restore original character
                wordChars[charIndex] = originalChar;
            }
        }
    }
  
    // If target was found, reconstruct all shortest paths using DFS
    if (targetFound) {
        const currentPath: string[] = [endWord];
        buildPaths(currentPath, beginWord, endWord);
    }
  
    return result;
}

/**
 * DFS to reconstruct all shortest paths from endWord to beginWord
 * using the predecessors map
 */
function buildPaths(currentPath: string[], beginWord: string, currentWord: string): void {
    // Base case: reached the beginning word
    if (currentWord === beginWord) {
        result.push([...currentPath]);
        return;
    }
  
    // Recursively build paths through all predecessors
    const currentPredecessors = predecessors.get(currentWord);
    if (currentPredecessors) {
        for (const predecessor of currentPredecessors) {
            currentPath.unshift(predecessor);
            buildPaths(currentPath, beginWord, predecessor);
            currentPath.shift(); // Backtrack
        }
    }
}
