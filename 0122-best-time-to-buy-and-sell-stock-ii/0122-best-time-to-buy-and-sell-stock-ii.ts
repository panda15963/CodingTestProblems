function maxProfit(prices: number[]): number {
    let buy: number = prices[0];
    let profit: number = 0;
    let result: number = 0;

    for (let i = 1; i < prices.length; i++) {
        buy = Math.min(buy, prices[i]);

        const prev: number = profit;
        profit = Math.max(profit, prices[i] - buy);

        if (profit !== prev && profit > 0) {
            result += profit;
            profit = 0;
            buy = prices[i];
        }
    }

    return result;
}