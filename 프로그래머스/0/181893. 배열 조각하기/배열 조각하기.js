function solution(arr, query) {
    let list = [...arr];

    for (let i = 0; i < query.length; i++) {
        if (i % 2 === 0) {
            // even index: remove after query[i]
            list = list.slice(0, query[i] + 1);
        } else {
            // odd index: remove before query[i]
            list = list.slice(query[i]);
        }
    }

    return list;
}