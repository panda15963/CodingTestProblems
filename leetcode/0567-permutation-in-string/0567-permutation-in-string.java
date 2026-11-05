class Solution {
    public boolean checkInclusion(String s1, String s2) {
        // Count distinct characters needed to match
        int distinctCharsNeeded = 0;
        // Frequency array for characters (26 letters in alphabet)
        int[] charFrequency = new int[26];
      
        // Build frequency map for s1 and count distinct characters
        for (char ch : s1.toCharArray()) {
            int index = ch - 'a';
            charFrequency[index]++;
            // If this is the first occurrence of this character, increment distinct count
            if (charFrequency[index] == 1) {
                distinctCharsNeeded++;
            }
        }
      
        int patternLength = s1.length();
        int textLength = s2.length();
      
        // Sliding window approach
        for (int i = 0; i < textLength; i++) {
            // Add current character to window (right side)
            int currentCharIndex = s2.charAt(i) - 'a';
            charFrequency[currentCharIndex]--;
            // If frequency becomes 0, we've matched all occurrences of this character
            if (charFrequency[currentCharIndex] == 0) {
                distinctCharsNeeded--;
            }
          
            // Remove leftmost character from window if window size exceeds pattern length
            if (i >= patternLength) {
                int leftCharIndex = s2.charAt(i - patternLength) - 'a';
                charFrequency[leftCharIndex]++;
                // If frequency becomes 1, we need to match this character again
                if (charFrequency[leftCharIndex] == 1) {
                    distinctCharsNeeded++;
                }
            }
          
            // Check if all characters are matched (permutation found)
            if (distinctCharsNeeded == 0) {
                return true;
            }
        }
      
        return false;
    }
}
