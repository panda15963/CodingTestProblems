class Solution {
    /**
     * Finds the maximum number of ice cream bars that can be purchased with given coins.
     * Uses a greedy approach by buying the cheapest ice creams first.
     * 
     * @param costs Array containing the cost of each ice cream bar
     * @param coins Total amount of money available to spend
     * @return Maximum number of ice cream bars that can be purchased
     */
    public int maxIceCream(int[] costs, int coins) {
        // Sort the costs array in ascending order to prioritize cheaper ice creams
        Arrays.sort(costs);
      
        // Get the total number of ice cream bars available
        int numberOfIceCreams = costs.length;
      
        // Iterate through the sorted costs array
        for (int i = 0; i < numberOfIceCreams; ++i) {
            // Check if we have enough coins to buy the current ice cream
            if (coins < costs[i]) {
                // If not enough coins, return the count of ice creams bought so far
                return i;
            }
          
            // Deduct the cost of current ice cream from available coins
            coins -= costs[i];
        }
      
        // If we can afford all ice creams, return the total count
        return numberOfIceCreams;
    }
}