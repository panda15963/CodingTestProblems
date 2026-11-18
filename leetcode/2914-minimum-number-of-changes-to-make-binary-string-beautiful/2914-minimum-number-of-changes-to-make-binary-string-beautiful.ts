/**
 * Calculates the minimum number of changes needed to make the string
 * have identical characters at consecutive even-odd position pairs.
 * 
 * The algorithm processes the string in pairs (positions 0-1, 2-3, 4-5, etc.)
 * and counts how many pairs have different characters.
 * 
 * @param s - The input string to process
 * @returns The minimum number of character changes needed
 */
function minChanges(s: string): number {
    // Initialize counter for required changes
    let changeCount: number = 0;
  
    // Iterate through odd positions (1, 3, 5, ...) to check pairs
    for (let i: number = 1; i < s.length; i += 2) {
        // Check if current character differs from its preceding character
        // If they differ, we need one change to make them identical
        if (s[i] !== s[i - 1]) {
            changeCount++;
        }
    }
  
    // Return the total number of changes needed
    return changeCount;
}
