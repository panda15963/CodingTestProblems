class Solution {
    /**
     * Adds/subtracts fractions in the given expression and returns the result in lowest terms.
     * @param expression String containing fractions with '+' or '-' operators (e.g., "-1/2+1/3")
     * @return The result as a fraction string in lowest terms (e.g., "-1/6")
     */
    public String fractionAddition(String expression) {
        // Initialize numerator and denominator for the result
        // 30240 is a multiple of every denominator from 1 to 10
        int numerator = 0;
        int commonDenominator = 6 * 7 * 8 * 9 * 10;  // 30240
      
        // Add leading '+' if expression starts with a number (not a sign)
        if (Character.isDigit(expression.charAt(0))) {
            expression = "+" + expression;
        }
      
        // Parse the expression
        int index = 0;
        int length = expression.length();
      
        while (index < length) {
            // Determine the sign of the current fraction
            int sign = expression.charAt(index) == '-' ? -1 : 1;
            index++;
          
            // Find the end of the current fraction
            int endIndex = index;
            while (endIndex < length && 
                   expression.charAt(endIndex) != '+' && 
                   expression.charAt(endIndex) != '-') {
                endIndex++;
            }
          
            // Extract the fraction string (e.g., "1/2")
            String fractionString = expression.substring(index, endIndex);
          
            // Split the fraction into numerator and denominator
            String[] fractionParts = fractionString.split("/");
            int currentNumerator = Integer.parseInt(fractionParts[0]);
            int currentDenominator = Integer.parseInt(fractionParts[1]);
          
            // Add the current fraction to the result using common denominator
            numerator += sign * currentNumerator * commonDenominator / currentDenominator;
          
            // Move to the next fraction
            index = endIndex;
        }
      
        // Reduce the fraction to lowest terms
        int gcdValue = gcd(Math.abs(numerator), commonDenominator);
        numerator /= gcdValue;
        commonDenominator /= gcdValue;
      
        // Return the result as a string
        return numerator + "/" + commonDenominator;
    }

    /**
     * Calculates the greatest common divisor using Euclidean algorithm.
     * @param a First number
     * @param b Second number
     * @return The GCD of a and b
     */
    private int gcd(int a, int b) {
        return b == 0 ? a : gcd(b, a % b);
    }
}
