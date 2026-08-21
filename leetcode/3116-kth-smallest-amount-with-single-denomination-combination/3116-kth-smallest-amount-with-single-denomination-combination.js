var findKthSmallest = function(coins, k) {
    const coinsCount = coins.length;

    // maxValue 이하에 존재하는 유효한 숫자의 개수
    const countMultiples = function(maxValue) {
        let count = 0n;

        for (let subset = 1; subset < (1 << coinsCount); ++subset) {
            let currentLcm = 1n;

            for (let coinIndex = 0; coinIndex < coinsCount; ++coinIndex) {
                if ((subset >> coinIndex) & 1) {
                    currentLcm = lcm(
                        currentLcm,
                        BigInt(coins[coinIndex])
                    );

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

    // mid 이하에 k개 이상의 유효한 숫자가 있는지 확인
    const feasible = function(mid) {
        return countMultiples(mid) >= BigInt(k);
    };

    // Binary Search
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
};


// 최대공약수
function gcd(a, b) {
    return b === 0n ? a : gcd(b, a % b);
}


// 최소공배수
function lcm(a, b) {
    return (a * b) / gcd(a, b);
}


// 비트 개수 계산
function bitCount(i) {
    i = i - ((i >>> 1) & 0x55555555);
    i = (i & 0x33333333) + ((i >>> 2) & 0x33333333);
    i = (i + (i >>> 4)) & 0x0f0f0f0f;
    i = i + (i >>> 8);
    i = i + (i >>> 16);

    return i & 0x3f;
}