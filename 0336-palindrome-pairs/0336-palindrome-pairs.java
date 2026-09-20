class Solution {
    // Constants for rolling hash computation
    private static final int HASH_BASE = 131;  // Prime number base for polynomial rolling hash
    private static final long[] POWER_BASE = new long[310];  // Precomputed powers of base
    private static final int HASH_MOD = (int) 1e9 + 7;  // Large prime modulus to prevent overflow
  
    // Static initialization block to precompute powers of base
    static {
        POWER_BASE[0] = 1;
        for (int i = 1; i < POWER_BASE.length; ++i) {
            POWER_BASE[i] = (POWER_BASE[i - 1] * HASH_BASE) % HASH_MOD;
        }
    }
  
    public List<List<Integer>> palindromePairs(String[] words) {
        int wordCount = words.length;
      
        // Arrays to store forward and reverse hash values for each word
        long[] forwardHash = new long[wordCount];
        long[] reverseHash = new long[wordCount];
      
        // Calculate hash values for each word
        for (int i = 0; i < wordCount; ++i) {
            String currentWord = words[i];
            int wordLength = currentWord.length();
          
            // Build forward hash (left to right) and reverse hash (right to left)
            for (int j = 0; j < wordLength; ++j) {
                // Convert character to 1-based value (a=1, b=2, ..., z=26)
                int forwardChar = currentWord.charAt(j) - 'a' + 1;
                int reverseChar = currentWord.charAt(wordLength - j - 1) - 'a' + 1;
              
                // Update hash values using polynomial rolling hash formula
                forwardHash[i] = (forwardHash[i] * HASH_BASE) % HASH_MOD + forwardChar;
                reverseHash[i] = (reverseHash[i] * HASH_BASE) % HASH_MOD + reverseChar;
            }
        }
      
        List<List<Integer>> result = new ArrayList<>();
      
        // Check all pairs of words
        for (int i = 0; i < wordCount; ++i) {
            for (int j = i + 1; j < wordCount; ++j) {
                // Check if words[i] + words[j] forms a palindrome
                if (isPalindromeConcatenation(i, j, words[j].length(), words[i].length(), 
                                               forwardHash, reverseHash)) {
                    result.add(Arrays.asList(i, j));
                }
              
                // Check if words[j] + words[i] forms a palindrome
                if (isPalindromeConcatenation(j, i, words[i].length(), words[j].length(), 
                                               forwardHash, reverseHash)) {
                    result.add(Arrays.asList(j, i));
                }
            }
        }
      
        return result;
    }
  
    /**
     * Checks if concatenation of words at index firstIdx and secondIdx forms a palindrome
     * 
     * @param firstIdx Index of the first word in concatenation
     * @param secondIdx Index of the second word in concatenation
     * @param secondWordLen Length of the second word
     * @param firstWordLen Length of the first word
     * @param forwardHash Array containing forward hash values
     * @param reverseHash Array containing reverse hash values
     * @return true if concatenation forms a palindrome, false otherwise
     */
    private boolean isPalindromeConcatenation(int firstIdx, int secondIdx, int secondWordLen, 
                                               int firstWordLen, long[] forwardHash, long[] reverseHash) {
        // Calculate hash of concatenated string (first word + second word)
        long concatenatedForwardHash = ((forwardHash[firstIdx] * POWER_BASE[secondWordLen]) % HASH_MOD 
                                        + forwardHash[secondIdx]) % HASH_MOD;
      
        // Calculate hash of reverse of concatenated string
        // Reverse of (A + B) = reverse(B) + reverse(A)
        long concatenatedReverseHash = ((reverseHash[secondIdx] * POWER_BASE[firstWordLen]) % HASH_MOD 
                                        + reverseHash[firstIdx]) % HASH_MOD;
      
        // If forward and reverse hashes match, the concatenation is a palindrome
        return concatenatedForwardHash == concatenatedReverseHash;
    }
}
