function solution(arr, intervals) {
    const [a1, b1] = intervals[0];
    const [a2, b2] = intervals[1];
    const part1 = arr.slice(a1, b1 + 1);
    const part2 = arr.slice(a2, b2 + 1);
    return [...part1, ...part2];
}
