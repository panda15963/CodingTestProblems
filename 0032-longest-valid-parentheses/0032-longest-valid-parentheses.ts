/**
 * Finds the length of the longest valid (well-formed) parentheses substring
 * @param s - Input string containing only '(' and ')' characters
 * @returns The length of the longest valid parentheses substring
 */
function longestValidParentheses(s: string): number {
    const stringLength: number = s.length;
  
    // dp[i] represents the length of the longest valid parentheses ending at index i-1
    // We use stringLength + 1 to handle 1-indexed logic more easily
    const dp: number[] = new Array(stringLength + 1).fill(0);
  
    // Iterate through the string starting from index 2 (since we need at least 2 characters)
    for (let i = 2; i <= stringLength; ++i) {
        // Only process if current character is a closing parenthesis
        if (s[i - 1] === ')') {
            // Case 1: Previous character is '(', forming a pair "()"
            if (s[i - 2] === '(') {
                // Add 2 for the current pair plus any valid sequence before it
                dp[i] = dp[i - 2] + 2;
            } 
            // Case 2: Previous character is ')', need to check if we can form a valid sequence
            else {
                // Find the index before the start of the valid sequence ending at i-1
                const indexBeforeValidSequence: number = i - dp[i - 1] - 1;
              
                // Check if there's a matching '(' for the current ')'
                if (indexBeforeValidSequence > 0 && s[indexBeforeValidSequence - 1] === '(') {
                    // Current valid length = previous valid length + 2 (for new pair) + 
                    // any valid sequence before the matching '('
                    dp[i] = dp[i - 1] + 2 + dp[indexBeforeValidSequence - 1];
                }
            }
        }
    }
  
    // Return the maximum value in the dp array
    return Math.max(...dp);
}