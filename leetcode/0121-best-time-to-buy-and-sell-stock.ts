function maxProfit(prices: number[]): number {
    let current: number = prices[0];
    let maxProfit: number = 0;

    for (let i = 1; i < prices.length; i++) {
        const temp: number = prices[i] - current;

        if (temp < 0) {
            current = prices[i];
        } else {
            maxProfit = Math.max(maxProfit, temp);
        }
    }

    return maxProfit;
}