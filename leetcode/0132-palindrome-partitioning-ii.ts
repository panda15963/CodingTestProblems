/**
 * Finds the minimum number of cuts needed to partition a string into palindromes
 * @param s - The input string to partition
 * @returns The minimum number of cuts needed
 */
function minCut(s: string): number {
    const length: number = s.length;
  
    // isPalindrome[i][j] indicates whether substring s[i...j] is a palindrome
    const isPalindrome: boolean[][] = Array.from(
        { length: length }, 
        () => Array(length).fill(true)
    );
  
    // Build palindrome lookup table using dynamic programming
    // Start from the end of string and work backwards
    for (let startIndex = length - 1; startIndex >= 0; startIndex--) {
        for (let endIndex = startIndex + 1; endIndex < length; endIndex++) {
            // A substring is palindrome if:
            // 1. Characters at both ends match
            // 2. Inner substring is also a palindrome (or length <= 2)
            isPalindrome[startIndex][endIndex] = 
                s[startIndex] === s[endIndex] && 
                isPalindrome[startIndex + 1][endIndex - 1];
        }
    }
  
    // minCuts[i] represents minimum cuts needed for substring s[0...i]
    // Initialize with worst case: i cuts (each character as separate palindrome)
    const minCuts: number[] = Array.from(
        { length: length }, 
        (_, index) => index
    );
  
    // Calculate minimum cuts for each position
    for (let endPos = 1; endPos < length; endPos++) {
        for (let startPos = 0; startPos <= endPos; startPos++) {
            // If s[startPos...endPos] is a palindrome
            if (isPalindrome[startPos][endPos]) {
                if (startPos === 0) {
                    // Entire substring from beginning is palindrome, no cuts needed
                    minCuts[endPos] = 0;
                } else {
                    // One cut after position (startPos - 1) plus previous minimum cuts
                    minCuts[endPos] = Math.min(
                        minCuts[endPos], 
                        1 + minCuts[startPos - 1]
                    );
                }
            }
        }
    }
  
    // Return minimum cuts for entire string
    return minCuts[length - 1];
}
