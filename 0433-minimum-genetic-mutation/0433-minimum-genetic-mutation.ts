/**
 * Finds the minimum number of mutations to transform startGene to endGene
 * using valid gene mutations from the bank
 * @param startGene - The starting gene string
 * @param endGene - The target gene string
 * @param bank - Array of valid intermediate gene mutations
 * @returns Minimum number of mutations needed, or -1 if transformation is impossible
 */
function minMutation(startGene: string, endGene: string, bank: string[]): number {
    // BFS queue storing [current gene, number of mutations to reach it]
    const queue: [string, number][] = [[startGene, 0]];
  
    // Set to track visited genes to avoid revisiting
    const visited = new Set<string>([startGene]);
  
    // Process queue using BFS
    for (const [currentGene, mutationCount] of queue) {
        // Check if we've reached the target gene
        if (currentGene === endGene) {
            return mutationCount;
        }
      
        // Try all possible next mutations from the bank
        for (const nextGene of bank) {
            // Count allowed differences (max 1 difference for valid mutation)
            let allowedDifferences = 2;
          
            // Check character differences between current and next gene
            for (let charIndex = 0; charIndex < 8 && allowedDifferences > 0; charIndex++) {
                if (currentGene[charIndex] !== nextGene[charIndex]) {
                    allowedDifferences--;
                }
            }
          
            // If exactly 1 difference found and gene not visited, add to queue
            if (allowedDifferences === 1 && !visited.has(nextGene)) {
                queue.push([nextGene, mutationCount + 1]);
                visited.add(nextGene);
            }
        }
    }
  
    // No valid transformation path found
    return -1;
}
