/**
 * Calculates the maximum profit from at most k stock transactions
 * @param {number} k
 * @param {number[]} prices
 * @return {number}
 */
function maxProfit(k, prices) {
    const n = prices.length;

    // memo[day][transactionsRemaining][holdingStock]
    // -1 = 아직 계산하지 않음
    const memo = Array.from(
        { length: n },
        () =>
            Array.from(
                { length: k + 1 },
                () => Array(2).fill(-1)
            )
    );

    function dfs(day, transactionsRemaining, isHoldingStock) {
        // 더 이상 거래할 날짜가 없는 경우
        if (day >= n) {
            return 0;
        }

        // 이미 계산한 값
        if (memo[day][transactionsRemaining][isHoldingStock] !== -1) {
            return memo[day][transactionsRemaining][isHoldingStock];
        }

        // 1. 아무것도 하지 않음
        let maxProfitFromHere =
            dfs(day + 1, transactionsRemaining, isHoldingStock);

        if (isHoldingStock) {
            // 2. 주식을 매도
            maxProfitFromHere = Math.max(
                maxProfitFromHere,
                prices[day] +
                    dfs(day + 1, transactionsRemaining, 0)
            );
        } else if (transactionsRemaining > 0) {
            // 2. 주식을 매수
            maxProfitFromHere = Math.max(
                maxProfitFromHere,
                -prices[day] +
                    dfs(day + 1, transactionsRemaining - 1, 1)
            );
        }

        memo[day][transactionsRemaining][isHoldingStock] =
            maxProfitFromHere;

        return maxProfitFromHere;
    }

    return dfs(0, k, 0);
}