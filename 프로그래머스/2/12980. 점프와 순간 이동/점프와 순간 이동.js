function solution(n) {
    let answer = 0;

    while (n !== 0) {
        const a = Math.floor(n / 2);
        const b = n % 2;
        n = a;

        if (b === 1) {
            answer++;
        }
    }

    return answer;
}