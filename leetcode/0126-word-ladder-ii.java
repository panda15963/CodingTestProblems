class Solution {
    // Store all shortest transformation sequences
    private List<List<String>> result;
    // Map to store predecessors for each word in the shortest paths
    private Map<String, Set<String>> predecessors;

    public List<List<String>> findLadders(String beginWord, String endWord, List<String> wordList) {
        result = new ArrayList<>();
      
        // Convert word list to set for O(1) lookup
        Set<String> wordSet = new HashSet<>(wordList);
      
        // Early return if endWord is not in the word list
        if (!wordSet.contains(endWord)) {
            return result;
        }
      
        // Remove beginWord from set to avoid revisiting
        wordSet.remove(beginWord);
      
        // Track the distance (steps) from beginWord to each word
        Map<String, Integer> distanceMap = new HashMap<>();
        distanceMap.put(beginWord, 0);
      
        // Initialize predecessors map
        predecessors = new HashMap<>();
      
        // BFS queue for level-order traversal
        Queue<String> queue = new ArrayDeque<>();
        queue.offer(beginWord);
      
        boolean targetFound = false;
        int currentStep = 0;
      
        // BFS to find all shortest paths
        while (!queue.isEmpty() && !targetFound) {
            currentStep++;
            int levelSize = queue.size();
          
            // Process all words at current level
            for (int i = 0; i < levelSize; i++) {
                String currentWord = queue.poll();
                char[] wordChars = currentWord.toCharArray();
              
                // Try changing each character position
                for (int charIndex = 0; charIndex < wordChars.length; charIndex++) {
                    char originalChar = wordChars[charIndex];
                  
                    // Try all possible characters a-z
                    for (char newChar = 'a'; newChar <= 'z'; newChar++) {
                        wordChars[charIndex] = newChar;
                        String transformedWord = new String(wordChars);
                      
                        // If we've seen this word at the same distance, add another predecessor
                        if (distanceMap.getOrDefault(transformedWord, 0) == currentStep) {
                            predecessors.get(transformedWord).add(currentWord);
                        }
                      
                        // Skip if word not in wordSet (already visited or invalid)
                        if (!wordSet.contains(transformedWord)) {
                            continue;
                        }
                      
                        // Record predecessor relationship
                        predecessors.computeIfAbsent(transformedWord, key -> new HashSet<>())
                                    .add(currentWord);
                      
                        // Mark as visited and add to queue
                        wordSet.remove(transformedWord);
                        queue.offer(transformedWord);
                        distanceMap.put(transformedWord, currentStep);
                      
                        // Check if we've reached the target
                        if (endWord.equals(transformedWord)) {
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
            Deque<String> currentPath = new ArrayDeque<>();
            currentPath.add(endWord);
            buildPaths(currentPath, beginWord, endWord);
        }
      
        return result;
    }

    /**
     * DFS to reconstruct all shortest paths from endWord to beginWord
     * using the predecessors map
     */
    private void buildPaths(Deque<String> currentPath, String beginWord, String currentWord) {
        // Base case: reached the beginning word
        if (currentWord.equals(beginWord)) {
            result.add(new ArrayList<>(currentPath));
            return;
        }
      
        // Recursively build paths through all predecessors
        for (String predecessor : predecessors.get(currentWord)) {
            currentPath.addFirst(predecessor);
            buildPaths(currentPath, beginWord, predecessor);
            currentPath.removeFirst();  // Backtrack
        }
    }
}