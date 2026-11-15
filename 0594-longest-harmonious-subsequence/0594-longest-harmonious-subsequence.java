class Solution {
    public int findLHS(int[] nums) {
        // Create a frequency map to count occurrences of each number
        Map<Integer, Integer> frequencyMap = new HashMap<>();
      
        // Count the frequency of each number in the array
        for (int number : nums) {
            frequencyMap.merge(number, 1, Integer::sum);
        }
      
        // Initialize the maximum harmonious subsequence length
        int maxLength = 0;
      
        // Iterate through each entry in the frequency map
        for (Map.Entry<Integer, Integer> entry : frequencyMap.entrySet()) {
            int currentNumber = entry.getKey();
            int currentFrequency = entry.getValue();
          
            // Check if the next consecutive number exists in the map
            // A harmonious subsequence has max and min difference of exactly 1
            if (frequencyMap.containsKey(currentNumber + 1)) {
                // Calculate the length of harmonious subsequence with currentNumber and currentNumber+1
                int harmonicLength = currentFrequency + frequencyMap.get(currentNumber + 1);
              
                // Update the maximum length if current harmonious subsequence is longer
                maxLength = Math.max(maxLength, harmonicLength);
            }
        }
      
        // Return the length of the longest harmonious subsequence
        return maxLength;
    }
}
