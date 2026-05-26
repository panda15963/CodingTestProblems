function solution(depth, money, excavate) {
    const n = depth.length;
    const dp = Array.from({ length: n + 2 }, () => Array(n + 2).fill(0));
    const opt = Array.from({ length: n + 2 }, () => Array(n + 2).fill(0));

    for (let len = 1; len <= n; len++) {
        for (let i = 1; i + len - 1 <= n; i++) {
            const j = i + len - 1;

            if (i === j) {
                dp[i][j] = depth[i - 1];
                opt[i][j] = i;
                continue;
            }

            let best = Infinity;
            let bestK = i;

            for (let k = i; k <= j; k++) {
                const leftCost = k > i ? dp[i][k - 1] : 0;
                const rightCost = k < j ? dp[k + 1][j] : 0;
                const cost = depth[k - 1] + Math.max(leftCost, rightCost);

                if (cost < best) {
                    best = cost;
                    bestK = k;
                }
            }

            dp[i][j] = best;
            opt[i][j] = bestK;
        }
    }

    let left = 1;
    let right = n;

    while (left <= right) {
        const mid = opt[left][right];
        const result = excavate(mid);

        if (result === 0) {
            return mid;
        } else if (result === -1) {
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }

    return -1;
}