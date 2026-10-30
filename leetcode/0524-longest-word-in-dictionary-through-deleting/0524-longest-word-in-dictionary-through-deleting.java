class Solution {
    /**
     * Finds the longest word from dictionary that can be formed by deleting 
     * some characters from string s. If multiple valid words have the same length,
     * returns the lexicographically smallest one.
     * 
     * @param s The source string
     * @param dictionary List of words to check
     * @return The longest valid word, or empty string if none found
     */
    public String findLongestWord(String s, List<String> dictionary) {
        String longestWord = "";
      
        // Iterate through each word in the dictionary
        for (String currentWord : dictionary) {
            int longestLength = longestWord.length();
            int currentLength = currentWord.length();
          
            // Check if current word is a subsequence of s and is better than current best
            if (isSubsequence(currentWord, s) && 
                (longestLength < currentLength || 
                 (longestLength == currentLength && currentWord.compareTo(longestWord) < 0))) {
                longestWord = currentWord;
            }
        }
      
        return longestWord;
    }

    /**
     * Checks if word is a subsequence of source string.
     * A subsequence means word can be formed by deleting some characters 
     * from source without changing the order of remaining characters.
     * 
     * @param word The word to check
     * @param source The source string
     * @return true if word is a subsequence of source, false otherwise
     */
    private boolean isSubsequence(String word, String source) {
        int wordLength = word.length();
        int sourceLength = source.length();
        int wordPointer = 0;
      
        // Two-pointer approach: iterate through source string
        for (int sourcePointer = 0; wordPointer < wordLength && sourcePointer < sourceLength; sourcePointer++) {
            // If characters match, move word pointer forward
            if (word.charAt(wordPointer) == source.charAt(sourcePointer)) {
                wordPointer++;
            }
        }
      
        // Word is a subsequence if all characters were matched
        return wordPointer == wordLength;
    }
}
