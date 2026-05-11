function solution(numbers) {
    const n = numbers.length;
    const answer = new Array(n).fill(-1); // 기본값 -1
    const stack = []; // 인덱스를 저장할 스택

    for (let i = 0; i < n; i++) {
        // 현재 숫자가 스택 top의 숫자보다 크면 뒷 큰수 발견
        while (stack.length > 0 && numbers[stack[stack.length - 1]] < numbers[i]) {
            const index = stack.pop();
            answer[index] = numbers[i];
        }
        stack.push(i); // 현재 인덱스 push
    }

    return answer;
}
