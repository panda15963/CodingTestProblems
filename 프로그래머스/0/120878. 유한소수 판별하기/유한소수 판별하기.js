function solution(a, b) {
    const gcd = (x, y) => y === 0 ? x : gcd(y, x % y);

    b /= gcd(a, b);

    while (b % 2 === 0) b /= 2;
    while (b % 5 === 0) b /= 5;

    return b === 1 ? 1 : 2;
}