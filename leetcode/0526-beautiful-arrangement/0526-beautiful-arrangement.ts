/**
 * Counts the number of beautiful arrangements for integers from 1 to n
 * A beautiful arrangement is when for every position i (1 <= i <= n):
 * - The number at position i is divisible by i, OR
 * - i is divisible by the number at position i
 */
function countArrangement(n: number): number {
    // Track which numbers have been used in the current arrangement
    const visited: boolean[] = new Array(n + 1).fill(false);
  
    // Precompute valid numbers for each position to optimize DFS
    // validNumbersForPosition[i] contains all numbers that can be placed at position i
    const validNumbersForPosition: number[][] = Array.from({ length: n + 1 }, () => []);
  
    // Build the valid numbers mapping for each position
    for (let position = 1; position <= n; position++) {
        for (let num = 1; num <= n; num++) {
            // Check if num can be placed at position (beautiful arrangement condition)
            if (position % num === 0 || num % position === 0) {
                validNumbersForPosition[position].push(num);
            }
        }
    }

    // Counter for total number of beautiful arrangements
    let totalArrangements = 0;
  
    /**
     * Depth-first search to find all beautiful arrangements
     * @param currentPosition - The current position being filled (1-indexed)
     * @param totalNumbers - Total number of positions to fill
     */
    const findArrangements = (currentPosition: number, totalNumbers: number): void => {
        // Base case: all positions have been filled successfully
        if (currentPosition === totalNumbers + 1) {
            totalArrangements++;
            return;
        }
      
        // Try placing each valid number at the current position
        for (const num of validNumbersForPosition[currentPosition]) {
            // Skip if this number has already been used
            if (!visited[num]) {
                // Mark number as used
                visited[num] = true;
              
                // Recursively fill the next position
                findArrangements(currentPosition + 1, totalNumbers);
              
                // Backtrack: unmark the number for other arrangements
                visited[num] = false;
            }
        }
    };
  
    // Start DFS from position 1
    findArrangements(1, n);
  
    return totalArrangements;
}
