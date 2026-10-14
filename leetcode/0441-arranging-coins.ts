function arrangeCoins(n: number): number {
    let ans = 1;

    while (true) {
        n -= ans;
        if (n <= ans) break;
        ans++;
    }

    return ans;
}