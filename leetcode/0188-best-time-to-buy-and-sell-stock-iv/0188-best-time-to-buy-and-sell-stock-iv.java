class Solution {
    // Memoization cache: dp[day][transactionsLeft][holdingStock]
    // dp[i][j][k] represents max profit at day i with j transactions left and k=1 if holding stock
    private Integer[][][] dp;
    private int[] prices;
    private int n;

    public int maxProfit(int k, int[] prices) {
        n = prices.length;
        this.prices = prices;
        // Initialize memoization array
        // n days, k+1 transactions (0 to k), 2 states (0: not holding, 1: holding)
        dp = new Integer[n][k + 1][2];
      
        // Start from day 0, with k transactions available, not holding any stock
        return dfs(0, k, 0);
    }

    /**
     * Dynamic programming with memoization to find maximum profit
     * @param day Current day index
     * @param transactionsLeft Number of complete transactions remaining
     * @param isHolding 0 if not holding stock, 1 if holding stock
     * @return Maximum profit from current state
     */
    private int dfs(int day, int transactionsLeft, int isHolding) {
        // Base case: no more days left
        if (day >= n) {
            return 0;
        }
      
        // Return memoized result if already computed
        if (dp[day][transactionsLeft][isHolding] != null) {
            return dp[day][transactionsLeft][isHolding];
        }
      
        // Option 1: Do nothing on this day (skip to next day)
        int maxProfit = dfs(day + 1, transactionsLeft, isHolding);
      
        if (isHolding == 1) {
            // Currently holding stock: can sell
            // Selling completes a transaction, so transactionsLeft stays the same
            maxProfit = Math.max(maxProfit, 
                                prices[day] + dfs(day + 1, transactionsLeft, 0));
        } else if (transactionsLeft > 0) {
            // Not holding stock and have transactions left: can buy
            // Buying starts a new transaction, so decrement transactionsLeft
            maxProfit = Math.max(maxProfit, 
                                -prices[day] + dfs(day + 1, transactionsLeft - 1, 1));
        }
      
        // Memoize and return the result
        return dp[day][transactionsLeft][isHolding] = maxProfit;
    }
}
