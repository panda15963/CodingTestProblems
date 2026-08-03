/**
 * Restores all possible valid IP addresses from a given string of digits
 * @param s - String containing only digits
 * @returns Array of all possible valid IP addresses
 */
function restoreIpAddresses(s: string): string[] {
    const inputLength: number = s.length;
    const validIpAddresses: string[] = [];
    const currentSegments: string[] = [];
  
    /**
     * Depth-first search to explore all possible IP address combinations
     * @param currentIndex - Current position in the input string
     */
    const performDFS = (currentIndex: number): void => {
        // Base case: Successfully formed a valid IP with 4 segments
        if (currentIndex >= inputLength && currentSegments.length === 4) {
            validIpAddresses.push(currentSegments.join('.'));
            return;
        }
      
        // Pruning: Stop if we've processed all characters or already have 4 segments
        if (currentIndex >= inputLength || currentSegments.length === 4) {
            return;
        }
      
        let currentNumber: number = 0;
      
        // Try segments of length 1, 2, or 3 digits
        for (let endIndex = currentIndex; endIndex < currentIndex + 3 && endIndex < inputLength; ++endIndex) {
            // Build the current number digit by digit
            currentNumber = currentNumber * 10 + s[endIndex].charCodeAt(0) - '0'.charCodeAt(0);
          
            // Validation: Check if number exceeds 255 or has leading zeros
            if (currentNumber > 255 || (endIndex > currentIndex && s[currentIndex] === '0')) {
                break;
            }
          
            // Add current segment to the path
            currentSegments.push(currentNumber.toString());
          
            // Recursively explore with the next position
            performDFS(endIndex + 1);
          
            // Backtrack: Remove the current segment to try other possibilities
            currentSegments.pop();
        }
    };
  
    // Start the DFS from index 0
    performDFS(0);
  
    return validIpAddresses;
}