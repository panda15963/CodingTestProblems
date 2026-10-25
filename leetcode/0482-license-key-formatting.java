class Solution {
    public String licenseKeyFormatting(String s, int k) {
        // Calculate total number of alphanumeric characters
        int totalLength = s.length();
        int dashCount = (int) s.chars().filter(ch -> ch == '-').count();
        int alphanumericCount = totalLength - dashCount;
      
        // Calculate the size of the first group
        // If all characters divide evenly by k, first group size equals k
        int firstGroupSize = alphanumericCount % k;
        if (firstGroupSize == 0) {
            firstGroupSize = k;
        }
      
        // StringBuilder to construct the formatted result
        StringBuilder result = new StringBuilder();
        int currentGroupCount = firstGroupSize;
      
        // Iterate through each character in the input string
        for (int i = 0; i < totalLength; i++) {
            char currentChar = s.charAt(i);
          
            // Skip dashes in the original string
            if (currentChar == '-') {
                continue;
            }
          
            // Append the uppercase version of the character
            result.append(Character.toUpperCase(currentChar));
            currentGroupCount--;
          
            // When current group is complete, prepare for next group
            if (currentGroupCount == 0) {
                currentGroupCount = k;  // Reset counter for next group
              
                // Add dash separator if not at the last character
                if (i != totalLength - 1) {
                    result.append('-');
                }
            }
        }
      
        // Remove trailing dash if it exists
        if (result.length() > 0 && result.charAt(result.length() - 1) == '-') {
            result.deleteCharAt(result.length() - 1);
        }
      
        return result.toString();
    }
}
