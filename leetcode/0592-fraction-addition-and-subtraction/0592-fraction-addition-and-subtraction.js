/**
 * @param {string} expression
 * @return {string}
 */
var fractionAddition = function(expression) {
    // Initialize the result fraction as 0/1
    let numerator = 0;
    let denominator = 1;

    // Ensure expression starts with a sign for consistent parsing
    if (!expression.startsWith('-') && !expression.startsWith('+')) {
        expression = '+' + expression;
    }

    let currentIndex = 0;
    const expressionLength = expression.length;

    // Process each fraction in the expression
    while (currentIndex < expressionLength) {
        // Determine if current fraction should be added or subtracted
        const sign = expression[currentIndex] === '-' ? -1 : 1;
        currentIndex++;

        // Find the end of current fraction
        let endIndex = currentIndex;

        while (
            endIndex < expressionLength &&
            expression[endIndex] !== '+' &&
            expression[endIndex] !== '-'
        ) {
            endIndex++;
        }

        // Extract and parse the current fraction
        const fractionString = expression.slice(currentIndex, endIndex);

        const [currentNumerator, currentDenominator] = fractionString
            .split('/')
            .map(Number);

        // Add/subtract current fraction to/from the accumulated result
        numerator = numerator * currentDenominator +
                    sign * currentNumerator * denominator;

        denominator *= currentDenominator;

        // Move to next fraction
        currentIndex = endIndex;
    }

    // Helper function to calculate Greatest Common Divisor
    // using Euclidean algorithm
    const calculateGCD = (a, b) => {
        while (b !== 0) {
            [a, b] = [b, a % b];
        }

        return Math.abs(a);
    };

    // Reduce the fraction to its simplest form
    const gcdValue = calculateGCD(numerator, denominator);

    numerator = Math.floor(numerator / gcdValue);
    denominator = Math.floor(denominator / gcdValue);

    // Return the result as a fraction string
    return `${numerator}/${denominator}`;
};