class Solution {
    /**
     * Finds the index of the first non-repeating character in a string.
     * 
     * @param s The input string containing only lowercase English letters
     * @return The index of the first unique character, or -1 if none exists
     */
    public int firstUniqChar(String s) {
        // Array to store frequency count for each lowercase letter (a-z)
        int[] frequencyCount = new int[26];
        int stringLength = s.length();
      
        // First pass: Count the frequency of each character
        for (int i = 0; i < stringLength; i++) {
            // Map character to array index (0-25) by subtracting 'a'
            int charIndex = s.charAt(i) - 'a';
            frequencyCount[charIndex]++;
        }
      
        // Second pass: Find the first character with frequency of 1
        for (int i = 0; i < stringLength; i++) {
            int charIndex = s.charAt(i) - 'a';
            // Check if current character appears exactly once
            if (frequencyCount[charIndex] == 1) {
                return i;
            }
        }
      
        // No unique character found
        return -1;
    }
}
