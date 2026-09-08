function countCommas(n: number): number {
    let answer = 0;

    for (let threshold = 1000; threshold <= n; threshold *= 1000) {
        answer += n - threshold + 1;
    }

    return answer;
}