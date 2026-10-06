/**
 * Calculates the minimum number of parentheses additions needed to make a valid parentheses string
 * @param s - Input string containing only '(' and ')' characters
 * @returns The minimum number of parentheses that must be added to make the string valid
 */
function minAddToMakeValid(s: string): number {
    // Stack to keep track of unmatched parentheses
    const unmatchedParentheses: string[] = [];
  
    // Iterate through each character in the string
    for (const character of s) {
        // Check if current character is ')' and can be matched with a '(' from the stack
        if (character === ')' && unmatchedParentheses.length > 0 && unmatchedParentheses.at(-1) === '(') {
            // Found a matching pair, remove the '(' from stack
            unmatchedParentheses.pop();
        } else {
            // Either it's an opening parenthesis or an unmatched closing parenthesis
            // Add to stack for later processing
            unmatchedParentheses.push(character);
        }
    }
  
    // The remaining items in stack are all unmatched parentheses
    // Each one needs a corresponding parenthesis to be valid
    return unmatchedParentheses.length;
}
