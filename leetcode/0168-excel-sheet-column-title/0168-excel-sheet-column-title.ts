function convertToTitle(columnNumber: number): string {
    let n: number = columnNumber;
    let result: string = "";

    if (n < 27) {
        return String.fromCharCode(n + 64);
    }

    while (n > 0) {
        if (n % 26 === 0) {
            result += "Z";
            n = Math.floor(n / 26);
            n--;
        } else {
            result += String.fromCharCode((n % 26) + 64);
            n = Math.floor(n / 26);
        }
    }

    return result.split("").reverse().join("");
}