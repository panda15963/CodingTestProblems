class Solution {
    public String fractionToDecimal(int numerator, int denominator) {
        // Handle zero numerator case
        if (numerator == 0) {
            return "0";
        }
      
        StringBuilder result = new StringBuilder();
      
        // Determine if result should be negative
        // XOR returns true only when signs are different
        boolean isNegative = (numerator > 0) ^ (denominator > 0);
        if (isNegative) {
            result.append("-");
        }
      
        // Convert to long to avoid integer overflow
        long dividend = Math.abs((long) numerator);
        long divisor = Math.abs((long) denominator);
      
        // Append integer part
        result.append(dividend / divisor);
      
        // Calculate remainder
        dividend %= divisor;
      
        // If remainder is 0, there's no fractional part
        if (dividend == 0) {
            return result.toString();
        }
      
        // Append decimal point for fractional part
        result.append(".");
      
        // Map to store remainder and its corresponding position in result
        // Used to detect repeating patterns
        Map<Long, Integer> remainderToPosition = new HashMap<>();
      
        // Process fractional part
        while (dividend != 0) {
            // Store current remainder and its position
            remainderToPosition.put(dividend, result.length());
          
            // Multiply remainder by 10 for next digit calculation
            dividend *= 10;
          
            // Append next digit of fractional part
            result.append(dividend / divisor);
          
            // Calculate new remainder
            dividend %= divisor;
          
            // Check if this remainder has appeared before (repeating pattern found)
            if (remainderToPosition.containsKey(dividend)) {
                // Insert opening parenthesis at the start of repeating sequence
                int repeatStartPosition = remainderToPosition.get(dividend);
                result.insert(repeatStartPosition, "(");
                // Append closing parenthesis at the end
                result.append(")");
                break;
            }
        }
      
        return result.toString();
    }
}
