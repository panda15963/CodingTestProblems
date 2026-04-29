function maximumScore(grid) {
    const n = grid.length;
    // prefix[j][i] := the sum of the first i elements in the j-th column
    const prefix = Array.from({length: n}, () => new Array(n + 1).fill(0));
    // prevPick[i] := the maximum achievable score up to the previous column,
    // where the bottommost selected element in that column is in row (i - 1)
    let prevPick = new Array(n + 1).fill(0);
    // prevSkip[i] := the maximum achievable score up to the previous column,
    // where the bottommost selected element in the column before the previous
    // one is in row (i - 1)
    let prevSkip = new Array(n + 1).fill(0);

    for (let j = 0; j < n; ++j) {
        for (let i = 0; i < n; ++i) {
            prefix[j][i + 1] = prefix[j][i] + grid[i][j];
        }
    }

    for (let j = 1; j < n; ++j) {
        const currPick = new Array(n + 1).fill(-Infinity);
        const currSkip = new Array(n + 1).fill(-Infinity);
        // Consider all possible combinations of the number of current and
        // previous selected elements.
        for (let curr = 0; curr <= n; ++curr) {
            for (let prev = 0; prev <= n; ++prev) {
                if (curr > prev) {
                    // 1. The current bottom is deeper than the previous bottom.
                    // Get the score of grid[prev..curr)[j - 1] for pick and skip.
                    const score = prefix[j - 1][curr] - prefix[j - 1][prev];
                    currPick[curr] = Math.max(currPick[curr], prevSkip[prev] + score);
                    currSkip[curr] = Math.max(currSkip[curr], prevSkip[prev] + score);
                } else {
                    // 2. The previous bottom is deeper than the current bottom.
                    // Get the score of grid[curr..prev)[j] for pick only.
                    const score = prefix[j][prev] - prefix[j][curr];
                    currPick[curr] = Math.max(currPick[curr], prevPick[prev] + score);
                    currSkip[curr] = Math.max(currSkip[curr], prevPick[prev]);
                }
            }
        }
        prevPick = currPick;
        prevSkip = currSkip;
    }

    return Math.max(...prevPick);
}