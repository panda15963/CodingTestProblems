/**
 * @param {string} s
 * @return {number}
 */
var calculate = function(s) {
    // 괄호 이전의 결과와 부호를 저장하는 스택
    const stack = [];

    // 현재 숫자의 부호
    let currentSign = 1;

    // 현재 계산 결과
    let result = 0;

    const length = s.length;

    for (let i = 0; i < length; i++) {
        const char = s[i];

        // 공백 건너뛰기
        if (char === ' ') {
            continue;
        }

        // 덧셈
        if (char === '+') {
            currentSign = 1;
        }

        // 뺄셈
        else if (char === '-') {
            currentSign = -1;
        }

        // 여는 괄호
        else if (char === '(') {
            // 현재 결과 저장
            stack.push(result);

            // 괄호 앞의 부호 저장
            stack.push(currentSign);

            // 새로운 괄호 내부 계산 시작
            result = 0;
            currentSign = 1;
        }

        // 닫는 괄호
        else if (char === ')') {
            // 괄호 앞의 부호 적용
            result *= stack.pop();

            // 이전 결과와 합산
            result += stack.pop();
        }

        // 숫자인 경우
        else {
            let number = 0;
            let j = i;

            // 여러 자리 숫자 처리
            while (
                j < length &&
                s[j] >= '0' &&
                s[j] <= '9'
            ) {
                number =
                    number * 10 +
                    (s[j].charCodeAt(0) - '0'.charCodeAt(0));

                j++;
            }

            // 현재 부호를 적용하여 결과에 추가
            result += currentSign * number;

            // 이미 처리한 숫자 부분 건너뛰기
            i = j - 1;
        }
    }

    return result;
};