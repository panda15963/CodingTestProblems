function maxWalls(robots: number[], distance: number[], walls: number[]): number {
    const n = robots.length;
    const robotInfo: [number, number][] = robots.map((p, i) => [p, distance[i]]);
    robotInfo.sort((a, b) => a[0] - b[0]);
    walls.sort((a, b) => a - b);

    const memo: number[][] = Array.from({ length: n }, () => [-1, -1]);

    const lowerBound = (arr: number[], target: number): number => {
        let l = 0, r = arr.length;
        while (l < r) {
            const m = (l + r) >> 1;
            if (arr[m] < target) l = m + 1;
            else r = m;
        }
        return l;
    };

    const countWalls = (l: number, r: number): number => {
        if (l > r) return 0;
        return lowerBound(walls, r + 1) - lowerBound(walls, l);
    };

    const dfs = (i: number, prevDir: number): number => {
        if (i < 0) return 0;
        if (memo[i][prevDir] !== -1) return memo[i][prevDir];

        const [pos, dist] = robotInfo[i];

        let leftL = pos - dist;
        if (i > 0) {
            leftL = Math.max(leftL, robotInfo[i - 1][0] + 1);
        }
        const leftCnt = countWalls(leftL, pos);

        let rightR = pos + dist;
        if (i + 1 < n) {
            if (prevDir === 0) {
                rightR = Math.min(rightR, robotInfo[i + 1][0] - robotInfo[i + 1][1] - 1);
            } else {
                rightR = Math.min(rightR, robotInfo[i + 1][0] - 1);
            }
        }
        const rightCnt = countWalls(pos, rightR);

        memo[i][prevDir] = Math.max(
            dfs(i - 1, 0) + leftCnt,
            dfs(i - 1, 1) + rightCnt
        );
        return memo[i][prevDir];
    };

    return dfs(n - 1, 1);
}