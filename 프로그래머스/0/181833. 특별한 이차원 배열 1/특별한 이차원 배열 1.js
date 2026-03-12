function solution(n) {
    const arr = Array(n).fill().map(() => Array(n).fill(0));
    for (let i = 0; i < n; i++) {
        arr[i][i] = 1;
    }
    return arr;
}
