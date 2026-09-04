function calculate(s: string): number {
    let currentNumber = 0;
    const n = s.length;
    let previousOperator = '+';  // Initialize with '+' to handle the first number
    const numberStack: number[] = [];
  
    for (let i = 0; i < n; i++) {
        const currentChar = s[i];
      
        // Build multi-digit numbers
        if (isDigit(currentChar)) {
            currentNumber = currentNumber * 10 + (currentChar.charCodeAt(0) - '0'.charCodeAt(0));
        }
      
        // Process when we encounter an operator or reach the end of string
        // Note: We also need to check i === n - 1 to process the last number
        if (i === n - 1 || currentChar === '+' || currentChar === '-' || 
            currentChar === '*' || currentChar === '/') {
          
            // Apply the previous operator to the current number
            if (previousOperator === '+') {
                // Push positive number to stack
                numberStack.push(currentNumber);
            } else if (previousOperator === '-') {
                // Push negative number to stack
                numberStack.push(-currentNumber);
            } else if (previousOperator === '*') {
                // Multiply with the top of stack
                const topValue = numberStack.pop()!;
                numberStack.push(topValue * currentNumber);
            } else {  // previousOperator === '/'
                // Divide the top of stack by current number
                const topValue = numberStack.pop()!;
                // Use Math.trunc for integer division (truncates towards zero)
                numberStack.push(Math.trunc(topValue / currentNumber));
            }
          
            // Update operator for next iteration
            previousOperator = currentChar;
            // Reset current number for next parsing
            currentNumber = 0;
        }
    }
  
    // Sum all numbers in the stack to get the final result
    let result = 0;
    while (numberStack.length > 0) {
        result += numberStack.pop()!;
    }
  
    return result;
}

// Helper function to check if a character is a digit
function isDigit(char: string): boolean {
    return char >= '0' && char <= '9';
}
