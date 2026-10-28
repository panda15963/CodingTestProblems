class Solution {
    public int findRotateSteps(String ring, String key) {
        int keyLength = key.length();
        int ringLength = ring.length();
      
        // Create a position map for each character in the ring
        // positions[i] contains all indices where character ('a' + i) appears in ring
        List<Integer>[] positions = new List[26];
        Arrays.setAll(positions, k -> new ArrayList<>());
      
        // Populate the position map with indices for each character
        for (int i = 0; i < ringLength; ++i) {
            int charIndex = ring.charAt(i) - 'a';
            positions[charIndex].add(i);
        }
      
        // dp[i][j] represents minimum steps to spell key[0...i] with ring position j
        int[][] dp = new int[keyLength][ringLength];
      
        // Initialize dp array with a large value (representing infinity)
        for (int[] row : dp) {
            Arrays.fill(row, 1 << 30);
        }
      
        // Base case: calculate minimum steps for the first character of key
        // For each position of the first character in ring
        for (int ringPos : positions[key.charAt(0) - 'a']) {
            // Calculate minimum rotation: clockwise or counter-clockwise
            int minRotation = Math.min(ringPos, ringLength - ringPos);
            // Add 1 for the button press
            dp[0][ringPos] = minRotation + 1;
        }
      
        // Fill dp table for remaining characters in key
        for (int keyIndex = 1; keyIndex < keyLength; ++keyIndex) {
            // For each position of current character in ring
            for (int currentRingPos : positions[key.charAt(keyIndex) - 'a']) {
                // Check all positions of previous character in ring
                for (int prevRingPos : positions[key.charAt(keyIndex - 1) - 'a']) {
                    // Calculate distance between current and previous positions
                    int distance = Math.abs(currentRingPos - prevRingPos);
                    // Choose minimum between clockwise and counter-clockwise rotation
                    int minRotation = Math.min(distance, ringLength - distance);
                    // Update dp with minimum steps: previous steps + rotation + button press
                    dp[keyIndex][currentRingPos] = Math.min(
                        dp[keyIndex][currentRingPos], 
                        dp[keyIndex - 1][prevRingPos] + minRotation + 1
                    );
                }
            }
        }
      
        // Find the minimum steps among all possible final positions
        int minSteps = 1 << 30;
        for (int finalRingPos : positions[key.charAt(keyLength - 1) - 'a']) {
            minSteps = Math.min(minSteps, dp[keyLength - 1][finalRingPos]);
        }
      
        return minSteps;
    }
}
