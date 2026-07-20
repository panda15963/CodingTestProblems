class Solution {
    public String multiply(String num1, String num2) {
        // Handle edge case: if either number is "0", product is "0"
        if ("0".equals(num1) || "0".equals(num2)) {
            return "0";
        }
      
        // Get lengths of both input strings
        int length1 = num1.length();
        int length2 = num2.length();
      
        // Initialize result array with maximum possible length
        // Product of m-digit and n-digit numbers has at most (m + n) digits
        int[] productArray = new int[length1 + length2];
      
        // Perform multiplication digit by digit from right to left
        for (int i = length1 - 1; i >= 0; i--) {
            // Extract digit from num1
            int digit1 = num1.charAt(i) - '0';
          
            for (int j = length2 - 1; j >= 0; j--) {
                // Extract digit from num2
                int digit2 = num2.charAt(j) - '0';
              
                // Multiply digits and add to corresponding position
                // Position (i + j + 1) stores the product of digits at positions i and j
                productArray[i + j + 1] += digit1 * digit2;
            }
        }
      
        // Handle carries from right to left
        for (int i = productArray.length - 1; i > 0; i--) {
            // Add carry to the previous position
            productArray[i - 1] += productArray[i] / 10;
            // Keep only the single digit at current position
            productArray[i] %= 10;
        }
      
        // Skip leading zero if present (product might have one less digit than maximum)
        int startIndex = productArray[0] == 0 ? 1 : 0;
      
        // Build the result string
        StringBuilder result = new StringBuilder();
        for (int i = startIndex; i < productArray.length; i++) {
            result.append(productArray[i]);
        }
      
        return result.toString();
    }
}
