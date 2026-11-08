/**
 * Calculates the minimum edit distance between two strings using dynamic programming.
 * This computes the minimum number of deletions required to make two strings equal.
 * 
 * @param word1 - The first string to compare
 * @param word2 - The second string to compare
 * @returns The minimum number of deletion operations needed
 */
function minDistance(word1: string, word2: string): number {
    const word1Length: number = word1.length;
    const word2Length: number = word2.length;
  
    // Create a 2D DP table where dp[i][j] represents the minimum deletions
    // needed to make word1[0...i-1] and word2[0...j-1] equal
    const dpTable: number[][] = Array.from(
        { length: word1Length + 1 }, 
        () => Array(word2Length + 1).fill(0)
    );
  
    // Initialize base case: deleting all characters from word1 to match empty word2
    for (let i = 1; i <= word1Length; i++) {
        dpTable[i][0] = i;
    }
  
    // Initialize base case: deleting all characters from word2 to match empty word1
    for (let j = 1; j <= word2Length; j++) {
        dpTable[0][j] = j;
    }
  
    // Fill the DP table using bottom-up approach
    for (let i = 1; i <= word1Length; i++) {
        for (let j = 1; j <= word2Length; j++) {
            // If characters match, no deletion needed at this position
            if (word1[i - 1] === word2[j - 1]) {
                dpTable[i][j] = dpTable[i - 1][j - 1];
            } else {
                // Characters don't match, take minimum of:
                // 1. Delete from word1: dpTable[i - 1][j] + 1
                // 2. Delete from word2: dpTable[i][j - 1] + 1
                dpTable[i][j] = Math.min(
                    dpTable[i - 1][j],    // Delete character from word1
                    dpTable[i][j - 1]     // Delete character from word2
                ) + 1;
            }
        }
    }
  
    // Return the minimum deletions needed for entire strings
    return dpTable[word1Length][word2Length];
}
