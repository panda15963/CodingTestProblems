function solution(n, costs) {
    // Union-Find
    const parent = Array(n);
    for (let i = 0; i < n; i++) {
        parent[i] = i;
    }

    function find(x) {
        if (parent[x] !== x) {
            parent[x] = find(parent[x]);
        }
        return parent[x];
    }

    function union(x, y) {
        const rx = find(x);
        const ry = find(y);
        if (rx !== ry) {
            parent[rx] = ry;
        }
    }

    // 1. 비용 오름차순 정렬
    costs.sort((a, b) => a[2] - b[2]);

    let answer = 0;
    let edges = 0;

    for (const [from, to, cost] of costs) {
        if (find(from) !== find(to)) {
            union(from, to);
            answer += cost;
            edges++;
            if (edges === n - 1) break;
        }
    }

    return answer;
}