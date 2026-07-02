function solution(a, edges) {
    const n = a.length;

    let sum = 0n;
    const weights = new Array(n);

    for (let i = 0; i < n; i++) {
        weights[i] = BigInt(a[i]);
        sum += weights[i];
    }

    if (sum !== 0n) {
        return -1;
    }

    // 그래프
    const graph = Array.from({ length: n }, () => []);

    for (const [u, v] of edges) {
        graph[u].push(v);
        graph[v].push(u);
    }

    // 부모와 방문 순서
    const parent = new Array(n).fill(-1);
    const order = [];

    const stack = [0];
    parent[0] = 0;

    while (stack.length) {
        const cur = stack.pop();
        order.push(cur);

        for (const next of graph[cur]) {
            if (next === parent[cur]) continue;
            parent[next] = cur;
            stack.push(next);
        }
    }

    let answer = 0n;

    // 후위 순회(Post-order)
    for (let i = order.length - 1; i > 0; i--) {
        const cur = order[i];
        const p = parent[cur];

        const value = weights[cur];

        answer += value >= 0n ? value : -value;
        weights[p] += value;
    }

    answer += weights[0] >= 0n ? weights[0] : -weights[0];

    return Number(answer);
}