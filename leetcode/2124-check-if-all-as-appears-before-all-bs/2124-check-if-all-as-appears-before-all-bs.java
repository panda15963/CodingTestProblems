class Solution {
    /**
     * Checks if all 'a' characters appear before all 'b' characters in the string.
     * 
     * The logic is based on the fact that if 'b' appears before 'a' at any position,
     * the substring "ba" will exist in the string, violating the constraint.
     * 
     * @param s the input string to check
     * @return true if all 'a's appear before all 'b's, false otherwise
     */
    public boolean checkString(String s) {
        // Check if the string contains "ba" pattern
        // If "ba" exists, it means at least one 'b' appears before an 'a'
        // Return the negation: true if "ba" doesn't exist, false if it does
        return !s.contains("ba");
    }
}
