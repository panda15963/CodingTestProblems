function solution(num_list) {
    return Math.max(
        num_list.filter((_, i) => i % 2 === 0).reduce((a, b) => a + b, 0),
        num_list.filter((_, i) => i % 2 === 1).reduce((a, b) => a + b, 0)
    );
}
