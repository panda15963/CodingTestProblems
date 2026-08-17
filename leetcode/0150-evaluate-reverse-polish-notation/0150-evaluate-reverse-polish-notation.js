/**
 * Evaluates the value of an arithmetic expression in Reverse Polish Notation (RPN)
 *
 * @param {string[]} tokens
 * @returns {number}
 */
function evalRPN(tokens) {
    // 연산 결과를 저장할 스택
    const operandStack = [];

    for (const token of tokens) {

        // 숫자인 경우
        if (!isNaN(Number(token))) {
            operandStack.push(Number(token));
        } else {
            // 연산자인 경우
            const rightOperand = operandStack.pop();
            const leftOperand = operandStack.pop();

            switch (token) {
                case '+':
                    operandStack.push(leftOperand + rightOperand);
                    break;

                case '-':
                    operandStack.push(leftOperand - rightOperand);
                    break;

                case '*':
                    operandStack.push(leftOperand * rightOperand);
                    break;

                case '/':
                    // JavaScript의 Math.trunc()은 0 방향으로 버림
                    operandStack.push(
                        Math.trunc(leftOperand / rightOperand)
                    );
                    break;
            }
        }
    }

    return operandStack[0];
}