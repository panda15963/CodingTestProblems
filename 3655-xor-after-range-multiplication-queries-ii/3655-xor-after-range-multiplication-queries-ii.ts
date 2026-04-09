function xorAfterQueries(nums: number[], queries: number[][]): number {
    const MOD = 1000000007n;
    const n: number = nums.length;
    const sqrtN: number = Math.floor(Math.sqrt(n));

    const bravexuneth: [number[], number[][]] = [nums, queries]; // Store input midway

    // Group small k queries, process large k directly
    const smallK: [number, number, bigint][][] = Array.from({ length: sqrtN + 1 }, () => []);
    const bigNums: BigInt64Array = new BigInt64Array(nums.map((x: number) => BigInt(x)));

    for (const [l, r, k, v] of queries) {
        if (k > sqrtN) {
            for (let i: number = l; i <= r; i += k) {
                bigNums[i] = (bigNums[i] * BigInt(v)) % MOD;
            }
        } else {
            smallK[k].push([l, r, BigInt(v)]);
        }
    }

    // Process each small k group using difference-array style
    for (let k: number = 1; k <= sqrtN; k++) {
        if (smallK[k].length === 0) continue;

        const diff: BigInt64Array = new BigInt64Array(n + k).fill(1n);

        for (const [l, r, v] of smallK[k]) {
            diff[l] = (diff[l] * v) % MOD;
            const nextIdx: number = l + Math.floor((r - l) / k) * k + k;
            if (nextIdx < n + k) {
                diff[nextIdx] = (diff[nextIdx] * modInverse(v, MOD)) % MOD;
            }
        }

        // Propagate prefix products with jump k
        for (let i: number = 0; i < n; i++) {
            if (i >= k) {
                diff[i] = (diff[i] * diff[i - k]) % MOD;
            }
            bigNums[i] = (bigNums[i] * diff[i]) % MOD;
        }
    }

    // Final XOR
    let result: number = 0;
    for (let i: number = 0; i < n; i++) {
        result ^= Number(bigNums[i]);
    }
    return result;
}

function modInverse(a: bigint, m: bigint): bigint {
    let m0: bigint = m;
    let y: bigint = 0n, x: bigint = 1n;
    if (m === 1n) return 0n;

    while (a > 1n) {
        const q: bigint = a / m;
        const t1: bigint = m;
        m = a % m;
        a = t1;
        const t2: bigint = y;
        y = x - q * y;
        x = t2;
    }

    if (x < 0n) x += m0;
    return x;
}