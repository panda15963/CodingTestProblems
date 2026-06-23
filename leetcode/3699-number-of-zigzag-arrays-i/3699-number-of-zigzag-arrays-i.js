function zigZagArrays(n, l, r) {
    const m = r - l;
    const MOD = 1000000007;

    if (n === 1) {
        return m + 1;
    }

    let up = new Array(m + 1);
    let down = new Array(m + 1);

    for (let i = 0; i <= m; i++) {
        up[i] = m - i;
        down[i] = i;
    }

    for (let len = 3; len <= n; len++) {
        const nextUp = new Array(m + 1).fill(0);
        const nextDown = new Array(m + 1).fill(0);

        let downSum = 0;
        for (let i = m; i >= 0; i--) {
            nextUp[i] = downSum;
            downSum = (downSum + down[i]) % MOD;
        }

        let upSum = 0;
        for (let i = 0; i <= m; i++) {
            nextDown[i] = upSum;
            upSum = (upSum + up[i]) % MOD;
        }

        up = nextUp;
        down = nextDown;
    }

    let ans = 0;
    for (let i = 0; i <= m; i++) {
        ans = (ans + up[i] + down[i]) % MOD;
    }

    return ans;
}