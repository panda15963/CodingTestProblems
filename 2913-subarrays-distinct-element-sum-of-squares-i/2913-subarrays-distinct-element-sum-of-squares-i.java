class Solution {
    public int sumCounts(List<Integer> nums) {
        int totalSum = 0;
        int n = nums.size();
      
        // Iterate through all possible starting positions of subarrays
        for (int startIndex = 0; startIndex < n; ++startIndex) {
            // Frequency array to track occurrences of each number (0-100 range)
            int[] frequency = new int[101];
            // Count of distinct elements in current subarray
            int distinctCount = 0;
          
            // Extend the subarray from startIndex to each possible ending position
            for (int endIndex = startIndex; endIndex < n; ++endIndex) {
                // Get the current element value
                int currentElement = nums.get(endIndex);
              
                // Increment frequency and check if it's a new distinct element
                frequency[currentElement]++;
                if (frequency[currentElement] == 1) {
                    // First occurrence of this element in current subarray
                    distinctCount++;
                }
              
                // Add the square of distinct count to the total sum
                // For subarray from startIndex to endIndex
                totalSum += distinctCount * distinctCount;
            }
        }
      
        return totalSum;
    }
}
