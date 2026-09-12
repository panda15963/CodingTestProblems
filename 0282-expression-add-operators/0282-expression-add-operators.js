var addOperators = function (num, target) {
    const result = [];

    function backtrack(index, previousOperand, currentValue, expression) {
        // 숫자를 모두 사용한 경우
        if (index === num.length) {
            if (currentValue === target) {
                result.push(expression);
            }
            return;
        }

        // 현재 위치부터 만들 수 있는 숫자를 하나씩 선택
        for (let endIndex = index; endIndex < num.length; endIndex++) {
            // Leading zero 방지
            // "05"는 허용하지 않음
            if (endIndex !== index && num[index] === '0') {
                break;
            }

            const currentNumber = Number(
                num.substring(index, endIndex + 1)
            );

            // 첫 번째 숫자
            if (index === 0) {
                backtrack(
                    endIndex + 1,
                    currentNumber,
                    currentNumber,
                    String(currentNumber)
                );
            } else {
                // +
                backtrack(
                    endIndex + 1,
                    currentNumber,
                    currentValue + currentNumber,
                    expression + "+" + currentNumber
                );

                // -
                backtrack(
                    endIndex + 1,
                    -currentNumber,
                    currentValue - currentNumber,
                    expression + "-" + currentNumber
                );

                // *
                backtrack(
                    endIndex + 1,
                    previousOperand * currentNumber,
                    currentValue -
                        previousOperand +
                        previousOperand * currentNumber,
                    expression + "*" + currentNumber
                );
            }
        }
    }

    backtrack(0, 0, 0, "");

    return result;
};