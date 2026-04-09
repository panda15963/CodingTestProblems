/**
 * @param {number[]} nums
 * @param {number[][]} queries
 * @return {number}
 */
var xorAfterQueries = function(nums, queries) {
    const MOD = 1000000007n;
    const n = nums.length;
    const sqrtN = Math.floor(Math.sqrt(n));
    
    // Group small k queries, process large k directly
    const smallK = Array.from({ length: sqrtN + 1 }, () => []);
    const bigNums = BigInt64Array.from(nums.map(BigInt));

    for (const [l, r, k, v] of queries) {
        if (k > sqrtN) {
            for (let i = l; i <= r; i += k) {
                bigNums[i] = (bigNums[i] * BigInt(v)) % MOD;
            }
        } else {
            smallK[k].push([l, r, BigInt(v)]);
        }
    }

    // Process each small k group using a difference-array style approach
    for (let k = 1; k <= sqrtN; k++) {
        if (smallK[k].length === 0) continue;
        const diff = new BigInt64Array(n + k).fill(1n);
        
        for (const [l, r, v] of smallK[k]) {
            diff[l] = (diff[l] * v) % MOD;
            const nextIdx = l + Math.floor((r - l) / k) * k + k;
            if (nextIdx < n + k) {
                diff[nextIdx] = (diff[nextIdx] * modInverse(v, MOD)) % MOD;
            }
        }
        
        // Propagate prefix products with jump k
        for (let i = 0; i < n; i++) {
            if (i >= k) diff[i] = (diff[i] * diff[i - k]) % MOD;
            bigNums[i] = (bigNums[i] * diff[i]) % MOD;
        }
    }

    // Final XOR calculation
    let result = 0;
    for (const val of bigNums) {
        result ^= Number(val);
    }
    return result;
};

function modInverse(a, m) {
    let m0 = m, t, q;
    let x0 = 0n, x1 = 1n;
    if (m === 1n) return 0n;
    while (a > 1n) {
        q = a / m;
        t = m;
        m = a % m; a = t;
        t = x0;
        x0 = x1 - q * x0;
        x1 = t;
    }
    if (x1 < 0n) x1 += m0;
    return x1;
}
