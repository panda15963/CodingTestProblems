class Solution {
    public int minMutation(String startGene, String endGene, String[] bank) {
        // Initialize BFS queue with the starting gene
        Deque<String> queue = new ArrayDeque<>();
        queue.offer(startGene);
      
        // Track visited genes to avoid cycles
        Set<String> visited = new HashSet<>();
        visited.add(startGene);
      
        // Track the number of mutations (BFS depth)
        int mutationSteps = 0;
      
        // BFS traversal
        while (!queue.isEmpty()) {
            // Process all genes at current level
            int levelSize = queue.size();
            for (int i = 0; i < levelSize; i++) {
                String currentGene = queue.poll();
              
                // Check if we've reached the target gene
                if (currentGene.equals(endGene)) {
                    return mutationSteps;
                }
              
                // Try mutating to each gene in the bank
                for (String candidateGene : bank) {
                    // Count differences between current gene and candidate gene
                    // Allow at most 1 difference (single mutation)
                    int allowedDifferences = 2;  // Start with 2 to check for exactly 1 difference
                    for (int j = 0; j < 8 && allowedDifferences > 0; j++) {
                        if (currentGene.charAt(j) != candidateGene.charAt(j)) {
                            allowedDifferences--;
                        }
                    }
                  
                    // If exactly one mutation difference and not visited, add to queue
                    if (allowedDifferences > 0 && !visited.contains(candidateGene)) {
                        queue.offer(candidateGene);
                        visited.add(candidateGene);
                    }
                }
            }
            // Increment mutation steps after processing current level
            mutationSteps++;
        }
      
        // No valid mutation path found
        return -1;
    }
}
