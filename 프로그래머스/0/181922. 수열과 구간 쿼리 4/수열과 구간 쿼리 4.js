function solution(arr, queries) {
    for (let q of queries) {
        const [s, e, k] = q;
        for (let i = s; i <= e; i++) {
            if (i % k === 0) {
                arr[i]++;
            }
        }
    }
    return arr;
}
