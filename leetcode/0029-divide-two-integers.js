var divide = function(dividend, divisor) {
    // 오버플로우 예외 처리
    if (dividend === -2147483648 && divisor === -1) {
        return 2147483647;
    }

    let multiplier = 1;

    if (dividend < 0) {
        dividend = -dividend;
        multiplier = -multiplier;
    }

    if (divisor < 0) {
        divisor = -divisor;
        multiplier = -multiplier;
    }

    let left = dividend;
    let quotient = 0;

    while (left >= divisor) {
        let temporalQuotient = 1;
        let currentNumber = divisor;

        while (true) {
            const nextNumber = currentNumber * 2;

            if (nextNumber <= left) {
                temporalQuotient *= 2;
                currentNumber = nextNumber;
            } else {
                left -= currentNumber;
                quotient += temporalQuotient;
                break;
            }
        }
    }

    return quotient * multiplier;
};