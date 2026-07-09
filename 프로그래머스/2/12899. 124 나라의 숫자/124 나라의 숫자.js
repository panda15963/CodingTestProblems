function solution(n) {
    let answer = '';
    const numbers = ['4', '1', '2'];
    while (n > 0) {
        answer = numbers[n % 3] + answer;
        n = (n % 3 === 0) ? Math.floor(n / 3) - 1 : Math.floor(n / 3);
    }
    return answer;
}
