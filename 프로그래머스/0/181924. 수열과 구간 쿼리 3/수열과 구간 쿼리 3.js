function solution(arr, queries) {
    for (let query of queries) {
        [arr[query[0]], arr[query[1]]] = [arr[query[1]], arr[query[0]]];
    }
    return arr;
}
