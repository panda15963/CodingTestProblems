function solution(n, path, order) {
    const indegree = new Array(n).fill(0);
    const adj = Array.from({ length: n }, () => []);

    // 단방향 그래프 변환
    function buildUnidirGraph() {
        const queue = [];
        let front = 0;

        const check = new Array(n).fill(false);
        const paths = Array.from({ length: n }, () => []);

        for (const [a, b] of path) {
            paths[a].push(b);
            paths[b].push(a);
        }

        queue.push(0);
        check[0] = true;

        while (front < queue.length) {
            const cur = queue[front++];

            for (const next of paths[cur]) {
                if (!check[next]) {
                    adj[cur].push(next);
                    indegree[next]++;

                    queue.push(next);
                    check[next] = true;
                }
            }
        }

        for (const [a, b] of order) {
            adj[a].push(b);
            indegree[b]++;
        }
    }

    buildUnidirGraph();

    const queue = [];
    let front = 0;

    for (let i = 0; i < n; i++) {
        if (indegree[i] === 0) {
            queue.push(i);
        }
    }

    // 위상정렬 (BFS)
    for (let i = 0; i < n; i++) {
        if (front === queue.length) {
            return false;
        }

        const cur = queue[front++];

        for (const next of adj[cur]) {
            indegree[next]--;

            if (indegree[next] === 0) {
                queue.push(next);
            }
        }
    }

    return true;
}