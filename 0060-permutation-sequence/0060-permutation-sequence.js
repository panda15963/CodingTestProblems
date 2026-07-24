/**
 * @param {number} n
 * @param {number} k
 * @return {string}
 */
var getPermutation = function(n, k) {
    let result = "";

    // 각 숫자의 사용 여부를 저장
    const isUsed = Array(n + 1).fill(false);

    // 순열을 한 자리씩 생성
    for (let position = 0; position < n; position++) {
        // 남은 자리의 팩토리얼 계산
        let factorial = 1;
        for (let i = 1; i < n - position; i++) {
            factorial *= i;
        }

        // 사용할 숫자 선택
        for (let digit = 1; digit <= n; digit++) {
            if (!isUsed[digit]) {
                if (k > factorial) {
                    // 현재 숫자로 시작하는 모든 순열 건너뛰기
                    k -= factorial;
                } else {
                    // 현재 숫자를 선택
                    result += digit;
                    isUsed[digit] = true;
                    break;
                }
            }
        }
    }

    return result;
};