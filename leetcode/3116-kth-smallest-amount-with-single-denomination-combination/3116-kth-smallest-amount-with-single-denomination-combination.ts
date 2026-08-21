/**
 * Finds the kth smallest positive integer that is divisible by at least one element in coins array.
 * Uses binary search combined with inclusion-exclusion principle.
 */
function findKthSmallest(coins: number[], k: number): number {
    const coinsCount = coins.length;

    /**
     * Count how many valid amounts exist <= maxValue.
     */
    const countMultiples = (maxValue: bigint): bigint => {
        let count = 0n;

        for (let subset = 1; subset < (1 << coinsCount); ++subset) {
            let currentLcm = 1n;

            for (let coinIndex = 0; coinIndex < coinsCount; ++coinIndex) {
                if ((subset >> coinIndex) & 1) {
                    currentLcm = lcm(currentLcm, BigInt(coins[coinIndex]));
                    if (currentLcm > maxValue) {
                        break;
                    }
                }
            }

            const subsetSize = bitCount(subset);
            if (subsetSize & 1) {
                count += maxValue / currentLcm;
            } else {
                count -= maxValue / currentLcm;
            }
        }

        return count;
    };

    /**
     * Check if there are at least k valid amounts <= mid.
     */
    const feasible = (mid: bigint): boolean => {
        return countMultiples(mid) >= BigInt(k);
    };

    // Binary search using the standard template
    let left = 1n;
    let right = BigInt(1e11);
    let firstTrueIndex = -1n;

    while (left <= right) {
        const mid = (left + right) / 2n;
        if (feasible(mid)) {
            firstTrueIndex = mid;
            right = mid - 1n;
        } else {
            left = mid + 1n;
        }
    }

    return Number(firstTrueIndex);
}

function gcd(a: bigint, b: bigint): bigint {
    return b === 0n ? a : gcd(b, a % b);
}

function lcm(a: bigint, b: bigint): bigint {
    return (a * b) / gcd(a, b);
}

function bitCount(i: number): number {
    i = i - ((i >>> 1) & 0x55555555);
    i = (i & 0x33333333) + ((i >>> 2) & 0x33333333);
    i = (i + (i >>> 4)) & 0x0f0f0f0f;
    i = i + (i >>> 8);
    i = i + (i >>> 16);
    return i & 0x3f;
}
