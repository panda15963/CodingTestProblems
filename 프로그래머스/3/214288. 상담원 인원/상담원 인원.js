// 1. 멘토 분배
// 완전 탐색은 너무 오래 걸림
// 각 그룹별로 최적이 전체로는 최적이 아닐 수 있음
// 결론 : 가장 오래 걸리는 곳에 추가로 한 명씩 배치
// 추가 : 가장 오래 걸리는 곳이 겹치면 가장 줄일 수 있는 곳으로

// 2. 상담 표현
// 멘토의 숫자만큼 배열로 표현 말고는 생각이 안남

function calculator(arr, n) {
    if(arr.length === 0) {
        return 0;
    }

    let value = 0;
    const mentors = Array.from({ length : n }, () => 0);
    for(let i = 0; i < arr.length; i++) {
        const [start, end] = arr[i];
        const idx = mentors.findIndex((value) => value <= Math.min(...mentors));
        value += Math.max(0, mentors[idx] - start);
        mentors[idx] = Math.max(mentors[idx], start) + end;
    }

    return value;
}

function solution(k, n, reqs) {
    let rest = n - k;
    const requests = Array.from({ length : k }, () => []);
    const mentors = Array.from({ length : k }, () => 1);
    const answers = [];

    for(let i = 0; i < reqs.length; i++) {
        const [start, end, idx] = reqs[i];
        requests[idx - 1].push([start, end]);
    }

    for(let i = 0; i < requests.length; i++) {
        const value = calculator(requests[i], 1);
        answers.push(value);
    }

    while(rest > 0) {
        const arr = [];
        const max = Math.max(...answers);

        answers.forEach((answer, i) => {
            const value = calculator(requests[i], mentors[i] + 1);
            arr.push(value);
        });

        const diff = arr.map((value, i) => answers[i] - value);
        const index = diff.findIndex((value) => value === Math.max(...diff));

        mentors[index]++;
        rest--;
        answers[index] = arr[index];
    }

    return answers.reduce((cur, next) => cur + next, 0);
}