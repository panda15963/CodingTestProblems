class Solution {
    /**
     * Finds the closest palindrome to the given number string.
     * If there are two palindromes equally close, returns the smaller one.
     * 
     * @param n The input number as a string
     * @return The nearest palindrome as a string
     */
    public String nearestPalindromic(String n) {
        long originalNumber = Long.parseLong(n);
        long nearestPalindrome = -1;
      
        // Check all candidate palindromes and find the closest one
        for (long candidate : getCandidatePalindromes(n)) {
            if (nearestPalindrome == -1 || 
                Math.abs(candidate - originalNumber) < Math.abs(nearestPalindrome - originalNumber) ||
                (Math.abs(candidate - originalNumber) == Math.abs(nearestPalindrome - originalNumber) && 
                 candidate < nearestPalindrome)) {
                nearestPalindrome = candidate;
            }
        }
      
        return Long.toString(nearestPalindrome);
    }

    /**
     * Generates all possible candidate palindromes for comparison.
     * Candidates include:
     * 1. Edge cases: 999...9 and 1000...001 (one digit less/more)
     * 2. Palindromes formed by mirroring the left half with -1, 0, +1 adjustments
     * 
     * @param n The input number as a string
     * @return Set of candidate palindrome numbers
     */
    private Set<Long> getCandidatePalindromes(String n) {
        int length = n.length();
        Set<Long> candidates = new HashSet<>();
      
        // Add edge case: largest palindrome with one less digit (e.g., 99 for 100)
        candidates.add((long) Math.pow(10, length - 1) - 1);
      
        // Add edge case: smallest palindrome with one more digit (e.g., 1001 for 999)
        candidates.add((long) Math.pow(10, length) + 1);
      
        // Extract the left half of the number (including middle digit if odd length)
        long leftHalf = Long.parseLong(n.substring(0, (length + 1) / 2));
      
        // Generate palindromes by adjusting the left half by -1, 0, and +1
        for (long adjustment = leftHalf - 1; adjustment <= leftHalf + 1; adjustment++) {
            StringBuilder palindromeBuilder = new StringBuilder();
          
            // Append the adjusted left half
            palindromeBuilder.append(adjustment);
          
            // Mirror the left half to create the right half
            // If length is odd, skip the middle digit when mirroring
            String leftHalfString = Long.toString(adjustment);
            int startIndex = length & 1; // 1 if odd length, 0 if even
            palindromeBuilder.append(new StringBuilder(leftHalfString).reverse().substring(startIndex));
          
            candidates.add(Long.parseLong(palindromeBuilder.toString()));
        }
      
        // Remove the original number itself from candidates
        candidates.remove(Long.parseLong(n));
      
        return candidates;
    }
}
