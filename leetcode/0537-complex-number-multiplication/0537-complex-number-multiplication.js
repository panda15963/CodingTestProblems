var complexNumberMultiply = function(num1, num2) {
    const [a1, b1] = num1.slice(0, -1).split('+').map(Number);
    const [a2, b2] = num2.slice(0, -1).split('+').map(Number);

    return `${a1 * a2 - b1 * b2}+${a1 * b2 + a2 * b1}i`;
};