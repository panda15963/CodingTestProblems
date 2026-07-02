function solution(s) {
    const answer = [];

    for (const numbers of s) {
        answer.push(changeNumbers(numbers));
    }

    return answer;
}

// 숫자를 바꾸는 로직
function changeNumbers(numbers) {
    // 110이 없으면 그대로 반환
    if (!numbers.includes("110")) {
        return numbers;
    }

    const stack = [];
    let count = stackAndFind(stack, numbers);

    let idx = stack.length;
    let flag = false;

    let remain = "";

    while (stack.length > 0) {
        const ch = stack.pop();

        if (!flag) {
            if (ch === "0") {
                flag = true;
            } else {
                idx--;
            }
        }

        remain += ch;
    }

    // 스택에서 꺼냈으므로 뒤집기
    remain = remain.split("").reverse().join("");

    // 110 삽입
    const insert = "110".repeat(count);

    return remain.slice(0, idx) + insert + remain.slice(idx);
}

// 스택을 쌓고 110 개수 찾기
function stackAndFind(stack, numbers) {
    let count = 0;

    for (const third of numbers) {
        if (stack.length < 2) {
            stack.push(third);
        } else {
            const second = stack.pop();
            const first = stack.pop();

            if (first === "1" && second === "1" && third === "0") {
                count++;
            } else {
                stack.push(first);
                stack.push(second);
                stack.push(third);
            }
        }
    }

    return count;
}