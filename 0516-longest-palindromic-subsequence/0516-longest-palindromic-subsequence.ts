/**
 * Finds the length of the longest palindromic subsequence in a string
 * @param s - The input string
 * @returns The length of the longest palindromic subsequence
 */
function longestPalindromeSubseq(s: string): number {
    const length = s.length;
  
    // Create a 2D DP table where dp[i][j] represents the length of 
    // the longest palindromic subsequence in substring s[i...j]
    const dp: number[][] = Array.from({ length: length }, () => Array(length).fill(0));
  
    // Base case: every single character is a palindrome of length 1
    for (let i = 0; i < length; i++) {
        dp[i][i] = 1;
    }
  
    // Fill the DP table by iterating through all possible substrings
    // Start from the second last row and move upward
    for (let startIndex = length - 2; startIndex >= 0; startIndex--) {
        // For each starting position, check all ending positions after it
        for (let endIndex = startIndex + 1; endIndex < length; endIndex++) {
            if (s[startIndex] === s[endIndex]) {
                // If characters match, add 2 to the result of the inner substring
                dp[startIndex][endIndex] = dp[startIndex + 1][endIndex - 1] + 2;
            } else {
                // If characters don't match, take the maximum of either
                // excluding the left character or excluding the right character
                dp[startIndex][endIndex] = Math.max(
                    dp[startIndex + 1][endIndex], 
                    dp[startIndex][endIndex - 1]
                );
            }
        }
    }
  
    // The result for the entire string is stored at dp[0][length - 1]
    return dp[0][length - 1];
}
