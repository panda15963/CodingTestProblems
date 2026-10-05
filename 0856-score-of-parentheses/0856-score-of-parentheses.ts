function scoreOfParentheses(s: string): number {
    let totalScore: number = 0;  // Accumulated score of all balanced parentheses
    let depth: number = 0;       // Current nesting depth (number of open parentheses)
  
    for (let i = 0; i < s.length; i++) {
        if (s[i] === '(') {
            // Opening parenthesis increases the depth
            depth++;
        } else {  // s[i] === ')'
            // Closing parenthesis decreases the depth
            depth--;
          
            // Check if this closing parenthesis forms "()" pattern
            // If previous character was '(', we have a base case "()" 
            // which contributes 2^depth to the total score
            if (s[i - 1] === '(') {
                totalScore += (1 << depth);  // Add 2^depth to score using bit shift
            }
            // Note: If previous was ')', this is just closing an outer group
            // and doesn't contribute additional score
        }
    }
  
    return totalScore;
}
