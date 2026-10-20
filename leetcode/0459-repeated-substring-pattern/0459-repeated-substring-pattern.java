class Solution {
    public boolean repeatedSubstringPattern(String s) {
        // Concatenate the string with itself to create a doubled string
        String doubledString = s + s;
      
        // Remove the first and last character from the doubled string
        // This ensures we don't match the original string at position 0 or at the end
        String trimmedString = doubledString.substring(1, doubledString.length() - 1);
      
        // If the original string can be found in the trimmed doubled string,
        // it means the string is composed of a repeating substring pattern
        // Example: "abab" -> doubled: "abababab" -> trimmed: "bababab"
        // "abab" exists in "bababab", so it has a repeating pattern
        return trimmedString.contains(s);
    }
}
