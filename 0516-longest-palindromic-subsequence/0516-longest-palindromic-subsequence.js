/**
 * Finds the length of the longest palindromic subsequence in a string.
 * @param {string} s - The input string.
 * @return {number} The length of the longest palindromic subsequence.
 */
var longestPalindromeSubseq = function(s) {
    const length = s.length;

    if (length === 0) {
        return 0;
    }

    // dp[i][j] represents the length of the longest palindromic
    // subsequence in the substring s[i...j].
    const dp = Array.from(
        { length },
        () => Array(length).fill(0)
    );

    // Every single character is a palindrome of length 1.
    for (let i = 0; i < length; i++) {
        dp[i][i] = 1;
    }

    // Fill the DP table from shorter substrings to longer substrings.
    for (let startIndex = length - 2; startIndex >= 0; startIndex--) {
        for (let endIndex = startIndex + 1; endIndex < length; endIndex++) {
            if (s[startIndex] === s[endIndex]) {
                dp[startIndex][endIndex] =
                    dp[startIndex + 1][endIndex - 1] + 2;
            } else {
                dp[startIndex][endIndex] = Math.max(
                    dp[startIndex + 1][endIndex],
                    dp[startIndex][endIndex - 1]
                );
            }
        }
    }

    return dp[0][length - 1];
};