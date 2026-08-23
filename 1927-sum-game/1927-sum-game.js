/**
 * Determines if Alice wins the sum game.
 * Alice and Bob take turns replacing '?' with digits (0-9).
 * Alice goes first.
 *
 * @param {string} num
 * @return {boolean}
 */
function sumGame(num) {
    const length = num.length;

    // 첫 번째 절반
    let questionMarksInFirstHalf = 0;
    let sumOfDigitsInFirstHalf = 0;

    // 두 번째 절반
    let questionMarksInSecondHalf = 0;
    let sumOfDigitsInSecondHalf = 0;

    // 첫 번째 절반 처리
    for (let i = 0; i < (length >> 1); i++) {
        if (num[i] === '?') {
            questionMarksInFirstHalf++;
        } else {
            sumOfDigitsInFirstHalf += num[i].charCodeAt(0) - '0'.charCodeAt(0);
        }
    }

    // 두 번째 절반 처리
    for (let i = (length >> 1); i < length; i++) {
        if (num[i] === '?') {
            questionMarksInSecondHalf++;
        } else {
            sumOfDigitsInSecondHalf += num[i].charCodeAt(0) - '0'.charCodeAt(0);
        }
    }

    // 전체 '?' 개수
    const totalQuestionMarks =
        questionMarksInFirstHalf + questionMarksInSecondHalf;

    // 양쪽 숫자 합의 차이
    const sumDifference =
        sumOfDigitsInFirstHalf - sumOfDigitsInSecondHalf;

    // 양쪽 '?' 개수 차이
    const questionMarkDifference =
        questionMarksInSecondHalf - questionMarksInFirstHalf;

    // Alice가 이기는 조건
    return totalQuestionMarks % 2 === 1 ||
           2 * sumDifference !== 9 * questionMarkDifference;
}