function solution(n) {
    const isPrime = new Array(n + 1).fill(true);

    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (isPrime[i]) {
            let j = 2;

            while (i * j <= n) {
                isPrime[i * j] = false;
                j++;
            }
        }
    }

    let answer = 0;

    for (let i = 2; i <= n; i++) {
        if (isPrime[i]) {
            answer++;
        }
    }

    return answer;
}