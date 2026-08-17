/**
 * Evaluates the value of an arithmetic expression in Reverse Polish Notation (RPN)
 * @param tokens - Array of strings representing numbers and operators (+, -, *, /)
 * @returns The result of the expression evaluation
 */
function evalRPN(tokens: string[]): number {
    // Stack to store operands during evaluation
    const operandStack: number[] = [];
  
    // Process each token in the expression
    for (const token of tokens) {
        // Check if token is a number (including negative numbers)
        if (!isNaN(Number(token))) {
            // Push number onto the stack
            operandStack.push(Number(token));
        } else {
            // Token is an operator, pop two operands from stack
            // Note: Order matters - second operand is popped first
            const rightOperand: number = operandStack.pop()!;
            const leftOperand: number = operandStack.pop()!;
          
            // Perform the operation based on the operator type
            switch (token) {
                case '+':
                    // Addition: left + right
                    operandStack.push(leftOperand + rightOperand);
                    break;
                case '-':
                    // Subtraction: left - right
                    operandStack.push(leftOperand - rightOperand);
                    break;
                case '*':
                    // Multiplication: left * right
                    operandStack.push(leftOperand * rightOperand);
                    break;
                case '/':
                    // Division: truncate towards zero using Math.trunc
                    operandStack.push(Math.trunc(leftOperand / rightOperand));
                    break;
            }
        }
    }
  
    // The final result is the only element left in the stack
    return operandStack[0];
}