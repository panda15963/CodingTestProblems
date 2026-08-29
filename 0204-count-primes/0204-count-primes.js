var countPrimes = function(n) {
    if (n < 3) {
        return 0;
    }

    if (n <= 3) {
        return 1;
    }

    const notPrime = new Array(n).fill(false);

    // 2는 소수이므로 미리 1개 카운트
    let count = 1;

    // 홀수만 검사
    for (let i = 3; i < n; i += 2) {
        if (notPrime[i] === false) {
            count++;

            // i의 홀수 배수들을 소수가 아닌 것으로 표시
            for (let j = 3; i * j < n; j += 2) {
                notPrime[i * j] = true;
            }
        }
    }

    return count;
};