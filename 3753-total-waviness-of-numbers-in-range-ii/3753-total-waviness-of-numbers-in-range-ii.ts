function totalWaviness(num1: number, num2: number): number {
    const ans2 = countWavinessUpTo(BigInt(num2))[1];
    const ans1 = countWavinessUpTo(BigInt(num1) - 1n)[1];
    return Number(ans2 - ans1);
}

function countWavinessUpTo(n: bigint): [bigint, bigint] {
    if (n <= 0n) return [0n, 0n];

    const s = n.toString();
    const len = s.length;
    const memo = new Map<string, [bigint, bigint]>();

    function dp(
        idx: number,
        lastDigit: number,
        lastCmp: number,
        isLess: boolean,
        isStarted: boolean
    ): [bigint, bigint] {
        if (idx === len) {
            return [isStarted ? 1n : 0n, 0n];
        }

        const key = `${idx},${lastDigit},${lastCmp},${isLess},${isStarted}`;
        const cached = memo.get(key);
        if (cached) return cached;

        let totalCount = 0n;
        let totalWavinessSum = 0n;

        const limit = isLess ? 9 : Number(s[idx]);

        for (let d = 0; d <= limit; d++) {
            const nextIsLess = isLess || d < limit;

            if (!isStarted) {
                if (d === 0) {
                    const [cnt, wav] = dp(idx + 1, -1, 0, nextIsLess, false);
                    totalCount += cnt;
                    totalWavinessSum += wav;
                } else {
                    const [cnt, wav] = dp(idx + 1, d, 0, nextIsLess, true);
                    totalCount += cnt;
                    totalWavinessSum += wav;
                }
            } else {
                let currentCmp = 0;
                if (d > lastDigit) currentCmp = 1;
                else if (d < lastDigit) currentCmp = -1;

                let deltaWaviness = 0n;
                if (lastCmp !== 0 && currentCmp !== 0 && currentCmp === -lastCmp) {
                    deltaWaviness = 1n;
                }

                const [cnt, wav] = dp(idx + 1, d, currentCmp, nextIsLess, true);
                totalCount += cnt;
                totalWavinessSum += wav + deltaWaviness * cnt;
            }
        }

        const result: [bigint, bigint] = [totalCount, totalWavinessSum];
        memo.set(key, result);
        return result;
    }

    return dp(0, -1, 0, false, false);
}