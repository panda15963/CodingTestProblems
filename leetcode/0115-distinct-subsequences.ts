/**
 * Counts the number of distinct subsequences of string s that equal string t
 * Uses dynamic programming approach
 * 
 * @param s - The source string to search for subsequences
 * @param t - The target string to match
 * @returns The number of distinct subsequences of s that equal t
 */
function numDistinct(s: string, t: string): number {
    const sourceLength: number = s.length;
    const targetLength: number = t.length;
  
    // Create a 2D DP table where dp[i][j] represents the number of distinct subsequences
    // of s[0...i-1] that equal t[0...j-1]
    const dp: number[][] = new Array(sourceLength + 1)
        .fill(0)
        .map(() => new Array(targetLength + 1).fill(0));
  
    // Base case: empty target string can be formed by any source string in exactly one way
    // (by selecting nothing)
    for (let i = 0; i <= sourceLength; i++) {
        dp[i][0] = 1;
    }
  
    // Fill the DP table
    for (let i = 1; i <= sourceLength; i++) {
        for (let j = 1; j <= targetLength; j++) {
            // Case 1: Don't use the current character from source string
            // Inherit the count from previous source position
            dp[i][j] = dp[i - 1][j];
          
            // Case 2: If characters match, we can also use the current character
            // Add the count from diagonal (both strings reduced by one character)
            if (s[i - 1] === t[j - 1]) {
                dp[i][j] += dp[i - 1][j - 1];
            }
        }
    }
  
    // Return the final result: number of ways to form entire target from entire source
    return dp[sourceLength][targetLength];
}
