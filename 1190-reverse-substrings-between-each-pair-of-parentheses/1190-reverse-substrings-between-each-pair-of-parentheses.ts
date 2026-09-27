/**
 * Reverses the substrings within each pair of parentheses, starting from the innermost ones.
 * The parentheses themselves are removed from the result.
 * 
 * @param s - The input string containing parentheses
 * @returns The string with all parentheses removed and their contents reversed
 */
function reverseParentheses(s: string): string {
    // Stack to store characters and handle nested parentheses
    const characterStack: string[] = [];
  
    // Process each character in the input string
    for (const currentChar of s) {
        if (currentChar === ')') {
            // When closing parenthesis is found, extract and reverse the substring
            const tempCharacters: string[] = [];
          
            // Pop characters until we find the matching opening parenthesis
            while (characterStack[characterStack.length - 1] !== '(') {
                tempCharacters.push(characterStack.pop()!);
            }
          
            // Remove the opening parenthesis from stack
            characterStack.pop();
          
            // Push the reversed substring back to stack (already in reversed order due to popping)
            characterStack.push(...tempCharacters);
        } else {
            // Push regular characters and opening parenthesis to stack
            characterStack.push(currentChar);
        }
    }
  
    // Join all remaining characters to form the final result
    return characterStack.join('');
}
