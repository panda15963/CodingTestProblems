/**
 * @param {number} n
 * @return {number}
 */
var maxProduct = function(n) {
    // 가장 큰 숫자와 두 번째로 큰 숫자를 저장
    let largestDigit = 0;
    let secondLargestDigit = 0;

    // 각 자릿수를 순회
    while (n > 0) {
        // 현재 자릿수 추출
        const currentDigit = n % 10;

        // 가장 큰 숫자와 두 번째로 큰 숫자 갱신
        if (currentDigit > largestDigit) {
            secondLargestDigit = largestDigit;
            largestDigit = currentDigit;
        } else if (currentDigit > secondLargestDigit) {
            secondLargestDigit = currentDigit;
        }

        // 다음 자릿수로 이동
        n = Math.floor(n / 10);
    }

    // 두 가장 큰 숫자의 곱 반환
    return largestDigit * secondLargestDigit;
};