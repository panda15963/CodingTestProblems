/**
 * Solves a linear equation in the form "ax + b = cx + d"
 * Returns the value of x, "No solution", or "Infinite solutions"
 */
function solveEquation(equation: string): string {
    // Split equation into left and right sides
    const [leftSide, rightSide] = equation.split('=');
  
    /**
     * Parses an expression string and extracts coefficients
     * @param expression - Mathematical expression string (e.g., "2x+3")
     * @returns Tuple of [xCoefficient, constantTerm]
     */
    const parseExpression = (expression: string): [number, number] => {
        let xCoefficient = 0;      // Coefficient of x terms
        let constantTerm = 0;       // Sum of constant terms
        let digitCount = 0;         // Number of digits in current number
        let sign = 1;               // Current sign (1 for positive, -1 for negative)
        let currentNumber = 0;      // Current number being parsed
        let isXTerm = false;        // Whether current term contains x
      
        for (const char of expression) {
            if (char === '+' || char === '-') {
                // Process the previous term when encountering a new operator
                if (isXTerm) {
                    // Handle coefficient for x term (default to 1 if no digits)
                    if (digitCount === 0 && currentNumber === 0) {
                        currentNumber = 1;
                    }
                    xCoefficient += currentNumber * sign;
                } else {
                    // Add constant term
                    constantTerm += currentNumber * sign;
                }
              
                // Reset for next term
                isXTerm = false;
                currentNumber = 0;
                digitCount = 0;
                sign = (char === '+') ? 1 : -1;
              
            } else if (char === 'x') {
                // Mark current term as containing x
                isXTerm = true;
              
            } else {
                // Parse digit and build current number
                digitCount++;
                currentNumber = currentNumber * 10 + Number(char);
            }
        }
      
        // Process the last term after loop ends
        if (isXTerm) {
            // Handle coefficient for x term (default to 1 if no digits)
            if (digitCount === 0 && currentNumber === 0) {
                currentNumber = 1;
            }
            xCoefficient += currentNumber * sign;
        } else {
            // Add constant term
            constantTerm += currentNumber * sign;
        }
      
        return [xCoefficient, constantTerm];
    };
  
    // Parse both sides of the equation
    const leftCoefficients = parseExpression(leftSide);
    const rightCoefficients = parseExpression(rightSide);
  
    // Extract coefficients for clarity
    const leftXCoeff = leftCoefficients[0];
    const leftConstant = leftCoefficients[1];
    const rightXCoeff = rightCoefficients[0];
    const rightConstant = rightCoefficients[1];
  
    // Check for special cases
    if (leftXCoeff === rightXCoeff) {
        // Same x coefficients on both sides
        if (leftConstant !== rightConstant) {
            // Contradiction: e.g., 3 = 5
            return 'No solution';
        }
        // Identity: e.g., 3 = 3
        return 'Infinite solutions';
    }
  
    // Solve for x: (leftXCoeff - rightXCoeff)x = rightConstant - leftConstant
    const xValue = (leftConstant - rightConstant) / (rightXCoeff - leftXCoeff);
    return `x=${xValue}`;
}
