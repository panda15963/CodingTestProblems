var smallestUniqueSubarray = function(nums) {
    const BASE1 = 911382323n;
    const MOD1 = 1000000007n;
    const BASE2 = 972663749n;
    const MOD2 = 1000000009n;

    const n = nums.length;

    const pow1 = new Array(n + 1).fill(0n);
    const pow2 = new Array(n + 1).fill(0n);
    const h1 = new Array(n + 1).fill(0n);
    const h2 = new Array(n + 1).fill(0n);

    pow1[0] = 1n;
    pow2[0] = 1n;

    for (let i = 0; i < n; i++) {
        const val = BigInt(nums[i]) + 1n;

        pow1[i + 1] = (pow1[i] * BASE1) % MOD1;
        pow2[i + 1] = (pow2[i] * BASE2) % MOD2;

        h1[i + 1] = (h1[i] * BASE1 + val) % MOD1;
        h2[i + 1] = (h2[i] * BASE2 + val) % MOD2;
    }

    let lo = 1;
    let hi = n;
    let ans = n;

    while (lo <= hi) {
        const mid = lo + Math.floor((hi - lo) / 2);

        if (hasUniqueSubarray(mid, n, pow1, pow2, h1, h2, MOD1, MOD2)) {
            ans = mid;
            hi = mid - 1;
        } else {
            lo = mid + 1;
        }
    }

    return ans;
};

function hasUniqueSubarray(len, n, pow1, pow2, h1, h2, MOD1, MOD2) {
    const counts = new Map();

    for (let i = 0; i <= n - len; i++) {
        const j = i + len;

        const hash1 = (h1[j] - (h1[i] * pow1[len]) % MOD1 + MOD1) % MOD1;
        const hash2 = (h2[j] - (h2[i] * pow2[len]) % MOD2 + MOD2) % MOD2;

        const combinedHash = `${hash1},${hash2}`;

        counts.set(combinedHash, (counts.get(combinedHash) || 0) + 1);
    }

    for (const count of counts.values()) {
        if (count === 1) {
            return true;
        }
    }

    return false;
}