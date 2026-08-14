/**
 * Finds the maximum length of a substring where each character appears at most twice
 * @param s - The input string containing lowercase English letters
 * @returns The maximum length of a valid substring
 */
function maximumLengthSubstring(s: string): number {
    // Variable to store the maximum length found
    let maxLength: number = 0;
  
    // Array to count occurrences of each character (26 lowercase letters)
    const charCount: number[] = Array(26).fill(0);
  
    // Sliding window approach with left and right pointers
    let leftPointer: number = 0;
  
    for (let rightPointer: number = 0; rightPointer < s.length; rightPointer++) {
        // Calculate the index for the current character (0-25 for 'a'-'z')
        const currentCharIndex: number = s.charCodeAt(rightPointer) - 'a'.charCodeAt(0);
      
        // Increment the count for the current character
        charCount[currentCharIndex]++;
      
        // Shrink the window from the left if any character appears more than twice
        while (charCount[currentCharIndex] > 2) {
            const leftCharIndex: number = s.charCodeAt(leftPointer) - 'a'.charCodeAt(0);
            charCount[leftCharIndex]--;
            leftPointer++;
        }
      
        // Update the maximum length with the current window size
        const currentWindowSize: number = rightPointer - leftPointer + 1;
        maxLength = Math.max(maxLength, currentWindowSize);
    }
  
    return maxLength;
}
