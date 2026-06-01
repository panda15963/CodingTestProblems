class Solution {
    /**
     * Calculates the minimum cost to buy all items with a "buy 2 get 1 free" offer.
     * The strategy is to buy the most expensive items first and get the cheapest ones free.
     * 
     * @param cost Array containing the cost of each item
     * @return The minimum total cost to buy all items
     */
    public int minimumCost(int[] cost) {
        // Sort the array in ascending order to process from most expensive items
        Arrays.sort(cost);
      
        // Initialize total cost accumulator
        int totalCost = 0;
      
        // Process items in groups of 3, starting from the most expensive
        // Buy the two most expensive items in each group, get the third one free
        for (int i = cost.length - 1; i >= 0; i -= 3) {
            // Add the most expensive item in the current group
            totalCost += cost[i];
          
            // Add the second most expensive item if it exists
            if (i > 0) {
                totalCost += cost[i - 1];
            }
            // The third item (at index i-2) is free, so we skip it
        }
      
        return totalCost;
    }
}