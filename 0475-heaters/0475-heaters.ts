function findRadius(houses: number[], heaters: number[]): number {
    houses.sort((a, b) => a - b);
    heaters.sort((a, b) => a - b);

    const feasible = (radius: number): boolean => {
        let houseIdx = 0;
        let heaterIdx = 0;

        while (houseIdx < houses.length) {
            if (heaterIdx >= heaters.length) {
                return false;
            }

            const minCoverage = heaters[heaterIdx] - radius;
            const maxCoverage = heaters[heaterIdx] + radius;

            if (houses[houseIdx] < minCoverage) {
                return false;
            }
            if (houses[houseIdx] > maxCoverage) {
                heaterIdx++;
            } else {
                houseIdx++;
            }
        }

        return true;
    };

    let left = 0;
    let right = 1000000000;
    let firstTrueIndex = -1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (feasible(mid)) {
            firstTrueIndex = mid;
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }

    return firstTrueIndex;
}
