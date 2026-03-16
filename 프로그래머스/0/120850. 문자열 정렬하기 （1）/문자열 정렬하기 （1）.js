function solution(my_string) {
    const nums = my_string
        .split('')
        .filter(c => !isNaN(c))
        .map(Number)
        .sort((a, b) => a - b);
    return nums;
}
