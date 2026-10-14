function maxSumOfSquares(num: number, total: number): string {
    if (num * 9 < total) {
        return "";
    }

    const nines: number = Math.floor(total / 9);
    const rem: number = total % 9;

    let result: string = "9".repeat(nines);

    if (rem > 0) {
        result += rem;
    }

    while (result.length < num) {
        result += "0";
    }

    return result;
}