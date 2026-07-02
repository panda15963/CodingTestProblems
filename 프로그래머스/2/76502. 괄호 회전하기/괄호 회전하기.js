function isCorrect(s) {
    const stack = [];

    for (const c of s) {

        if (stack.length > 0) {

            let matched = false;

            switch (stack[stack.length - 1]) {
                case '[':
                    if (c === ']') {
                        matched = true;
                        stack.pop();
                    }
                    break;

                case '{':
                    if (c === '}') {
                        matched = true;
                        stack.pop();
                    }
                    break;

                case '(':
                    if (c === ')') {
                        matched = true;
                        stack.pop();
                    }
                    break;
            }

            if (matched) {
                continue;
            }
        }

        stack.push(c);
    }

    return stack.length === 0;
}

function solution(s) {
    let answer = 0;

    for (let i = 0; i < s.length; i++) {

        if (isCorrect(s)) {
            answer++;
        }

        s = s.slice(1) + s[0];
    }

    return answer;
}