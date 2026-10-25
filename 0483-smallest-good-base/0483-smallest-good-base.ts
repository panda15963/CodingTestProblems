
function smallestGoodBase(n: string): string {
    const target = BigInt(n);
    const MAX = (1n << 63n) - 1n;

    function calculateSum(base: bigint, numTerms: number): bigint {
        let power = 1n;
        let sum = 1n;

        for (let i = 0; i < numTerms; i++) {
            if (power > MAX / base) {
                return MAX;
            }

            power *= base;

            if (sum > MAX - power) {
                return MAX;
            }

            sum += power;
        }

        return sum;
    }

    function findBase(numTerms: number): bigint {
        let left = 2n;
        let right = target - 1n;
        let firstTrue = -1n;

        while (left <= right) {
            const mid = left + (right - left) / 2n;

            if (calculateSum(mid, numTerms) >= target) {
                firstTrue = mid;
                right = mid - 1n;
            } else {
                left = mid + 1n;
            }
        }

        if (
            firstTrue !== -1n &&
            calculateSum(firstTrue, numTerms) === target
        ) {
            return firstTrue;
        }

        return -1n;
    }

    for (let numTerms = 63; numTerms >= 2; numTerms--) {
        const base = findBase(numTerms);

        if (base !== -1n) {
            return base.toString();
        }
    }

    return (target - 1n).toString();
}
