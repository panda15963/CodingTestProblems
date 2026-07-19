/**
 * Finds the lexicographically smallest subsequence that contains all unique characters from the input string
 * @param s - The input string containing lowercase English letters
 * @returns The lexicographically smallest subsequence with all unique characters
 */
function smallestSubsequence(s: string): string {
    /**
     * Converts a character to its index (0-25) based on lowercase alphabet
     * @param char - A lowercase letter
     * @returns The index of the character (a=0, b=1, ..., z=25)
     */
    const charToIndex = (char: string): number => {
        return char.charCodeAt(0) - 'a'.charCodeAt(0);
    };
  
    // Array to store the last occurrence index of each character in the string
    const lastOccurrence: number[] = new Array(26).fill(0);
  
    // Record the last occurrence position for each character
    for (const [index, char] of [...s].entries()) {
        lastOccurrence[charToIndex(char)] = index;
    }
  
    // Stack to build the result subsequence
    const stack: string[] = [];
  
    // Bitmask to track which characters are already in the stack
    // Each bit represents whether a character (a-z) is present
    let charPresenceMask: number = 0;
  
    // Process each character in the string
    for (const [currentIndex, currentChar] of [...s].entries()) {
        const currentCharIndex: number = charToIndex(currentChar);
      
        // Skip if this character is already in our result stack
        if ((charPresenceMask >> currentCharIndex) & 1) {
            continue;
        }
      
        // Remove characters from stack that are:
        // 1. Lexicographically greater than current character
        // 2. Will appear again later in the string
        while (stack.length > 0 && 
               stack[stack.length - 1] > currentChar && 
               lastOccurrence[charToIndex(stack[stack.length - 1])] > currentIndex) {
            // Remove the character from stack and update the presence mask
            const removedChar: string = stack.pop()!;
            charPresenceMask ^= 1 << charToIndex(removedChar);
        }
      
        // Add current character to stack
        stack.push(currentChar);
      
        // Mark current character as present in the stack
        charPresenceMask |= 1 << currentCharIndex;
    }
  
    // Join the stack to form the final result string
    return stack.join('');
}