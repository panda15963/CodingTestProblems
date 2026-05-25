function canReach(s, minJump, maxJump) {
    const n = s.length;

    const prefixSum = new Array(n + 1).fill(0);
    prefixSum[1] = 1;

    const isReachable = new Array(n).fill(false);
    isReachable[0] = true;

    for (let i = 1; i < n; i++) {
        if (s[i] === '0') {
            const leftBound = Math.max(0, i - maxJump);
            const rightBound = i - minJump;

            if (leftBound <= rightBound) {
                const reachableCount = prefixSum[rightBound + 1] - prefixSum[leftBound];
                isReachable[i] = reachableCount > 0;
            }
        }

        prefixSum[i + 1] = prefixSum[i] + (isReachable[i] ? 1 : 0);
    }

    return isReachable[n - 1];
}