class Solution {
    /**
     * Counts the number of segments in a string.
     * A segment is defined as a contiguous sequence of non-space characters.
     * 
     * @param s the input string
     * @return the number of segments in the string
     */
    public int countSegments(String s) {
        // Initialize counter for segments
        int segmentCount = 0;
      
        // Split the string by space delimiter
        String[] tokens = s.split(" ");
      
        // Iterate through each token
        for (String token : tokens) {
            // Check if token is not empty (handles consecutive spaces)
            if (!token.isEmpty()) {
                segmentCount++;
            }
        }
      
        return segmentCount;
    }
}
