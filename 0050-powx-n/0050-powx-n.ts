function myPow(x: number, n: number): number {
    if (n === 0 || x === 1) {
        return 1;
    }

    if (n === 1) {
        return x;
    }

    let negative: boolean = false;
    let exponent: number = n;

    if (exponent < 0) {
        negative = true;
        exponent = -exponent;
    }

    let result: number = 1;

    while (exponent > 0) {
        if (exponent % 2 === 1) {
            result *= x;
        }

        x *= x;
        exponent = Math.floor(exponent / 2);
    }

    return negative ? 1 / result : result;
}