var arrangeCoins = function(n) {
    let ans = 1;

    while (true) {
        n -= ans;
        if (n <= ans) break;
        ans++;
    }

    return ans;
};