function solution(n, vertex) {
    const graph = Array.from({ length: n + 1 }, () => []);

    for (const [a, b] of vertex) {
        graph[a].push(b);
        graph[b].push(a);
    }

    const dist = Array(n + 1).fill(-1);
    const queue = [1];
    dist[1] = 0;

    while (queue.length) {
        const cur = queue.shift();

        for (const next of graph[cur]) {
            if (dist[next] === -1) {
                dist[next] = dist[cur] + 1;
                queue.push(next);
            }
        }
    }

    const max = Math.max(...dist);
    return dist.filter(v => v === max).length;
}