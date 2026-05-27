class Solution {
    public int numberOfSpecialChars(String word) {
        // Arrays to track first and last occurrence positions of each character
        // Size is 'z' + 1 to accommodate all ASCII values from 'A' to 'z'
        int[] firstOccurrence = new int['z' + 1];
        int[] lastOccurrence = new int['z' + 1];
      
        // Iterate through the word and record positions (1-indexed)
        for (int i = 1; i <= word.length(); i++) {
            char currentChar = word.charAt(i - 1);
          
            // Record first occurrence if not yet recorded
            if (firstOccurrence[currentChar] == 0) {
                firstOccurrence[currentChar] = i;
            }
          
            // Always update last occurrence
            lastOccurrence[currentChar] = i;
        }
      
        // Count special characters
        int specialCharCount = 0;
      
        // Check each letter of the alphabet
        for (int i = 0; i < 26; i++) {
            char lowercaseLetter = (char) ('a' + i);
            char uppercaseLetter = (char) ('A' + i);
          
            // A character is special if:
            // 1. Its lowercase version exists (lastOccurrence > 0)
            // 2. Its uppercase version exists (firstOccurrence > 0)
            // 3. All lowercase occurrences come before all uppercase occurrences
            if (lastOccurrence[lowercaseLetter] > 0 && 
                firstOccurrence[uppercaseLetter] > 0 && 
                lastOccurrence[lowercaseLetter] < firstOccurrence[uppercaseLetter]) {
                specialCharCount++;
            }
        }
      
        return specialCharCount;
    }
}
