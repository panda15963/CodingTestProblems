/**
 * Calculates the maximum profit from at most k stock transactions
 * @param k - Maximum number of transactions allowed
 * @param prices - Array of stock prices on each day
 * @returns Maximum profit achievable
 */
function maxProfit(k: number, prices: number[]): number {
    const n: number = prices.length;
  
    // Initialize memoization table
    // memo[day][transactionsRemaining][holdingStock]
    // memo[i][j][0] = max profit on day i with j transactions left, not holding stock
    // memo[i][j][1] = max profit on day i with j transactions left, holding stock
    const memo: number[][][] = Array.from({ length: n }, () =>
        Array.from({ length: k + 1 }, () => 
            Array.from({ length: 2 }, () => -1)
        )
    );
  
    /**
     * Dynamic programming helper function with memoization
     * @param day - Current day index
     * @param transactionsRemaining - Number of transactions still available
     * @param isHoldingStock - 1 if currently holding stock, 0 otherwise
     * @returns Maximum profit from current state onwards
     */
    const dfs = (day: number, transactionsRemaining: number, isHoldingStock: number): number => {
        // Base case: no more days to trade
        if (day >= n) {
            return 0;
        }
      
        // Return memoized result if already computed
        if (memo[day][transactionsRemaining][isHoldingStock] !== -1) {
            return memo[day][transactionsRemaining][isHoldingStock];
        }
      
        // Option 1: Do nothing on this day
        let maxProfitFromHere: number = dfs(day + 1, transactionsRemaining, isHoldingStock);
      
        if (isHoldingStock) {
            // Option 2: Sell stock today (complete a transaction)
            maxProfitFromHere = Math.max(
                maxProfitFromHere, 
                prices[day] + dfs(day + 1, transactionsRemaining, 0)
            );
        } else if (transactionsRemaining > 0) {
            // Option 2: Buy stock today (start a new transaction)
            maxProfitFromHere = Math.max(
                maxProfitFromHere, 
                -prices[day] + dfs(day + 1, transactionsRemaining - 1, 1)
            );
        }
      
        // Memoize and return the result
        memo[day][transactionsRemaining][isHoldingStock] = maxProfitFromHere;
        return maxProfitFromHere;
    };
  
    // Start from day 0, with k transactions available, not holding any stock
    return dfs(0, k, 0);
}
