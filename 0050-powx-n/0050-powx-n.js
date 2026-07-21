/**
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
var myPow = function(x, n) {
    if (n === 0 || x === 1) {
        return 1;
    }

    if (n === 1) {
        return x;
    }

    let negative = false;
    let exponent = n;

    if (exponent < 0) {
        negative = true;
        exponent = -exponent;
    }

    let result = 1;

    while (exponent > 0) {
        if (exponent % 2 === 1) {
            result *= x;
        }

        x *= x;
        exponent = Math.floor(exponent / 2);
    }

    return negative ? 1 / result : result;
};