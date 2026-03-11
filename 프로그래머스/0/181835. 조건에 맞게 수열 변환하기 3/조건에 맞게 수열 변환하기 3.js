function solution(arr, k) {
    // k가 홀수(k % 2 === 1)이면 v * k, 짝수이면 v + k를 수행
    return arr.map(v => k % 2 === 1 ? v * k : v + k);
}
