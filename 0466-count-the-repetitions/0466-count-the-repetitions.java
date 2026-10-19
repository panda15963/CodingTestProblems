class Solution {
    public int getMaxRepetitions(String s1, int n1, String s2, int n2) {
        int s1Length = s1.length();
        int s2Length = s2.length();
      
        // dp[i] stores [count, nextIndex] where:
        // - count: number of complete s2 strings we can match when starting from index i in s2
        // - nextIndex: the index in s2 where we end up after processing one complete s1
        int[][] dp = new int[s2Length][2];
      
        // Precompute the transition for each possible starting position in s2
        for (int startIndex = 0; startIndex < s2Length; startIndex++) {
            int currentS2Index = startIndex;
            int completeS2Count = 0;
          
            // Process one complete s1 string
            for (int s1Index = 0; s1Index < s1Length; s1Index++) {
                // If characters match, advance the pointer in s2
                if (s1.charAt(s1Index) == s2.charAt(currentS2Index)) {
                    currentS2Index++;
                  
                    // If we completed one full s2, reset index and increment count
                    if (currentS2Index == s2Length) {
                        currentS2Index = 0;
                        completeS2Count++;
                    }
                }
            }
          
            // Store the result: [number of complete s2 found, ending position in s2]
            dp[startIndex] = new int[] {completeS2Count, currentS2Index};
        }
      
        // Calculate total number of s2 strings we can obtain from n1 copies of s1
        int totalS2Count = 0;
        int currentS2Position = 0;
      
        // Process each copy of s1
        for (int remaining = n1; remaining > 0; remaining--) {
            // Add the number of complete s2 strings from current position
            totalS2Count += dp[currentS2Position][0];
            // Update position for next iteration
            currentS2Position = dp[currentS2Position][1];
        }
      
        // Return how many complete (s2 * n2) sequences we can form
        return totalS2Count / n2;
    }
}
