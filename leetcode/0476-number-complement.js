var findComplement = function(num) {
    const bitLength = num.toString(2).length;
    const mask = (1 << bitLength) - 1;

    return num ^ mask;
};