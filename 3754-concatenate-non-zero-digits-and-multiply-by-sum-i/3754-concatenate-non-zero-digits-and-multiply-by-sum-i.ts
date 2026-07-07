function sumAndMultiply(n: number): number {
    let x = 0;
    let sum = 0;

    // 문자열로 변환하여 왼쪽부터 순회
    const str: string = n.toString();

    for (const ch of str) {
        if (ch !== "0") {
            const digit: number = Number(ch);
            sum += digit;
            x = x * 10 + digit;
        }
    }

    return x * sum;
}