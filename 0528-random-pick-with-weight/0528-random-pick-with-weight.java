class Solution {
    private int[] prefixSum;
    private Random randomGenerator = new Random();

    /**
     * Constructor that initializes the weighted random picker.
     * Creates a prefix sum array where each element represents the cumulative sum of weights.
     * @param w Array of positive weights for each index
     */
    public Solution(int[] w) {
        int n = w.length;
        prefixSum = new int[n + 1];

        // Build prefix sum array where prefixSum[i+1] = sum of weights from index 0 to i
        for (int i = 0; i < n; ++i) {
            prefixSum[i + 1] = prefixSum[i] + w[i];
        }
    }

    /**
     * Picks a random index based on the weight distribution.
     * Indices with higher weights have proportionally higher probability of being selected.
     * @return The selected index based on weighted probability
     */
    public int pickIndex() {
        // Generate random number from 1 to total sum (inclusive)
        int totalSum = prefixSum[prefixSum.length - 1];
        int randomValue = 1 + randomGenerator.nextInt(totalSum);

        // Binary search to find the smallest index where prefixSum[index] >= randomValue
        int left = 1;
        int right = prefixSum.length - 1;

        while (left < right) {
            int mid = (left + right) >> 1;  // Equivalent to (left + right) / 2

            if (prefixSum[mid] >= randomValue) {
                // Target might be at mid or to the left
                right = mid;
            } else {
                // Target must be to the right of mid
                left = mid + 1;
            }
        }

        // Return the actual index (subtract 1 due to prefix sum array offset)
        return left - 1;
    }
}

/**
 * Your Solution object will be instantiated and called as such:
 * Solution obj = new Solution(w);
 * int param_1 = obj.pickIndex();
 */
