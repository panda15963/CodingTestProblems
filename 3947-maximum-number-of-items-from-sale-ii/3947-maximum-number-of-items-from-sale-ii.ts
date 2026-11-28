function maximumSaleItems(items: number[][], budget: number): number {
    const n: number = items.length;
    let maxFactor: number = 0;
    let minPrice: number = Number.MAX_SAFE_INTEGER;

    for (const item of items) {
        maxFactor = Math.max(maxFactor, item[0]);
        minPrice = Math.min(minPrice, item[1]);
    }

    const cntFactor: number[] = new Array(maxFactor + 1).fill(0);

    for (const item of items) {
        cntFactor[item[0]]++;
    }

    const cntMulti: number[] = new Array(maxFactor + 1).fill(0);
    const bonusByPrice: Map<number, number> = new Map();

    for (const item of items) {
        const factor: number = item[0];
        const price: number = item[1];

        if (price >= minPrice * 2) continue;

        if (cntMulti[factor] === 0) {
            for (let mult = factor; mult <= maxFactor; mult += factor) {
                cntMulti[factor] += cntFactor[mult];
            }
        }

        const freeCount: number = cntMulti[factor] - 1;

        if (freeCount > 0) {
            bonusByPrice.set(
                price,
                (bonusByPrice.get(price) ?? 0) + freeCount
            );
        }
    }

    let totalItems: number = 0;

    // TreeMap처럼 가격 오름차순으로 정렬
    const sortedPrices: number[] = [...bonusByPrice.keys()].sort(
        (a, b) => a - b
    );

    for (const price of sortedPrices) {
        const availableFree: number = bonusByPrice.get(price)!;

        if (budget < price) break;

        const buyCount: number = Math.min(
            availableFree,
            Math.floor(budget / price)
        );

        budget -= buyCount * price;
        totalItems += buyCount * 2;
    }

    totalItems += Math.floor(budget / minPrice);

    return totalItems;
}