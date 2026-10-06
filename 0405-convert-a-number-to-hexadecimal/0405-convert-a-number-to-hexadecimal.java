class Solution {
    /**
     * Converts a 32-bit integer to its hexadecimal representation.
     * Handles both positive and negative numbers (negative numbers use two's complement).
     * 
     * @param num The integer to convert to hexadecimal
     * @return The hexadecimal string representation
     */
    public String toHex(int num) {
        // Handle special case: zero
        if (num == 0) {
            return "0";
        }
      
        // StringBuilder to accumulate hexadecimal digits
        StringBuilder hexBuilder = new StringBuilder();
      
        // Process the number 4 bits at a time (one hex digit = 4 bits)
        while (num != 0) {
            // Extract the rightmost 4 bits (values 0-15)
            int hexDigit = num & 0xF;  // 0xF = 15 in binary: 1111
          
            // Convert to appropriate character
            if (hexDigit < 10) {
                // For values 0-9, append the digit directly
                hexBuilder.append(hexDigit);
            } else {
                // For values 10-15, convert to 'a'-'f'
                // 10 -> 'a', 11 -> 'b', ..., 15 -> 'f'
                char hexChar = (char) (hexDigit - 10 + 'a');
                hexBuilder.append(hexChar);
            }
          
            // Logical right shift by 4 bits to process next hex digit
            // Using >>> ensures zero-fill for negative numbers
            num >>>= 4;
        }
      
        // Reverse the string since we built it from least to most significant digit
        return hexBuilder.reverse().toString();
    }
}
