var maxProfit = function (prices) {
    // 첫 번째 매수
    let firstBuy = -prices[0];

    // 첫 번째 매도
    let firstSell = 0;

    // 두 번째 매수
    let secondBuy = -prices[0];

    // 두 번째 매도
    let secondSell = 0;

    for (let i = 1; i < prices.length; i++) {
        // 첫 번째 거래
        firstBuy = Math.max(firstBuy, -prices[i]);
        firstSell = Math.max(firstSell, firstBuy + prices[i]);

        // 두 번째 거래
        secondBuy = Math.max(secondBuy, firstSell - prices[i]);
        secondSell = Math.max(secondSell, secondBuy + prices[i]);
    }

    return secondSell;
};