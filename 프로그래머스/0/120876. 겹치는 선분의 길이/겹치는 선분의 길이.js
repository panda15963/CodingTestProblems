function solution(lines) {
    const count = Array(201).fill(0);

    for (const [start, end] of lines) {
        for (let i = start + 100; i < end + 100; i++) {
            count[i]++;
        }
    }

    let answer = 0;
    for (let i = 0; i < 200; i++) {
        if (count[i] >= 2) answer++;
    }

    return answer;
}