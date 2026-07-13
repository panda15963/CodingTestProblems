var sequentialDigits = function(low, high) {
    const res = [];

    const lowDigit = String(low).length;
    const highDigit = String(high).length;

    for (let digits = lowDigit; digits <= highDigit; digits++) {
        for (let start = 1; start < 10; start++) {
            if (start + digits > 10) {
                break;
            }

            let num = start;
            let prev = start;

            for (let i = 1; i < digits; i++) {
                num = num * 10 + (++prev);
            }

            if (num >= low && num <= high) {
                res.push(num);
            }
        }
    }

    return res;
};