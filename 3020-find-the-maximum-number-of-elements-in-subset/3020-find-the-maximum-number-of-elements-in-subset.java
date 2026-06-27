class Solution {
    public int maximumLength(int[] nums) {
        // Count frequency of each number in the array
        Map<Long, Integer> frequencyMap = new HashMap<>();
        for (int num : nums) {
            frequencyMap.merge((long) num, 1, Integer::sum);
        }
      
        // Handle special case for number 1 (since 1 * 1 = 1)
        // For 1, we can use all occurrences but need an odd count for a valid pattern
        Integer onesCount = frequencyMap.remove(1L);
        int maxLength = (onesCount == null) ? 0 : onesCount - (onesCount % 2 ^ 1);
      
        // Process each unique number to find the longest valid pattern
        for (long baseNum : frequencyMap.keySet()) {
            int currentLength = 0;
            long currentNum = baseNum;
          
            // Build pattern: [x, x, x², x², x⁴, x⁴, ...]
            // Keep squaring while we have at least 2 occurrences
            while (frequencyMap.getOrDefault(currentNum, 0) > 1) {
                currentNum = currentNum * currentNum;
                currentLength += 2;  // Add pair of elements
            }
          
            // Add the final element if it exists (the peak of the pattern)
            // If it doesn't exist, subtract 1 to maintain valid pattern
            currentLength += frequencyMap.getOrDefault(currentNum, -1);
          
            // Update maximum length found so far
            maxLength = Math.max(maxLength, currentLength);
        }
      
        return maxLength;
    }
}