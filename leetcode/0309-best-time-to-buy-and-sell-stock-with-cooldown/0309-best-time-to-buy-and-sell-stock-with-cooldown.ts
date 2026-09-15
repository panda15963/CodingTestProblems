/**
 * Calculates the maximum profit from stock transactions with a cooldown period.
 * After selling stock, you must wait one day before buying again.
 * 
 * @param prices - Array of stock prices for each day
 * @returns Maximum profit achievable
 */
function maxProfit(prices: number[]): number {
    const pricesLength: number = prices.length;
  
    // Memoization table: memo[day][holdingStock]
    // memo[i][0] = max profit at day i when not holding stock
    // memo[i][1] = max profit at day i when holding stock
    const memo: number[][] = Array.from(
        { length: pricesLength }, 
        () => Array.from({ length: 2 }, () => -1)
    );
  
    /**
     * Dynamic programming helper function to calculate maximum profit
     * 
     * @param currentDay - Current day index
     * @param isHoldingStock - 1 if currently holding stock, 0 if not
     * @returns Maximum profit from current state onwards
     */
    const calculateMaxProfit = (currentDay: number, isHoldingStock: number): number => {
        // Base case: no more days left
        if (currentDay >= pricesLength) {
            return 0;
        }
      
        // Return memoized result if already calculated
        if (memo[currentDay][isHoldingStock] !== -1) {
            return memo[currentDay][isHoldingStock];
        }
      
        // Option 1: Do nothing (skip current day)
        let maxProfitFromCurrentState: number = calculateMaxProfit(currentDay + 1, isHoldingStock);
      
        if (isHoldingStock) {
            // Currently holding stock: can sell today
            // After selling, must wait one day (cooldown), so next buy is at currentDay + 2
            const profitFromSelling: number = prices[currentDay] + calculateMaxProfit(currentDay + 2, 0);
            maxProfitFromCurrentState = Math.max(maxProfitFromCurrentState, profitFromSelling);
        } else {
            // Not holding stock: can buy today
            // Buying costs prices[currentDay], then continue with holding stock
            const profitFromBuying: number = -prices[currentDay] + calculateMaxProfit(currentDay + 1, 1);
            maxProfitFromCurrentState = Math.max(maxProfitFromCurrentState, profitFromBuying);
        }
      
        // Memoize and return the result
        memo[currentDay][isHoldingStock] = maxProfitFromCurrentState;
        return maxProfitFromCurrentState;
    };
  
    // Start from day 0 with no stock held
    return calculateMaxProfit(0, 0);
}
