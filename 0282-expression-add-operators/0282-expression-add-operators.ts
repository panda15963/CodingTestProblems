// Store all valid expressions that evaluate to target
let result: string[];
// Input number string
let numString: string;
// Target value to achieve
let targetValue: number;

/**
 * Find all possible expressions by adding operators (+, -, *) between digits
 * that evaluate to the target value
 * @param num String containing digits
 * @param target Target value for expressions
 * @return List of valid expressions
 */
function addOperators(num: string, target: number): string[] {
    result = [];
    numString = num;
    targetValue = target;
  
    // Start DFS from index 0 with initial values
    backtrack(0, 0, 0, "");
    return result;
}

/**
 * Recursive backtracking to generate all possible expressions
 * @param index Current position in the number string
 * @param previousOperand Value of the previous operand (for handling multiplication precedence)
 * @param currentValue Current evaluation result of the expression
 * @param expression Current expression being built
 */
function backtrack(index: number, previousOperand: number, currentValue: number, expression: string): void {
    // Base case: reached end of string
    if (index === numString.length) {
        // Check if current expression evaluates to target
        if (currentValue === targetValue) {
            result.push(expression);
        }
        return;
    }
  
    // Try different lengths of numbers starting from current index
    for (let endIndex = index; endIndex < numString.length; endIndex++) {
        // Skip numbers with leading zeros (except single digit 0)
        if (endIndex !== index && numString.charAt(index) === '0') {
            break;
        }
      
        // Extract current number from substring
        const currentNumber = Number(numString.substring(index, endIndex + 1));
      
        // First number in expression (no operator before it)
        if (index === 0) {
            backtrack(endIndex + 1, currentNumber, currentNumber, expression + currentNumber);
        } else {
            // Try addition operator
            backtrack(endIndex + 1, currentNumber, currentValue + currentNumber, 
                     expression + "+" + currentNumber);
          
            // Try subtraction operator
            backtrack(endIndex + 1, -currentNumber, currentValue - currentNumber, 
                     expression + "-" + currentNumber);
          
            // Try multiplication operator (need to handle precedence)
            // Undo the previous operation and apply multiplication first
            backtrack(endIndex + 1, previousOperand * currentNumber, 
                     currentValue - previousOperand + previousOperand * currentNumber, 
                     expression + "*" + currentNumber);
        }
    }
}
