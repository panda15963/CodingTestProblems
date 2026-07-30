/**
 * Determines if s2 is a scrambled string of s1.
 * A scrambled string is formed by recursively dividing the string into two non-empty substrings
 * and either keeping them in the same order or swapping them.
 * 
 * @param s1 - The first string
 * @param s2 - The second string to check if it's a scramble of s1
 * @returns true if s2 is a scrambled string of s1, false otherwise
 */
function isScramble(s1: string, s2: string): boolean {
    const length: number = s1.length;
  
    // Create a 3D memoization array to store intermediate results
    // memo[i][j][k] represents whether substring of s1 starting at index i with length k
    // can be scrambled to match substring of s2 starting at index j with length k
    // -1: not computed, 0: false, 1: true
    const memo: number[][][] = new Array(length)
        .fill(0)
        .map(() => new Array(length)
            .fill(0)
            .map(() => new Array(length + 1).fill(-1))
        );
  
    /**
     * Depth-first search with memoization to check if substrings can be scrambled
     * 
     * @param s1Start - Starting index in s1
     * @param s2Start - Starting index in s2
     * @param substringLength - Length of the substring to check
     * @returns true if the substring of s1 can be scrambled to match substring of s2
     */
    const checkScramble = (s1Start: number, s2Start: number, substringLength: number): boolean => {
        // Check if result is already computed and cached
        if (memo[s1Start][s2Start][substringLength] !== -1) {
            return memo[s1Start][s2Start][substringLength] === 1;
        }
      
        // Base case: single character comparison
        if (substringLength === 1) {
            return s1[s1Start] === s2[s2Start];
        }
      
        // Try all possible split points
        for (let splitPoint = 1; splitPoint < substringLength; splitPoint++) {
            const remainingLength: number = substringLength - splitPoint;
          
            // Case 1: No swap - check if both parts match without swapping
            if (checkScramble(s1Start, s2Start, splitPoint) && 
                checkScramble(s1Start + splitPoint, s2Start + splitPoint, remainingLength)) {
                memo[s1Start][s2Start][substringLength] = 1;
                return true;
            }
          
            // Case 2: With swap - check if parts match after swapping
            if (checkScramble(s1Start + splitPoint, s2Start, remainingLength) && 
                checkScramble(s1Start, s2Start + remainingLength, splitPoint)) {
                memo[s1Start][s2Start][substringLength] = 1;
                return true;
            }
        }
      
        // No valid scramble found
        memo[s1Start][s2Start][substringLength] = 0;
        return false;
    };
  
    return checkScramble(0, 0, length);
}
