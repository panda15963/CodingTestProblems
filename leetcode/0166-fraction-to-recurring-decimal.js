var fractionToDecimal = function(numerator, denominator) {
    if (numerator === 0) {
        return "0";
    }

    const result = [];

    const isNegative =
        (numerator > 0) !== (denominator > 0);

    if (isNegative) {
        result.push("-");
    }

    let dividend = Math.abs(numerator);
    const divisor = Math.abs(denominator);

    result.push(
        Math.floor(dividend / divisor).toString()
    );

    dividend %= divisor;

    if (dividend === 0) {
        return result.join("");
    }

    result.push(".");

    const remainderToPosition = new Map();

    while (dividend !== 0) {
        remainderToPosition.set(
            dividend,
            result.length
        );

        dividend *= 10;

        result.push(
            Math.floor(dividend / divisor).toString()
        );

        dividend %= divisor;

        if (remainderToPosition.has(dividend)) {
            const repeatStartPosition =
                remainderToPosition.get(dividend);

            result.splice(
                repeatStartPosition,
                0,
                "("
            );

            result.push(")");

            break;
        }
    }

    return result.join("");
};