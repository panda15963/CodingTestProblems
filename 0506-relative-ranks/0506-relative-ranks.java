class Solution {
    public String[] findRelativeRanks(int[] score) {
        int n = score.length;
      
        // Create an array of indices [0, 1, 2, ..., n-1]
        Integer[] indices = new Integer[n];
        Arrays.setAll(indices, i -> i);
      
        // Sort indices based on their corresponding scores in descending order
        // This gives us the ranking order while preserving original positions
        Arrays.sort(indices, (index1, index2) -> score[index2] - score[index1]);
      
        // Initialize result array to store relative ranks
        String[] result = new String[n];
      
        // Define medals for top 3 positions
        String[] medals = new String[] {"Gold Medal", "Silver Medal", "Bronze Medal"};
      
        // Assign ranks to each athlete based on their sorted position
        for (int rank = 0; rank < n; rank++) {
            // Get the original index of the athlete at current rank
            int originalIndex = indices[rank];
          
            // Assign medal for top 3, or numeric rank (1-based) for others
            if (rank < 3) {
                result[originalIndex] = medals[rank];
            } else {
                result[originalIndex] = String.valueOf(rank + 1);
            }
        }
      
        return result;
    }
}
