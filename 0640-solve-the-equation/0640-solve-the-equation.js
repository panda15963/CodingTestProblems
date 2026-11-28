var solveEquation = function(equation) {
    // 등호 기준으로 좌변과 우변 분리
    const [leftSide, rightSide] = equation.split('=');

    // 표현식에서 x 계수와 상수 추출
    const parseExpression = function(expression) {
        let xCoefficient = 0;
        let constantTerm = 0;
        let digitCount = 0;
        let sign = 1;
        let currentNumber = 0;
        let isXTerm = false;

        for (const char of expression) {
            if (char === '+' || char === '-') {
                // 이전 항 처리
                if (isXTerm) {
                    // x 계수가 생략되었다면 1로 처리
                    if (digitCount === 0 && currentNumber === 0) {
                        currentNumber = 1;
                    }

                    xCoefficient += currentNumber * sign;
                } else {
                    // 상수항 처리
                    constantTerm += currentNumber * sign;
                }

                // 다음 항을 위한 초기화
                isXTerm = false;
                currentNumber = 0;
                digitCount = 0;
                sign = char === '+' ? 1 : -1;

            } else if (char === 'x') {
                // x 항 표시
                isXTerm = true;

            } else {
                // 숫자 누적
                digitCount++;
                currentNumber = currentNumber * 10 + Number(char);
            }
        }

        // 마지막 항 처리
        if (isXTerm) {
            if (digitCount === 0 && currentNumber === 0) {
                currentNumber = 1;
            }

            xCoefficient += currentNumber * sign;
        } else {
            constantTerm += currentNumber * sign;
        }

        return [xCoefficient, constantTerm];
    };

    // 좌변과 우변 파싱
    const leftCoefficients = parseExpression(leftSide);
    const rightCoefficients = parseExpression(rightSide);

    const leftXCoeff = leftCoefficients[0];
    const leftConstant = leftCoefficients[1];
    const rightXCoeff = rightCoefficients[0];
    const rightConstant = rightCoefficients[1];

    // x 계수가 동일한 경우
    if (leftXCoeff === rightXCoeff) {
        if (leftConstant !== rightConstant) {
            return 'No solution';
        }

        return 'Infinite solutions';
    }

    // x 계산
    const xValue =
        (leftConstant - rightConstant) / (rightXCoeff - leftXCoeff);

    return `x=${xValue}`;
};