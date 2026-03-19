function solution(n) {
    return String(n)
        .split('')
        .reduce((sum, digit) => sum + Number(digit), 0);
}
