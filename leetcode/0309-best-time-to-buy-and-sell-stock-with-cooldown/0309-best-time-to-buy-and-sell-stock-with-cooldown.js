var maxProfit = function(prices) {
    const pricesLength = prices.length;

    const memo = Array.from(
        { length: pricesLength },
        () => Array(2).fill(-1)
    );

    const calculateMaxProfit = (currentDay, isHoldingStock) => {
        if (currentDay >= pricesLength) {
            return 0;
        }

        if (memo[currentDay][isHoldingStock] !== -1) {
            return memo[currentDay][isHoldingStock];
        }

        // Do nothing
        let maxProfitFromCurrentState =
            calculateMaxProfit(currentDay + 1, isHoldingStock);

        if (isHoldingStock) {
            // Sell today, then cooldown for one day
            const profitFromSelling =
                prices[currentDay] +
                calculateMaxProfit(currentDay + 2, 0);

            maxProfitFromCurrentState = Math.max(
                maxProfitFromCurrentState,
                profitFromSelling
            );
        } else {
            // Buy today
            const profitFromBuying =
                -prices[currentDay] +
                calculateMaxProfit(currentDay + 1, 1);

            maxProfitFromCurrentState = Math.max(
                maxProfitFromCurrentState,
                profitFromBuying
            );
        }

        memo[currentDay][isHoldingStock] = maxProfitFromCurrentState;

        return maxProfitFromCurrentState;
    };

    return calculateMaxProfit(0, 0);
};