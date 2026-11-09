/**
 * @param {number} n
 * @return {number}
 */
function nextGreaterElement(n) {
    // 숫자를 문자열 배열로 변환
    const digits = n.toString().split('');
    const length = digits.length;

    // Step 1: 오른쪽부터 다음 숫자보다 작은 숫자 찾기
    let pivotIndex = length - 2;

    while (
        pivotIndex >= 0 &&
        digits[pivotIndex] >= digits[pivotIndex + 1]
    ) {
        pivotIndex--;
    }

    // 더 큰 순열이 존재하지 않는 경우
    if (pivotIndex < 0) {
        return -1;
    }

    // Step 2: pivot보다 큰 숫자 중 가장 오른쪽 숫자 찾기
    let swapIndex = length - 1;

    while (digits[pivotIndex] >= digits[swapIndex]) {
        swapIndex--;
    }

    // Step 3: 두 숫자 교환
    [digits[pivotIndex], digits[swapIndex]] =
        [digits[swapIndex], digits[pivotIndex]];

    // Step 4: pivot 뒤의 숫자들을 뒤집기
    const leftPart = digits.slice(0, pivotIndex + 1);
    const rightPart = digits.slice(pivotIndex + 1).reverse();

    const resultDigits = [...leftPart, ...rightPart];

    // 숫자로 변환
    const result = Number(resultDigits.join(''));

    // 32비트 정수 범위 확인
    const MAX_INT = 2147483647;

    return result > MAX_INT ? -1 : result;
}