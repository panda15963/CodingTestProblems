/**
 * Calculates the maximum depth of nested parentheses in a string
 * @param s - Input string containing parentheses and other characters
 * @returns The maximum nesting depth of valid parentheses
 */
function maxDepth(s: string): number {
    // Track the maximum depth encountered
    let maxDepthFound: number = 0;
  
    // Track the current depth while traversing
    let currentDepth: number = 0;
  
    // Iterate through each character in the string
    for (const character of s) {
        if (character === '(') {
            // Opening parenthesis increases current depth
            currentDepth++;
            // Update maximum depth if current depth is greater
            maxDepthFound = Math.max(maxDepthFound, currentDepth);
        } else if (character === ')') {
            // Closing parenthesis decreases current depth
            currentDepth--;
        }
        // Other characters are ignored
    }
  
    return maxDepthFound;
}
