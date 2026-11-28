var maximumSaleItems = function(items, budget) {
    const n = items.length;
    let maxFactor = 0;
    let minPrice = Number.MAX_SAFE_INTEGER;

    for (const item of items) {
        maxFactor = Math.max(maxFactor, item[0]);
        minPrice = Math.min(minPrice, item[1]);
    }

    const cntFactor = new Array(maxFactor + 1).fill(0);

    for (const item of items) {
        cntFactor[item[0]]++;
    }

    const cntMulti = new Array(maxFactor + 1).fill(0);
    const bonusByPrice = new Map();

    for (const item of items) {
        const factor = item[0];
        const price = item[1];

        if (price >= minPrice * 2) continue;

        if (cntMulti[factor] === 0) {
            for (let mult = factor; mult <= maxFactor; mult += factor) {
                cntMulti[factor] += cntFactor[mult];
            }
        }

        const freeCount = cntMulti[factor] - 1;

        if (freeCount > 0) {
            bonusByPrice.set(
                price,
                (bonusByPrice.get(price) || 0) + freeCount
            );
        }
    }

    let totalItems = 0;

    // TreeMap처럼 가격 오름차순으로 정렬
    const sortedPrices = [...bonusByPrice.keys()].sort((a, b) => a - b);

    for (const price of sortedPrices) {
        const availableFree = bonusByPrice.get(price);

        if (budget < price) break;

        const buyCount = Math.min(availableFree, Math.floor(budget / price));

        budget -= buyCount * price;
        totalItems += buyCount * 2;
    }

    totalItems += Math.floor(budget / minPrice);

    return totalItems;
};