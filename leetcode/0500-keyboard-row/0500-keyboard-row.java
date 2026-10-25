class Solution {
    public String[] findWords(String[] words) {
        // Mapping of each letter (a-z) to keyboard row number (0, 1, or 2)
        // Each character position corresponds to a letter: index 0 = 'a', index 1 = 'b', etc.
        // '0' = first row (qwertyuiop), '1' = second row (asdfghjkl), '2' = third row (zxcvbnm)
        String keyboardRowMapping = "12210111011122000010020202";
      
        // List to store words that can be typed using letters from only one keyboard row
        List<String> validWords = new ArrayList<>();
      
        // Check each word in the input array
        for (String word : words) {
            // Convert word to lowercase for case-insensitive comparison
            String lowercaseWord = word.toLowerCase();
          
            // Get the keyboard row of the first character
            char targetRow = keyboardRowMapping.charAt(lowercaseWord.charAt(0) - 'a');
          
            // Flag to track if all characters are in the same row
            boolean isValidWord = true;
          
            // Check if all characters in the word belong to the same keyboard row
            for (char character : lowercaseWord.toCharArray()) {
                if (keyboardRowMapping.charAt(character - 'a') != targetRow) {
                    isValidWord = false;
                    break;
                }
            }
          
            // Add the original word to result if all characters are in the same row
            if (isValidWord) {
                validWords.add(word);
            }
        }
      
        // Convert list to array and return
        return validWords.toArray(new String[0]);
    }
}
