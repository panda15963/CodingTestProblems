function solution(number, k) {
    const stack = [];
    let deleteLeft = k;

    for (const c of number) {
        while (
            stack.length > 0 &&
            deleteLeft > 0 &&
            stack[stack.length - 1] < c
        ) {
            stack.pop();
            deleteLeft--;
        }
        stack.push(c);
    }

    // 지울 수가 남았으면 뒤에서부터 자름
    if (deleteLeft > 0) {
        stack.splice(-deleteLeft);
    }

    return stack.join("");
}