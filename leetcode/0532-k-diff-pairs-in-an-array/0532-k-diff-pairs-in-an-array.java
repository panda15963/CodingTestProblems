class Solution {
    public int findPairs(int[] nums, int k) {
        // Set to store unique smaller values of valid pairs (num1, num2) where num1 < num2
        Set<Integer> uniquePairs = new HashSet<>();
        // Set to track numbers we've already seen during iteration
        Set<Integer> visitedNumbers = new HashSet<>();

        // Iterate through each number in the array
        for (int currentNum : nums) {
            // Check if (currentNum - k, currentNum) forms a valid pair
            // If currentNum - k exists in visited set, then we found a pair
            if (visitedNumbers.contains(currentNum - k)) {
                // Store the smaller value of the pair
                uniquePairs.add(currentNum - k);
            }

            // Check if (currentNum, currentNum + k) forms a valid pair
            // If currentNum + k exists in visited set, then we found a pair
            if (visitedNumbers.contains(currentNum + k)) {
                // Store the smaller value of the pair
                uniquePairs.add(currentNum);
            }

            // Mark current number as visited
            visitedNumbers.add(currentNum);
        }

        // Return the count of unique pairs
        return uniquePairs.size();
    }
}
