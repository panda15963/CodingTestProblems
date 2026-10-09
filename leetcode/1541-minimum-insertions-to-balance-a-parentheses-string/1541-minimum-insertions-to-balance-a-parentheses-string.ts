function minInsertions(s: string): number {
    // Count of characters we need to insert to make the string valid
    let insertionsNeeded: number = 0;
    // Count of unmatched opening parentheses '('
    let openParentheses: number = 0;
    // Length of the input string
    const n: number = s.length;
  
    // Iterate through each character in the string
    for (let i = 0; i < n; i++) {
        if (s[i] === '(') {
            // Found an opening parenthesis, increment the counter
            openParentheses++;
        } else {
            // Found a closing parenthesis ')'
            // Need to check if we have a complete pair '))'
          
            // Check if the next character is also a closing parenthesis
            if (i < n - 1 && s[i + 1] === ')') {
                // We have a complete pair '))', skip the next character
                i++;
            } else {
                // We only have a single ')', need to insert another ')' to form '))'
                insertionsNeeded++;
            }
          
            // Now we have a complete '))', check if there's a matching '(' before it
            if (openParentheses === 0) {
                // No opening parenthesis to match with this '))', need to insert a '('
                insertionsNeeded++;
            } else {
                // Match this '))' with an existing opening parenthesis
                openParentheses--;
            }
        }
    }
  
    // Each remaining unmatched opening parenthesis needs two closing parentheses '))'
    insertionsNeeded += openParentheses * 2;
  
    return insertionsNeeded;
}
