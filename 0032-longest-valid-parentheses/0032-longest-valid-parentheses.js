/**
 * Finds the length of the longest valid (well-formed) parentheses substring
 * @param {string} s - Input string containing only '(' and ')' characters
 * @return {number}
 */
var longestValidParentheses = function(s) {
    const stringLength = s.length;

    // dp[i] represents the length of the longest valid parentheses ending at index i - 1
    // We use stringLength + 1 to handle 1-indexed logic more easily
    const dp = new Array(stringLength + 1).fill(0);

    // Iterate through the string starting from index 2
    for (let i = 2; i <= stringLength; ++i) {
        // Only process if current character is ')'
        if (s[i - 1] === ')') {
            // Case 1: Previous character is '('
            if (s[i - 2] === '(') {
                dp[i] = dp[i - 2] + 2;
            }
            // Case 2: Previous character is ')'
            else {
                const indexBeforeValidSequence = i - dp[i - 1] - 1;

                // Check if there is a matching '('
                if (
                    indexBeforeValidSequence > 0 &&
                    s[indexBeforeValidSequence - 1] === '('
                ) {
                    dp[i] =
                        dp[i - 1] +
                        2 +
                        dp[indexBeforeValidSequence - 1];
                }
            }
        }
    }

    // Return the maximum value in the dp array
    return Math.max(...dp);
};