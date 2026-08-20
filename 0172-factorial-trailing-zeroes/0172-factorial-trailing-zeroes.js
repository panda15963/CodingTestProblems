var trailingZeroes = function(n) {
    let trailingZeroCount = 0;

    while (n > 0) {
        n = Math.floor(n / 5);
        trailingZeroCount += n;
    }

    return trailingZeroCount;
};