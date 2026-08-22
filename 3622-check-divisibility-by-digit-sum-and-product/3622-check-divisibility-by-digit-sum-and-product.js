/**
 * Checks if a number is divisible by the sum of its digit sum and digit product
 * @param {number} n
 * @return {boolean}
 */
function checkDivisibility(n) {
    // 자릿수의 합과 곱
    let digitSum = 0;
    let digitProduct = 1;

    // n의 자릿수를 하나씩 확인
    let remainingNumber = n;

    while (remainingNumber !== 0) {
        // 마지막 자릿수
        const currentDigit = remainingNumber % 10;

        // 마지막 자릿수 제거
        remainingNumber = Math.floor(remainingNumber / 10);

        // 자릿수 합과 곱 갱신
        digitSum += currentDigit;
        digitProduct *= currentDigit;
    }

    // n % (자릿수 합 + 자릿수 곱) == 0인지 확인
    return n % (digitSum + digitProduct) === 0;
}