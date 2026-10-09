function addStrings(num1: string, num2: string): string {
    const len1 = num1.length - 1;
    const len2 = num2.length - 1;
    const max = Math.max(num1.length, num2.length);

    let carry = 0;
    let answer = "";

    for (let i = 0; i < max; i++) {
        const digit1 = len1 - i >= 0
            ? Number(num1[len1 - i])
            : 0;

        const digit2 = len2 - i >= 0
            ? Number(num2[len2 - i])
            : 0;

        const sum = carry + digit1 + digit2;

        carry = Math.floor(sum / 10);
        answer = (sum % 10) + answer;
    }

    if (carry > 0) {
        answer = carry + answer;
    }

    return answer;
}