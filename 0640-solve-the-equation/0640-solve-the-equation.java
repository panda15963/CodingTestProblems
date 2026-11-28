class Solution {
    /**
     * Solves a linear equation with one variable 'x'.
     * The equation is in the form "left_side=right_side".
     * 
     * @param equation The equation string to solve
     * @return The solution: "x=value", "Infinite solutions", or "No solution"
     */
    public String solveEquation(String equation) {
        // Split the equation into left and right sides
        String[] sides = equation.split("=");
      
        // Parse both sides to get coefficients
        // Each side returns [coefficient of x, constant term]
        int[] leftSide = parseExpression(sides[0]);
        int[] rightSide = parseExpression(sides[1]);
      
        // Extract coefficients and constants
        int leftXCoefficient = leftSide[0];
        int leftConstant = leftSide[1];
        int rightXCoefficient = rightSide[0];
        int rightConstant = rightSide[1];
      
        // Rearrange equation: (leftX - rightX) * x = rightConstant - leftConstant
        // Check if coefficients of x are equal (no x terms after simplification)
        if (leftXCoefficient == rightXCoefficient) {
            // If constants are also equal, any x satisfies the equation
            // If constants are different, no solution exists
            return leftConstant == rightConstant ? "Infinite solutions" : "No solution";
        }
      
        // Calculate x value: x = (rightConstant - leftConstant) / (leftXCoefficient - rightXCoefficient)
        return "x=" + (rightConstant - leftConstant) / (leftXCoefficient - rightXCoefficient);
    }

    /**
     * Parses an expression string and extracts coefficients.
     * 
     * @param expression The expression to parse (e.g., "2x+3", "-x-5")
     * @return An array with [coefficient of x, constant term]
     */
    private int[] parseExpression(String expression) {
        int xCoefficient = 0;  // Total coefficient of x terms
        int constantTerm = 0;   // Total of constant terms
      
        // Add leading '+' if expression doesn't start with a sign
        if (expression.charAt(0) != '-') {
            expression = "+" + expression;
        }
      
        int currentIndex = 0;
        int length = expression.length();
      
        // Process each term in the expression
        while (currentIndex < length) {
            // Determine the sign of current term
            int sign = expression.charAt(currentIndex) == '+' ? 1 : -1;
            currentIndex++;
          
            // Find the end of current term (next '+' or '-' or end of string)
            int termEndIndex = currentIndex;
            while (termEndIndex < length && 
                   expression.charAt(termEndIndex) != '+' && 
                   expression.charAt(termEndIndex) != '-') {
                termEndIndex++;
            }
          
            // Extract the current term
            String term = expression.substring(currentIndex, termEndIndex);
          
            // Check if this is an x term or a constant
            if (expression.charAt(termEndIndex - 1) == 'x') {
                // This is an x term
                // If term is just "x", coefficient is 1; otherwise parse the coefficient
                int coefficient;
                if (term.length() > 1) {
                    // Extract coefficient (remove 'x' from the end)
                    coefficient = Integer.parseInt(term.substring(0, term.length() - 1));
                } else {
                    // Term is just "x", so coefficient is 1
                    coefficient = 1;
                }
                xCoefficient += sign * coefficient;
            } else {
                // This is a constant term
                constantTerm += sign * Integer.parseInt(term);
            }
          
            // Move to next term
            currentIndex = termEndIndex;
        }
      
        return new int[] {xCoefficient, constantTerm};
    }
}
