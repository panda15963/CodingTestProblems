class Solution {
    public int maxProfit(int[] prices) {
        int current = prices[0];
        int maxProfit = 0;

        for(int i = 1; i < prices.length; i++) {
            
            int temp = prices[i] - current;
            if(temp < 0) {
                current = prices[i];
            } 
            else {
                maxProfit = Math.max(maxProfit, temp);
            }
        }
        return maxProfit;
    }
}