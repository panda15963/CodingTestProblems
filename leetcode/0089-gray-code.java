class Solution {
    /**
     * Generates the n-bit Gray code sequence.
     * Gray code is a binary numeral system where two successive values differ in only one bit.
     * 
     * @param n the number of bits for the Gray code
     * @return a list containing the Gray code sequence in decimal representation
     */
    public List<Integer> grayCode(int n) {
        // Initialize the result list to store Gray code values
        List<Integer> result = new ArrayList<>();
      
        // Total number of Gray code values for n bits is 2^n
        int totalNumbers = 1 << n;  // Equivalent to 2^n using bit shift
      
        // Generate each Gray code value using the formula: grayCode = i XOR (i >> 1)
        for (int i = 0; i < totalNumbers; i++) {
            // Convert binary number to Gray code using XOR operation
            // The formula works by XORing each bit with the bit to its left
            int grayCodeValue = i ^ (i >> 1);
            result.add(grayCodeValue);
        }
      
        return result;
    }
}