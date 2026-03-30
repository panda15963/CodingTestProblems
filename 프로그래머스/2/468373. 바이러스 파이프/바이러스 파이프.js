function solution(n, infection, edges, k) {
    const tree = Array.from({ length: n + 1 }, () => []);
    let answer = 0;
    const orders = new Array(k);

    // 그래프 구성
    for (const [x, y, type] of edges) {
        tree[x].push([y, type]);
        tree[y].push([x, type]);
    }

    // 조합 생성
    function combi(depth, last) {
        if (depth === k) {
            answer = Math.max(answer, simulation());
            return;
        }

        for (let i = 1; i <= 3; i++) {
            if (i === last) continue;
            orders[depth] = i;
            combi(depth + 1, i);
        }
    }

    // 시뮬레이션
    function simulation() {
        const infected = [infection];

        for (let i = 0; i < k; i++) {
            infect(orders[i], infected);
        }

        return infected.length;
    }

    // BFS 감염
    function infect(type, infected) {
        const visited = new Array(n + 1).fill(false);
        const queue = [];

        for (const node of infected) {
            queue.push(node);
            visited[node] = true;
        }

        let head = 0; // shift 대신 사용 (성능 개선)

        while (head < queue.length) {
            const cur = queue[head++];

            for (const [next, t] of tree[cur]) {
                if (!visited[next] && t === type) {
                    infected.push(next);
                    visited[next] = true;
                    queue.push(next);
                }
            }
        }
    }

    combi(0, -1);
    return answer;
}