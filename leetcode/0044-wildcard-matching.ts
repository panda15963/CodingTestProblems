/**
 * Checks if a string matches a pattern with wildcard support
 * @param s - The input string to match
 * @param p - The pattern string where '?' matches any single character and '*' matches any sequence
 * @returns true if the string matches the pattern, false otherwise
 */
function isMatch(s: string, p: string): boolean {
    const stringLength = s.length;
    const patternLength = p.length;
  
    // Initialize memoization table with -1 (unvisited state)
    // dp[i][j] represents whether s[i:] matches p[j:]
    // -1: unvisited, 0: false, 1: true
    const memoTable: number[][] = Array.from(
        { length: stringLength + 1 }, 
        () => Array.from({ length: patternLength + 1 }, () => -1)
    );
  
    /**
     * Recursive helper function with memoization to check pattern matching
     * @param stringIndex - Current index in the string s
     * @param patternIndex - Current index in the pattern p
     * @returns true if s[stringIndex:] matches p[patternIndex:]
     */
    const matchHelper = (stringIndex: number, patternIndex: number): boolean => {
        // Base case: reached end of string
        if (stringIndex >= stringLength) {
            // Check if we've also reached end of pattern or remaining pattern is '*'
            return patternIndex >= patternLength || 
                   (p[patternIndex] === '*' && matchHelper(stringIndex, patternIndex + 1));
        }
      
        // Base case: reached end of pattern but not end of string
        if (patternIndex >= patternLength) {
            return false;
        }
      
        // Check memoization table for previously computed result
        if (memoTable[stringIndex][patternIndex] !== -1) {
            return memoTable[stringIndex][patternIndex] === 1;
        }
      
        // Handle wildcard '*' - can match zero or more characters
        if (p[patternIndex] === '*') {
            // Try matching '*' with current character (stay at same pattern position)
            // OR skip '*' (move to next pattern position)
            const matchResult = matchHelper(stringIndex + 1, patternIndex) || 
                               matchHelper(stringIndex, patternIndex + 1);
            memoTable[stringIndex][patternIndex] = matchResult ? 1 : 0;
        } else {
            // Handle '?' wildcard or exact character match
            // '?' matches any single character, or characters must match exactly
            const matchResult = (p[patternIndex] === '?' || s[stringIndex] === p[patternIndex]) && 
                               matchHelper(stringIndex + 1, patternIndex + 1);
            memoTable[stringIndex][patternIndex] = matchResult ? 1 : 0;
        }
      
        return memoTable[stringIndex][patternIndex] === 1;
    };
  
    // Start matching from the beginning of both strings
    return matchHelper(0, 0);
}
