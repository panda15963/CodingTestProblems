/**
 * Determines if a number is a happy number.
 *
 * @param {number} n
 * @return {boolean}
 */
function isHappy(n) {
    /**
     * 각 자리 숫자의 제곱 합을 계산
     *
     * 예: 19 → 1² + 9² = 82
     *
     * @param {number} num
     * @return {number}
     */
    const getNext = (num) => {
        let sumOfSquares = 0;

        while (num !== 0) {
            const digit = num % 10;

            sumOfSquares += digit ** 2;

            num = Math.floor(num / 10);
        }

        return sumOfSquares;
    };

    // 이미 방문한 숫자를 저장하여 사이클 감지
    const visitedNumbers = new Set();

    // 1이 될 때까지 반복
    while (n !== 1) {
        const nextNumber = getNext(n);

        // 이미 방문한 숫자라면 사이클 발생
        if (visitedNumbers.has(nextNumber)) {
            return false;
        }

        visitedNumbers.add(nextNumber);

        n = nextNumber;
    }

    return true;
}