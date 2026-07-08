function solution(n, s) {
    if (s < n) {
        return [-1];
    }

    const base = Math.floor(s / n);
    const remainder = s % n;

    const answer = new Array(n).fill(base);

    for (let i = 0; i < remainder; i++) {
        answer[n - 1 - i]++;
    }

    return answer;
}