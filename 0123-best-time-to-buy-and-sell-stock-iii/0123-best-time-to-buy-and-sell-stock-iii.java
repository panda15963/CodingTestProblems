class Solution {
    public int maxProfit(int[] prices) {
        // State variables for tracking profit at each transaction stage
        // firstBuy: Maximum profit after first stock purchase
        int firstBuy = -prices[0];
      
        // firstSell: Maximum profit after first stock sale
        int firstSell = 0;
      
        // secondBuy: Maximum profit after second stock purchase
        int secondBuy = -prices[0];
      
        // secondSell: Maximum profit after second stock sale
        int secondSell = 0;
      
        // Iterate through each day's price starting from day 1
        for (int i = 1; i < prices.length; i++) {
            // Update maximum profit for first buy
            // Either keep previous first buy or buy at today's price
            firstBuy = Math.max(firstBuy, -prices[i]);
          
            // Update maximum profit for first sell
            // Either keep previous first sell or sell today after first buy
            firstSell = Math.max(firstSell, firstBuy + prices[i]);
          
            // Update maximum profit for second buy
            // Either keep previous second buy or buy today after first sell
            secondBuy = Math.max(secondBuy, firstSell - prices[i]);
          
            // Update maximum profit for second sell
            // Either keep previous second sell or sell today after second buy
            secondSell = Math.max(secondSell, secondBuy + prices[i]);
        }
      
        // Return the maximum profit after at most two transactions
        return secondSell;
    }
}
