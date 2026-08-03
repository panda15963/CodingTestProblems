class Solution {
    // Length of the input string
    private int stringLength;
    // Input string to be processed
    private String inputString;
    // Final result list containing all valid IP addresses
    private List<String> result = new ArrayList<>();
    // Temporary list to store current IP address segments during backtracking
    private List<String> currentSegments = new ArrayList<>();

    /**
     * Restores all possible valid IP addresses from the given string.
     * A valid IP address consists of exactly four integers separated by dots,
     * where each integer is between 0 and 255 (inclusive) with no leading zeros.
     * 
     * @param s the input string containing only digits
     * @return a list of all possible valid IP addresses
     */
    public List<String> restoreIpAddresses(String s) {
        stringLength = s.length();
        this.inputString = s;
        backtrack(0);
        return result;
    }

    /**
     * Performs depth-first search with backtracking to find all valid IP addresses.
     * 
     * @param startIndex the starting index in the string for the current segment
     */
    private void backtrack(int startIndex) {
        // Base case: if we've processed the entire string and have exactly 4 segments
        if (startIndex >= stringLength && currentSegments.size() == 4) {
            // Join the segments with dots and add to result
            result.add(String.join(".", currentSegments));
            return;
        }
      
        // Pruning: if we've processed the entire string but don't have 4 segments,
        // or if we already have 4 segments but haven't processed the entire string
        if (startIndex >= stringLength || currentSegments.size() >= 4) {
            return;
        }
      
        // Try to form a segment starting from current position
        int currentNumber = 0;
        // Each segment can be at most 3 digits long
        for (int endIndex = startIndex; endIndex < Math.min(startIndex + 3, stringLength); ++endIndex) {
            // Build the number digit by digit
            currentNumber = currentNumber * 10 + inputString.charAt(endIndex) - '0';
          
            // Validation: number must be <= 255 and no leading zeros allowed
            // (except for the number "0" itself, which is when startIndex == endIndex)
            if (currentNumber > 255 || (inputString.charAt(startIndex) == '0' && startIndex != endIndex)) {
                break;
            }
          
            // Add current segment to temporary list
            currentSegments.add(inputString.substring(startIndex, endIndex + 1));
          
            // Recursively process the remaining string
            backtrack(endIndex + 1);
          
            // Backtrack: remove the last added segment to try other possibilities
            currentSegments.remove(currentSegments.size() - 1);
        }
    }
}