class Solution {
	public int maxProfit(int[] prices) {
        
		int buy = prices[0];
    int profit = 0;
    int result = 0;
      
    for (int i = 1; i < prices.length; i ++) {
	    buy = Math.min(buy, prices[i]);
      int prev = profit;
      profit = Math.max(profit, prices[i] - buy);
      if (profit != prev && profit > 0) {
          result += profit;
          profit = 0;
          buy = prices[i];
			}
    }
    return result;  
  }
}