class Solution {
    /**
     * Find the shortest palindrome by adding characters to the beginning of string s.
     * Uses rolling hash to find the longest palindrome prefix efficiently.
     * 
     * @param s the input string
     * @return the shortest palindrome formed by adding characters to the beginning
     */
    public String shortestPalindrome(String s) {
        // Rolling hash parameters
        final int BASE = 131;           // Base for polynomial rolling hash
        final int MOD = 1000000007;     // Large prime modulus to avoid overflow
      
        // Hash values for prefix and suffix
        int prefixHash = 0;              // Hash of prefix (forward direction)
        int suffixHash = 0;              // Hash of suffix (reverse direction)
      
        // Multiplier for suffix hash calculation
        int multiplier = 1;
      
        // Track the longest palindrome prefix
        int longestPalindromePrefixLength = 0;
        int stringLength = s.length();
      
        // Iterate through each character to find longest palindrome prefix
        for (int i = 0; i < stringLength; ++i) {
            // Convert character to numeric value (1-26 for 'a'-'z')
            int charValue = s.charAt(i) - 'a' + 1;
          
            // Update prefix hash: hash = hash * base + charValue
            prefixHash = (int) (((long) prefixHash * BASE + charValue) % MOD);
          
            // Update suffix hash: hash = hash + charValue * base^i
            suffixHash = (int) ((suffixHash + (long) charValue * multiplier) % MOD);
          
            // Update multiplier for next iteration
            multiplier = (int) (((long) multiplier * BASE) % MOD);
          
            // If hashes match, we found a palindrome prefix
            if (prefixHash == suffixHash) {
                longestPalindromePrefixLength = i + 1;
            }
        }
      
        // If entire string is already a palindrome, return as is
        if (longestPalindromePrefixLength == stringLength) {
            return s;
        }
      
        // Build result by reversing the non-palindrome suffix and prepending it
        String nonPalindromeSuffix = s.substring(longestPalindromePrefixLength);
        String reversedSuffix = new StringBuilder(nonPalindromeSuffix).reverse().toString();
      
        return reversedSuffix + s;
    }
}
