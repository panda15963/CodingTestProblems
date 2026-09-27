var reverseParentheses = function(s) {
    const characterStack = [];

    for (const currentChar of s) {
        if (currentChar === ')') {
            const tempCharacters = [];

            while (
                characterStack[characterStack.length - 1] !== '('
            ) {
                tempCharacters.push(characterStack.pop());
            }

            // 여는 괄호 제거
            characterStack.pop();

            // 이미 pop하면서 역순이 된 문자열을 다시 추가
            characterStack.push(...tempCharacters);
        } else {
            characterStack.push(currentChar);
        }
    }

    return characterStack.join('');
};