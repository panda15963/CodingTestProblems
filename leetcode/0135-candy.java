class Solution {
    public int candy(int[] ratings) {
        int n = ratings.length;
      
        // Array to store minimum candies needed considering left neighbor constraint
        int[] leftToRight = new int[n];
        // Array to store minimum candies needed considering right neighbor constraint
        int[] rightToLeft = new int[n];
      
        // Initialize both arrays with 1 (minimum candy per child)
        Arrays.fill(leftToRight, 1);
        Arrays.fill(rightToLeft, 1);
      
        // Left to right pass: ensure higher rated child gets more candy than left neighbor
        for (int i = 1; i < n; i++) {
            if (ratings[i] > ratings[i - 1]) {
                leftToRight[i] = leftToRight[i - 1] + 1;
            }
        }
      
        // Right to left pass: ensure higher rated child gets more candy than right neighbor
        for (int i = n - 2; i >= 0; i--) {
            if (ratings[i] > ratings[i + 1]) {
                rightToLeft[i] = rightToLeft[i + 1] + 1;
            }
        }
      
        // Calculate total candies needed
        int totalCandies = 0;
        for (int i = 0; i < n; i++) {
            // Take maximum to satisfy both left and right neighbor constraints
            totalCandies += Math.max(leftToRight[i], rightToLeft[i]);
        }
      
        return totalCandies;
    }
}