function solution(n, k) {
    return 12000 * n + 2000 * (k - Math.floor(n / 10));
    // 또는 ~~(n / 10) 사용 가능
}
