var maxProfit = function (prices) {
    let current = prices[0];
    let maxProfit = 0;

    for (let i = 1; i < prices.length; i++) {
        const temp = prices[i] - current;

        if (temp < 0) {
            current = prices[i];
        } else {
            maxProfit = Math.max(maxProfit, temp);
        }
    }

    return maxProfit;
};