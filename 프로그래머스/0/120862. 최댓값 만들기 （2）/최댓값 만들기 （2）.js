function solution(numbers) {
    numbers.sort((a, b) => a - b);

    const n = numbers.length;
    const max1 = numbers[n - 1] * numbers[n - 2];  // 큰 두 수
    const max2 = numbers[0] * numbers[1];          // 작은 두 수

    return Math.max(max1, max2);
}