var maxSumOfSquares = function(num, total) {
    if (num * 9 < total) {
        return "";
    }

    const nines = Math.floor(total / 9);
    const rem = total % 9;

    let result = "9".repeat(nines);

    if (rem > 0) {
        result += rem;
    }

    while (result.length < num) {
        result += "0";
    }

    return result;
};