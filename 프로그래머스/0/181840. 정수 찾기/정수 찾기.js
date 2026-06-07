function solution(num_list, n) {
    for (const x of num_list) {
        if (x === n) return 1;
    }
    return 0;
}