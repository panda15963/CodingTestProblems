class Solution {
    public int maxSumSubmatrix(int[][] matrix, int k) {
        int rows = matrix.length;
        int cols = matrix[0].length;
        final int NEGATIVE_INFINITY = Integer.MIN_VALUE;
        int maxSum = NEGATIVE_INFINITY;
      
        // Fix the top row of the submatrix
        for (int topRow = 0; topRow < rows; topRow++) {
            // Array to store column sums between topRow and bottomRow
            int[] columnSums = new int[cols];
          
            // Iterate through all possible bottom rows
            for (int bottomRow = topRow; bottomRow < rows; bottomRow++) {
                // Update column sums to include current bottom row
                for (int col = 0; col < cols; col++) {
                    columnSums[col] += matrix[bottomRow][col];
                }
              
                // Find maximum subarray sum <= k using prefix sums and TreeSet
                int currentPrefixSum = 0;
                TreeSet<Integer> prefixSumSet = new TreeSet<>();
                // Add 0 to handle subarrays starting from index 0
                prefixSumSet.add(0);
              
                // Process each column sum
                for (int colSum : columnSums) {
                    currentPrefixSum += colSum;
                  
                    // Find the smallest prefix sum >= (currentPrefixSum - k)
                    // This gives us the maximum subarray sum <= k
                    Integer minPrefixSum = prefixSumSet.ceiling(currentPrefixSum - k);
                  
                    if (minPrefixSum != null) {
                        // Update maxSum with the subarray sum (currentPrefixSum - minPrefixSum)
                        maxSum = Math.max(maxSum, currentPrefixSum - minPrefixSum);
                    }
                  
                    // Add current prefix sum to the set for future iterations
                    prefixSumSet.add(currentPrefixSum);
                }
            }
        }
      
        return maxSum;
    }
}
