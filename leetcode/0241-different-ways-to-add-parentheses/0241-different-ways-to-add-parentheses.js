function diffWaysToCompute(expression) {
    const result = [];

    // 수식의 각 문자 확인
    for (let i = 0; i < expression.length; i++) {
        const operator = expression[i];

        // 연산자를 발견한 경우
        if (
            operator === '+' ||
            operator === '-' ||
            operator === '*'
        ) {
            // 왼쪽 부분 계산
            const left = diffWaysToCompute(
                expression.substring(0, i)
            );

            // 오른쪽 부분 계산
            const right = diffWaysToCompute(
                expression.substring(i + 1)
            );

            // 모든 가능한 결과 조합
            for (const l of left) {
                for (const r of right) {
                    if (operator === '+') {
                        result.push(l + r);
                    } else if (operator === '-') {
                        result.push(l - r);
                    } else {
                        result.push(l * r);
                    }
                }
            }
        }
    }

    // 연산자가 없는 경우 숫자 반환
    if (result.length === 0) {
        return [Number(expression)];
    }

    return result;
}