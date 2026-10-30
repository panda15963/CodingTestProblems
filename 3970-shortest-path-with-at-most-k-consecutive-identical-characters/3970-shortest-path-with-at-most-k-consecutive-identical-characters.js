/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {string} labels
 * @param {number} k
 * @return {number}
 */
var shortestPath = function(n, edges, labels, k) {
    const adj = Array.from({ length: n }, () => []);

    for (const [u, v, w] of edges) {
        adj[u].push([v, w]);
    }

    const INF = Infinity;

    // dist[node][remK]
    const dist = Array.from(
        { length: n },
        () => new Array(k).fill(INF)
    );

    // Min Heap: [distance, node, remK]
    const heap = [];

    const push = (item) => {
        heap.push(item);

        let i = heap.length - 1;

        while (i > 0) {
            const p = Math.floor((i - 1) / 2);

            if (heap[p][0] <= heap[i][0]) break;

            [heap[p], heap[i]] = [heap[i], heap[p]];
            i = p;
        }
    };

    const pop = () => {
        if (heap.length === 1) {
            return heap.pop();
        }

        const result = heap[0];
        heap[0] = heap.pop();

        let i = 0;

        while (true) {
            let smallest = i;
            const left = i * 2 + 1;
            const right = i * 2 + 2;

            if (
                left < heap.length &&
                heap[left][0] < heap[smallest][0]
            ) {
                smallest = left;
            }

            if (
                right < heap.length &&
                heap[right][0] < heap[smallest][0]
            ) {
                smallest = right;
            }

            if (smallest === i) break;

            [heap[i], heap[smallest]] = [
                heap[smallest],
                heap[i]
            ];

            i = smallest;
        }

        return result;
    };

    dist[0][k - 1] = 0;
    push([0, 0, k - 1]);

    while (heap.length > 0) {
        const [d, u, remK] = pop();

        if (d !== dist[u][remK]) {
            continue;
        }

        for (const [v, w] of adj[u]) {
            let nextRemK;

            if (labels[u] === labels[v]) {
                if (remK === 0) {
                    continue;
                }

                nextRemK = remK - 1;
            } else {
                nextRemK = k - 1;
            }

            const nextDist = d + w;

            if (nextDist < dist[v][nextRemK]) {
                dist[v][nextRemK] = nextDist;

                push([nextDist, v, nextRemK]);
            }
        }
    }

    let answer = INF;

    for (let r = 0; r < k; r++) {
        answer = Math.min(answer, dist[n - 1][r]);
    }

    return answer === INF ? -1 : answer;
};