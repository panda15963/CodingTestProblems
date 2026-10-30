class Solution {

    // This method finds the length of the longest uncommon subsequence among the given array of strings.
    public int findLUSlength(String[] strs) {
        int longestLength = -1; // Initialize with -1 to account for no solution case.
      
        // We iterate over each string in the array to check if it's a non-subsequence of all other strings in the array.
        for (int i = 0, j = 0, n = strs.length; i < n; ++i) {
          
            // We iterate over the strings again looking for a common subsequence.
            for (j = 0; j < n; ++j) {
                // We skip the case where we compare the string with itself.
                if (i == j) {
                    continue;
                }
              
                // If the current string (strs[i]) is a subsequence of strs[j], then break out of this loop.
                if (isSubsequence(strs[j], strs[i])) {
                    break;
                }
            }
          
            // If we've gone through all strings without breaking, then strs[i] is not a subsequence of any other string.
            if (j == n) {
                // We update the longestLength if strs[i]'s length is greater than the current longestLength.
                longestLength = Math.max(longestLength, strs[i].length());
            }
        }
      
        // Return the length of the longest uncommon subsequence. If there are none, return -1.
        return longestLength;
    }

    // This private helper method checks if string b is a subsequence of string a.
    private boolean isSubsequence(String a, String b) {
        int j = 0; // This will be used to iterate over string b.

        // Iterate over string a and string b to check if all characters of b are also in a in the same order.
        for (int i = 0; i < a.length() && j < b.length(); ++i) {
            // If we find a matching character, move to the next character in b.
            if (a.charAt(i) == b.charAt(j)) {
                ++j;
            }
        }

        // After the loop, if j equals the length of b, it means all characters of b are found in a in order.
        return j == b.length();
    }
}
