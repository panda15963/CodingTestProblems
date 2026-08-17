class Solution {
    /**
     * Evaluates the value of an arithmetic expression in Reverse Polish Notation.
     * Valid operators are +, -, *, and /.
     * Each operand may be an integer or another expression.
     * 
     * @param tokens An array of strings representing the RPN expression
     * @return The result of evaluating the expression
     */
    public int evalRPN(String[] tokens) {
        // Stack to store operands
        Deque<Integer> stack = new ArrayDeque<>();
      
        // Process each token in the expression
        for (String token : tokens) {
            // Check if token is a number (multi-digit or single digit positive number)
            if (token.length() > 1 || Character.isDigit(token.charAt(0))) {
                // Push the number onto the stack
                stack.push(Integer.parseInt(token));
            } else {
                // Token is an operator, pop two operands
                int secondOperand = stack.pop();  // Second operand (right)
                int firstOperand = stack.pop();   // First operand (left)
              
                // Perform the operation and push result back onto stack
                switch (token) {
                    case "+":
                        stack.push(firstOperand + secondOperand);
                        break;
                    case "-":
                        stack.push(firstOperand - secondOperand);
                        break;
                    case "*":
                        stack.push(firstOperand * secondOperand);
                        break;
                    case "/":
                        stack.push(firstOperand / secondOperand);
                        break;
                }
            }
        }
      
        // The final result is the only element left in the stack
        return stack.pop();
    }
}
