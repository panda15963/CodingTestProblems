class Solution {
    public int[] smallestRange(List<List<Integer>> nums) {
        // Calculate total number of elements across all lists
        int totalElements = 0;
        for (List<Integer> list : nums) {
            totalElements += list.size();
        }
      
        // Create array to store all elements with their list index
        // Each element is stored as [value, listIndex]
        int[][] elements = new int[totalElements][2];
        int numLists = nums.size();
      
        // Flatten all lists into the elements array
        int index = 0;
        for (int listIdx = 0; listIdx < numLists; listIdx++) {
            for (int value : nums.get(listIdx)) {
                elements[index++] = new int[] {value, listIdx};
            }
        }
      
        // Sort elements by their values in ascending order
        Arrays.sort(elements, (a, b) -> a[0] - b[0]);
      
        // Initialize sliding window variables
        int left = 0;
        Map<Integer, Integer> listCount = new HashMap<>();  // Track count of elements from each list in window
        int[] result = new int[] {-1000000, 1000000};  // Initialize with maximum possible range
      
        // Sliding window approach: expand window with right pointer
        for (int[] element : elements) {
            int rightValue = element[0];
            int listIndex = element[1];
          
            // Add current element's list to the window
            listCount.merge(listIndex, 1, Integer::sum);
          
            // Shrink window from left while it contains at least one element from each list
            while (listCount.size() == numLists) {
                int leftValue = elements[left][0];
                int leftListIndex = elements[left][1];
              
                // Check if current range is better than the best found so far
                int rangeDiff = rightValue - leftValue - (result[1] - result[0]);
                if (rangeDiff < 0 || (rangeDiff == 0 && leftValue < result[0])) {
                    // Update result if current range is smaller, or same size but starts earlier
                    result[0] = leftValue;
                    result[1] = rightValue;
                }
              
                // Remove leftmost element from window
                if (listCount.merge(leftListIndex, -1, Integer::sum) == 0) {
                    listCount.remove(leftListIndex);
                }
                left++;
            }
        }
      
        return result;
    }
}
