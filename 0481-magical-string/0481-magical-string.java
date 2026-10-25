class Solution {
    public int magicalString(int n) {
        // Initialize the magical string with first three elements [1, 2, 2]
        // The magical string follows the pattern where each group's count is determined
        // by the corresponding position in the string itself
        List<Integer> magicalSequence = new ArrayList<>(List.of(1, 2, 2));
      
        // Build the magical string until we have at least n elements
        // Start from index 2 since indices 0 and 1 are already processed
        for (int groupIndex = 2; magicalSequence.size() < n; groupIndex++) {
            // Get the last element in the sequence
            int previousValue = magicalSequence.get(magicalSequence.size() - 1);
          
            // Alternate between 1 and 2: if previous was 1, current is 2, and vice versa
            int currentValue = 3 - previousValue;
          
            // Add the current value to the sequence based on the count at groupIndex
            // The value at groupIndex tells us how many times to add currentValue
            int groupSize = magicalSequence.get(groupIndex);
            for (int j = 0; j < groupSize; j++) {
                magicalSequence.add(currentValue);
            }
        }
      
        // Count the number of 1s in the first n elements
        int countOfOnes = 0;
        for (int i = 0; i < n; i++) {
            if (magicalSequence.get(i) == 1) {
                countOfOnes++;
            }
        }
      
        return countOfOnes;
    }
}
