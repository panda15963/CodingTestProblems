class Solution {
    /**
     * Finds the length of the longest uncommon subsequence between two strings.
     * 
     * The longest uncommon subsequence is defined as the longest subsequence 
     * of one string that is not a subsequence of the other string.
     * 
     * @param a the first string to compare
     * @param b the second string to compare
     * @return the length of the longest uncommon subsequence, or -1 if no such subsequence exists
     */
    public int findLUSlength(String a, String b) {
        // If the two strings are identical, every subsequence of one string
        // will also be a subsequence of the other string, so there is no
        // uncommon subsequence
        if (a.equals(b)) {
            return -1;
        }
      
        // If the strings are different, the entire string itself is an uncommon
        // subsequence (since the whole string a is not a subsequence of b and vice versa)
        // The longest one would be the longer string between the two
        return Math.max(a.length(), b.length());
    }
}
