class Solution {
    /**
     * Converts an Excel column title to its corresponding column number.
     * For example: A -> 1, B -> 2, Z -> 26, AA -> 27, AB -> 28
     * 
     * @param columnTitle The Excel column title string (e.g., "AB", "ZY")
     * @return The corresponding column number
     */
    public int titleToNumber(String columnTitle) {
        int result = 0;
      
        // Iterate through each character in the column title
        for (int i = 0; i < columnTitle.length(); i++) {
            // Get the current character
            char currentChar = columnTitle.charAt(i);
          
            // Convert character to its corresponding value (A=1, B=2, ..., Z=26)
            int charValue = currentChar - 'A' + 1;
          
            // Build the result using base-26 conversion
            // Multiply previous result by 26 (like shifting digits in base-26)
            // Then add the current character's value
            result = result * 26 + charValue;
        }
      
        return result;
    }
}
