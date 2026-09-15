class Solution {
    private int[] prices;
    private Integer[][] memo;  // Memoization table: memo[day][holdingStock]
  
    public int maxProfit(int[] prices) {
        this.prices = prices;
        int n = prices.length;
        // Initialize memoization table
        // memo[i][0]: max profit at day i without holding stock
        // memo[i][1]: max profit at day i while holding stock
        memo = new Integer[n][2];
      
        // Start from day 0 without holding any stock
        return dfs(0, 0);
    }
  
    /**
     * Calculate maximum profit using dynamic programming with memoization
     * @param day - current day index
     * @param holdingStock - 0: not holding stock, 1: holding stock
     * @return maximum profit from current state
     */
    private int dfs(int day, int holdingStock) {
        // Base case: no more days to trade
        if (day >= prices.length) {
            return 0;
        }
      
        // Return memoized result if already calculated
        if (memo[day][holdingStock] != null) {
            return memo[day][holdingStock];
        }
      
        // Option 1: Do nothing today (skip to next day)
        int maxProfit = dfs(day + 1, holdingStock);
      
        if (holdingStock == 1) {
            // Currently holding stock: can sell today
            // After selling, must cooldown for 1 day (skip to day + 2)
            int sellProfit = prices[day] + dfs(day + 2, 0);
            maxProfit = Math.max(maxProfit, sellProfit);
        } else {
            // Not holding stock: can buy today
            // Buying costs prices[day], then move to next day holding stock
            int buyProfit = -prices[day] + dfs(day + 1, 1);
            maxProfit = Math.max(maxProfit, buyProfit);
        }
      
        // Memoize and return the result
        memo[day][holdingStock] = maxProfit;
        return maxProfit;
    }
}
