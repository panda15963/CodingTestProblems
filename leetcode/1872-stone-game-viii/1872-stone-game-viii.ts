function stoneGameVIII(stones: number[]): number {
    const n: number = stones.length;

    // Prefix Sum
    for (let i = 1; i < n; i++) {
        stones[i] += stones[i - 1];
    }

    // 마지막 선택에서 얻을 수 있는 점수 차이
    let result: number = stones[n - 1];

    // 뒤에서부터 최적값 계산
    for (let i = n - 2; i >= 1; i--) {
        result = Math.max(result, stones[i] - result);
    }

    return result;
}