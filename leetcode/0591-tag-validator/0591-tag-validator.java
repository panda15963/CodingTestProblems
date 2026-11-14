class Solution {
    /**
     * Validates if the given code string follows valid XML-like tag rules.
     * Rules include: proper tag matching, CDATA sections, and tag format requirements.
     * 
     * @param code The input string to validate
     * @return true if the code is valid, false otherwise
     */
    public boolean isValid(String code) {
        // Stack to keep track of opening tags
        Deque<String> tagStack = new ArrayDeque<>();
      
        // Iterate through each character in the code
        for (int i = 0; i < code.length(); ++i) {
            // After processing the first character, the stack should not be empty
            // (the entire content must be wrapped in a tag)
            if (i > 0 && tagStack.isEmpty()) {
                return false;
            }
          
            // Handle CDATA section: <![CDATA[...]]>
            if (code.startsWith("<![CDATA[", i)) {
                // Find the closing "]]>" after the CDATA opening
                int cdataEndIndex = code.indexOf("]]>", i + 9);
                if (cdataEndIndex < 0) {
                    return false;  // No closing CDATA found
                }
                // Move index past the closing "]]>"
                i = cdataEndIndex + 2;
            } 
            // Handle closing tag: </TAG_NAME>
            else if (code.startsWith("</", i)) {
                int tagStartIndex = i + 2;
                int tagEndIndex = code.indexOf(">", tagStartIndex);
                if (tagEndIndex < 0) {
                    return false;  // No closing bracket found
                }
              
                // Extract the tag name
                String tagName = code.substring(tagStartIndex, tagEndIndex);
              
                // Validate tag format and check if it matches the most recent opening tag
                if (!isValidTag(tagName) || tagStack.isEmpty() || !tagStack.pop().equals(tagName)) {
                    return false;
                }
              
                // Move index to the closing bracket
                i = tagEndIndex;
            } 
            // Handle opening tag: <TAG_NAME>
            else if (code.startsWith("<", i)) {
                int tagStartIndex = i + 1;
                int tagEndIndex = code.indexOf(">", tagStartIndex);
                if (tagEndIndex < 0) {
                    return false;  // No closing bracket found
                }
              
                // Extract the tag name
                String tagName = code.substring(tagStartIndex, tagEndIndex);
              
                // Validate tag format
                if (!isValidTag(tagName)) {
                    return false;
                }
              
                // Push the opening tag onto the stack
                tagStack.push(tagName);
              
                // Move index to the closing bracket
                i = tagEndIndex;
            }
        }
      
        // All tags should be properly closed (stack should be empty)
        return tagStack.isEmpty();
    }

    /**
     * Checks if a tag name is valid.
     * Valid tags must be 1-9 characters long and contain only uppercase letters.
     * 
     * @param tag The tag name to validate
     * @return true if the tag is valid, false otherwise
     */
    private boolean check(String tag) {
        int tagLength = tag.length();
      
        // Check length constraints (1-9 characters)
        if (tagLength < 1 || tagLength > 9) {
            return false;
        }
      
        // Check that all characters are uppercase letters
        for (char c : tag.toCharArray()) {
            if (!Character.isUpperCase(c)) {
                return false;
            }
        }
      
        return true;
    }
  
    /**
     * Helper method to improve readability (delegates to check method).
     * 
     * @param tagName The tag name to validate
     * @return true if the tag is valid, false otherwise
     */
    private boolean isValidTag(String tagName) {
        return check(tagName);
    }
}
