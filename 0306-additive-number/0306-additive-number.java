class Solution {
    /**
     * Determines if a string is an additive number.
     * An additive number is a string whose digits can form an additive sequence.
     * A valid additive sequence should contain at least three numbers.
     * Except for the first two numbers, each subsequent number in the sequence must be the sum of the preceding two.
     * 
     * @param num the input string containing only digits
     * @return true if num is an additive number, false otherwise
     */
    public boolean isAdditiveNumber(String num) {
        int n = num.length();
      
        // Try all possible positions for the first number (ending at index i-1)
        // Limit to 19 digits to avoid Long overflow
        for (int i = 1; i < Math.min(n - 1, 19); ++i) {
            // Try all possible positions for the second number (ending at index j-1)
            for (int j = i + 1; j < Math.min(n, i + 19); ++j) {
                // First number cannot have leading zeros (except when it's just "0")
                if (i > 1 && num.charAt(0) == '0') {
                    break;
                }
              
                // Second number cannot have leading zeros (except when it's just "0")
                if (j - i > 1 && num.charAt(i) == '0') {
                    continue;
                }
              
                // Parse the first two numbers
                long firstNum = Long.parseLong(num.substring(0, i));
                long secondNum = Long.parseLong(num.substring(i, j));
              
                // Check if the remaining string forms a valid additive sequence
                if (dfs(firstNum, secondNum, num.substring(j))) {
                    return true;
                }
            }
        }
      
        return false;
    }

    /**
     * Recursively checks if the remaining string can form a valid additive sequence
     * given the previous two numbers.
     * 
     * @param prev1 the first of the two previous numbers
     * @param prev2 the second of the two previous numbers
     * @param remaining the remaining string to be checked
     * @return true if the remaining string forms a valid sequence, false otherwise
     */
    private boolean dfs(long prev1, long prev2, String remaining) {
        // Base case: if no more digits left, the sequence is valid
        if ("".equals(remaining)) {
            return true;
        }
      
        // The next number cannot have leading zeros (unless the sum itself is 0)
        if (prev1 + prev2 > 0 && remaining.charAt(0) == '0') {
            return false;
        }
      
        // Try different lengths for the next number in the sequence
        // Limit to 19 digits to avoid Long overflow
        for (int i = 1; i < Math.min(remaining.length() + 1, 19); ++i) {
            // Check if the current substring equals the sum of the previous two numbers
            if (prev1 + prev2 == Long.parseLong(remaining.substring(0, i))) {
                // Recursively check the rest of the string with updated previous numbers
                if (dfs(prev2, prev1 + prev2, remaining.substring(i))) {
                    return true;
                }
            }
        }
      
        return false;
    }
}
