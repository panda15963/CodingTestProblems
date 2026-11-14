/**
 * Adds and subtracts fractions from a string expression and returns the result as an irreducible fraction
 * @param expression - String containing fractions to add/subtract (e.g., "-1/2+1/3")
 * @returns The result as an irreducible fraction string (e.g., "-1/6")
 */
function fractionAddition(expression: string): string {
    // Initialize the result fraction as 0/1
    let numerator: number = 0;
    let denominator: number = 1;

    // Ensure expression starts with a sign for consistent parsing
    if (!expression.startsWith('-') && !expression.startsWith('+')) {
        expression = '+' + expression;
    }

    let currentIndex: number = 0;
    const expressionLength: number = expression.length;

    // Process each fraction in the expression
    while (currentIndex < expressionLength) {
        // Determine if current fraction should be added or subtracted
        const sign: number = expression[currentIndex] === '-' ? -1 : 1;
        currentIndex++;

        // Find the end of current fraction (next sign or end of string)
        let endIndex: number = currentIndex;
        while (endIndex < expressionLength && 
               expression[endIndex] !== '+' && 
               expression[endIndex] !== '-') {
            endIndex++;
        }

        // Extract and parse the current fraction
        const fractionString: string = expression.slice(currentIndex, endIndex);
        const [currentNumerator, currentDenominator]: number[] = fractionString
            .split('/')
            .map(Number);

        // Add/subtract current fraction to/from the accumulated result
        // Using formula: a/b + c/d = (a*d + c*b) / (b*d)
        numerator = numerator * currentDenominator + sign * currentNumerator * denominator;
        denominator *= currentDenominator;

        // Move to next fraction
        currentIndex = endIndex;
    }

    // Helper function to calculate Greatest Common Divisor using Euclidean algorithm
    const calculateGCD = (a: number, b: number): number => {
        while (b !== 0) {
            [a, b] = [b, a % b];
        }
        return Math.abs(a);
    };

    // Reduce the fraction to its simplest form
    const gcdValue: number = calculateGCD(numerator, denominator);
    numerator = Math.floor(numerator / gcdValue);
    denominator = Math.floor(denominator / gcdValue);

    // Return the result as a fraction string
    return `${numerator}/${denominator}`;
}
