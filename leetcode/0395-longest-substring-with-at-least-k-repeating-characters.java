class Solution {
    private String inputString;
    private int minFrequency;

    /**
     * Finds the length of the longest substring where every character appears at least k times
     * @param s The input string
     * @param k The minimum frequency required for each character
     * @return The length of the longest valid substring
     */
    public int longestSubstring(String s, int k) {
        this.inputString = s;
        this.minFrequency = k;
        return divideAndConquer(0, s.length() - 1);
    }

    /**
     * Recursively finds the longest valid substring using divide and conquer approach
     * @param left The left boundary of the current substring (inclusive)
     * @param right The right boundary of the current substring (inclusive)
     * @return The length of the longest valid substring in the range [left, right]
     */
    private int divideAndConquer(int left, int right) {
        // Count frequency of each character in the current range
        int[] charFrequency = new int[26];
        for (int i = left; i <= right; i++) {
            charFrequency[inputString.charAt(i) - 'a']++;
        }
      
        // Find a character that appears but doesn't meet the minimum frequency requirement
        // This character will be used to split the string
        char splitChar = 0;
        for (int i = 0; i < 26; i++) {
            if (charFrequency[i] > 0 && charFrequency[i] < minFrequency) {
                splitChar = (char) (i + 'a');
                break;
            }
        }
      
        // If no split character found, all characters meet the requirement
        // Return the length of the current substring
        if (splitChar == 0) {
            return right - left + 1;
        }
      
        // Split the string by the invalid character and recursively process each segment
        int currentIndex = left;
        int maxLength = 0;
      
        while (currentIndex <= right) {
            // Skip all occurrences of the split character
            while (currentIndex <= right && inputString.charAt(currentIndex) == splitChar) {
                currentIndex++;
            }
          
            // Check if we've reached the end
            if (currentIndex > right) {
                break;
            }
          
            // Find the end of the current valid segment (before next split character)
            int segmentEnd = currentIndex;
            while (segmentEnd <= right && inputString.charAt(segmentEnd) != splitChar) {
                segmentEnd++;
            }
          
            // Recursively process this segment and update the maximum length
            int segmentLength = divideAndConquer(currentIndex, segmentEnd - 1);
            maxLength = Math.max(maxLength, segmentLength);
          
            // Move to the next segment
            currentIndex = segmentEnd;
        }
      
        return maxLength;
    }
}
