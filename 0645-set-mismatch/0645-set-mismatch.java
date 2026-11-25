class Solution {
    public int[] findErrorNums(int[] nums) {
        int n = nums.length;
      
        // Calculate the expected sum of numbers from 1 to n using arithmetic sequence formula
        int expectedSum = (1 + n) * n / 2;
      
        // Track unique numbers and their sum
        Set<Integer> uniqueNumbers = new HashSet<>();
        int uniqueSum = 0;
      
        // Calculate the actual sum of all elements (including duplicate)
        int actualSum = 0;
      
        // Iterate through the array
        for (int num : nums) {
            // If the number is added to set successfully (not a duplicate)
            if (uniqueNumbers.add(num)) {
                uniqueSum += num;
            }
            // Add to actual sum regardless of duplication
            actualSum += num;
        }
      
        // The duplicate number = actualSum - uniqueSum (extra occurrence)
        int duplicate = actualSum - uniqueSum;
      
        // The missing number = expectedSum - uniqueSum (what should be there but isn't)
        int missing = expectedSum - uniqueSum;
      
        return new int[] {duplicate, missing};
    }
}
