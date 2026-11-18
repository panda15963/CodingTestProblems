class Solution {
    /**
     * Calculates the minimum number of changes needed to make the string
     * have identical characters in each consecutive pair.
     * The string is divided into pairs: (s[0], s[1]), (s[2], s[3]), etc.
     * 
     * @param s the input string to process
     * @return the minimum number of character changes required
     */
    public int minChanges(String s) {
        int changeCount = 0;
      
        // Iterate through the string by checking pairs of characters
        // Start from index 1 and increment by 2 to check each pair
        for (int i = 1; i < s.length(); i += 2) {
            // Check if the current character differs from its pair (previous character)
            if (s.charAt(i) != s.charAt(i - 1)) {
                // Increment the count if characters in the pair are different
                changeCount++;
            }
        }
      
        return changeCount;
    }
}
