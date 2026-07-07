function sumAndMultiply(n) {
    let x = 0;
    let sum = 0;

    // 문자열로 변환하여 왼쪽부터 순회
    const str = String(n);

    for (const ch of str) {
        if (ch !== '0') {
            const digit = Number(ch);
            sum += digit;
            x = x * 10 + digit;
        }
    }

    return x * sum;
}