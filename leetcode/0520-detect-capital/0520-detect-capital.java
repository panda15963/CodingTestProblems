class Solution {
    /**
     * Detects if the capitalization in a word follows valid patterns.
     * Valid patterns are:
     * 1. All letters are capitals (e.g., "USA")
     * 2. All letters are lowercase (e.g., "leetcode")
     * 3. Only the first letter is capital (e.g., "Google")
     * 
     * @param word the input string to check
     * @return true if the word uses capitals correctly, false otherwise
     */
    public boolean detectCapitalUse(String word) {
        // Count the number of uppercase letters in the word
        int uppercaseCount = 0;
      
        // Iterate through each character in the word
        for (char character : word.toCharArray()) {
            // Check if current character is uppercase
            if (Character.isUpperCase(character)) {
                uppercaseCount++;
            }
        }
      
        // Check if the word matches one of the three valid patterns:
        // 1. No uppercase letters (all lowercase)
        // 2. All uppercase letters
        // 3. Exactly one uppercase letter at the beginning
        return uppercaseCount == 0 || 
               uppercaseCount == word.length() || 
               (uppercaseCount == 1 && Character.isUpperCase(word.charAt(0)));
    }
}
