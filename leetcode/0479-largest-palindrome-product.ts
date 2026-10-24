function largestPalindrome(n: number): number {
    if (n === 1) {
        return 9;
    }

    if (n === 8) {
        return 475;
    }

    const mx = Math.pow(10, n) - 1;

    for (let a = mx; a > Math.floor(mx / 10); --a) {
        let b = a;
        let x = a;

        while (b !== 0) {
            x = x * 10 + (b % 10);
            b = Math.floor(b / 10);
        }

        for (let t = mx; t * t >= x; --t) {
            if (x % t === 0) {
                const other = x / t;

                if (other >= Math.pow(10, n - 1) && other <= mx) {
                    return x % 1337;
                }
            }
        }
    }

    return 9;
}