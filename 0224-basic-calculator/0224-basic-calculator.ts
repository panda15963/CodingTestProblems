/**
 * Evaluates a mathematical expression string containing +, -, parentheses, and numbers
 * @param s - The expression string to evaluate
 * @returns The calculated result
 */
function calculate(s: string): number {
    // Stack to store intermediate results and signs when encountering parentheses
    const stack: number[] = [];
  
    // Current sign for the next number (1 for positive, -1 for negative)
    let currentSign: number = 1;
  
    // Running result for the current expression level
    let result: number = 0;
  
    const length: number = s.length;
  
    for (let i = 0; i < length; i++) {
        const char: string = s[i];
      
        // Skip whitespace characters
        if (char === ' ') {
            continue;
        }
      
        // Handle addition operator
        if (char === '+') {
            currentSign = 1;
        } 
        // Handle subtraction operator
        else if (char === '-') {
            currentSign = -1;
        } 
        // Handle opening parenthesis - save current state and reset
        else if (char === '(') {
            // Push current result to stack
            stack.push(result);
            // Push sign before parenthesis to stack
            stack.push(currentSign);
            // Reset for new sub-expression
            result = 0;
            currentSign = 1;
        } 
        // Handle closing parenthesis - restore previous state
        else if (char === ')') {
            // Pop sign before this parenthesis group and apply it
            result *= stack.pop()!;
            // Pop and add the result from before this parenthesis group
            result += stack.pop()!;
        } 
        // Handle numeric characters
        else {
            // Parse multi-digit number
            let number: number = 0;
            let j: number = i;
          
            // Continue reading digits to form complete number
            while (j < length && !isNaN(Number(s[j])) && s[j] !== ' ') {
                number = number * 10 + (s[j].charCodeAt(0) - '0'.charCodeAt(0));
                j++;
            }
          
            // Apply sign and add to result
            result += currentSign * number;
          
            // Update index to last processed character
            i = j - 1;
        }
    }
  
    return result;
}
