class Solution {
    /**
     * Determines if a path crosses itself when moving in a spiral pattern.
     * The path starts moving north, then west, south, east, and repeats.
     * 
     * @param distance Array of distances for each move
     * @return true if the path crosses itself, false otherwise
     */
    public boolean isSelfCrossing(int[] distance) {
        // Iterate through the distance array starting from the 4th element
        for (int i = 3; i < distance.length; i++) {
            // Case 1: Fourth line crosses the first line
            // Check if current line crosses the line from 3 steps ago
            if (distance[i] >= distance[i - 2] && distance[i - 1] <= distance[i - 3]) {
                return true;
            }
          
            // Case 2: Fifth line crosses the second line
            // Check if current line crosses the line from 4 steps ago
            if (i >= 4 && 
                distance[i - 1] == distance[i - 3] && 
                distance[i] + distance[i - 4] >= distance[i - 2]) {
                return true;
            }
          
            // Case 3: Sixth line crosses the third line
            // Check if current line crosses the line from 5 steps ago
            if (i >= 5 && 
                distance[i - 2] >= distance[i - 4] && 
                distance[i - 1] <= distance[i - 3] &&
                distance[i] >= distance[i - 2] - distance[i - 4] && 
                distance[i - 1] + distance[i - 5] >= distance[i - 3]) {
                return true;
            }
        }
      
        // No crossing detected
        return false;
    }
}
