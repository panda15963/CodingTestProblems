function pathExistenceQueries(
    n: number,
    nums: number[],
    maxDiff: number,
    queries: number[][]
): number[] {
    const indexedNums = Array.from({ length: n }, (_, i) => ({
        val: nums[i],
        origIdx: i,
    }));

    indexedNums.sort((a, b) => a.val - b.val);

    const sortedPos: number[] = new Array(n);

    for (let i = 0; i < n; i++) {
        sortedPos[indexedNums[i].origIdx] = i;
    }

    const LOG = 18;
    const st: number[][] = Array.from(
        { length: n },
        () => new Array(LOG).fill(0)
    );

    let r = 0;

    for (let i = 0; i < n; i++) {
        r = Math.max(r, i);

        while (
            r + 1 < n &&
            indexedNums[r + 1].val - indexedNums[i].val <= maxDiff
        ) {
            r++;
        }

        st[i][0] = r;
    }

    for (let j = 1; j < LOG; j++) {
        for (let i = 0; i < n; i++) {
            st[i][j] = st[st[i][j - 1]][j - 1];
        }
    }

    const answer: number[] = [];

    for (const [u, v] of queries) {
        let a = sortedPos[u];
        let b = sortedPos[v];

        if (a === b) {
            answer.push(0);
            continue;
        }

        if (a > b) {
            [a, b] = [b, a];
        }

        let cur = a;
        let steps = 0;

        for (let j = LOG - 1; j >= 0; j--) {
            if (st[cur][j] < b) {
                cur = st[cur][j];
                steps += 1 << j;
            }
        }

        if (st[cur][0] >= b) {
            answer.push(steps + 1);
        } else {
            answer.push(-1);
        }
    }

    return answer;
}