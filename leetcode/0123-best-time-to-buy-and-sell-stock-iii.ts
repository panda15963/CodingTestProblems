/**
 * Calculate maximum profit from at most two stock transactions
 * @param prices - Array of stock prices where prices[i] is the price on day i
 * @returns Maximum profit achievable with at most 2 transactions
 */
function maxProfit(prices: number[]): number {
    // State variables for dynamic programming
    // firstBuy: Maximum profit after first buy
    // firstSell: Maximum profit after first sell
    // secondBuy: Maximum profit after second buy
    // secondSell: Maximum profit after second sell
    let firstBuy: number = -prices[0];
    let firstSell: number = 0;
    let secondBuy: number = -prices[0];
    let secondSell: number = 0;
  
    // Iterate through each day's price starting from day 1
    for (let i = 1; i < prices.length; i++) {
        // Update states in reverse order to avoid using updated values
        // For first transaction
        firstBuy = Math.max(firstBuy, -prices[i]);  // Either keep previous buy or buy today
        firstSell = Math.max(firstSell, firstBuy + prices[i]);  // Either keep previous sell or sell today
      
        // For second transaction
        secondBuy = Math.max(secondBuy, firstSell - prices[i]);  // Either keep previous buy or buy today after first sell
        secondSell = Math.max(secondSell, secondBuy + prices[i]);  // Either keep previous sell or sell today
    }
  
    // Return maximum profit after at most two complete transactions
    return secondSell;
}
