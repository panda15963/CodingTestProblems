class Solution {
    /**
     * Distributes candies between two people such that one person gets maximum variety.
     * Given an array of candy types, one person can eat at most n/2 candies.
     * Returns the maximum number of different candy types one person can eat.
     * 
     * @param candyType Array where each element represents a candy type
     * @return Maximum number of different candy types one person can eat
     */
    public int distributeCandies(int[] candyType) {
        // Use a HashSet to store unique candy types
        Set<Integer> uniqueCandyTypes = new HashSet<>();
      
        // Add all candy types to the set (duplicates are automatically removed)
        for (int candy : candyType) {
            uniqueCandyTypes.add(candy);
        }
      
        // Calculate the maximum candies one person can eat (half of total candies)
        int maxCandiesAllowed = candyType.length / 2;
      
        // Return the minimum between:
        // 1. Maximum candies allowed (n/2)
        // 2. Number of unique candy types available
        // This ensures we don't exceed the candy limit while maximizing variety
        return Math.min(maxCandiesAllowed, uniqueCandyTypes.size());
    }
}
