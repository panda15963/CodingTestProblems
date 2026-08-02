function numDecodings(s: string): number {
    const n: number = s.length;
    const memo: (number | undefined)[] = new Array(n);

    const dfs = (i: number): number => {
        if (i === n) return 1;
        if (s[i] === '0') return 0;
        if (memo[i] !== undefined) return memo[i];

        let ans = dfs(i + 1);

        if (i + 1 < n) {
            const twoDigit: number = Number(s.substring(i, i + 2));
            if (twoDigit >= 10 && twoDigit <= 26) {
                ans += dfs(i + 2);
            }
        }

        memo[i] = ans;
        return ans;
    };

    return dfs(0);
}