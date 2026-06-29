function solution(n, roads, sources, destination) {
    // 1. 그래프 생성
    const graph = Array.from({ length: n + 1 }, () => []);

    for (const [a, b] of roads) {
        graph[a].push(b);
        graph[b].push(a);
    }

    // 2. 목적지로부터 모든 지점까지의 최단 거리 배열 초기화
    const dist = Array(n + 1).fill(-1);

    // 3. 목적지 기준 BFS
    const queue = [destination];
    let front = 0;

    dist[destination] = 0;

    while (front < queue.length) {
        const current = queue[front++];

        for (const next of graph[current]) {
            // 아직 방문하지 않은 지역인 경우
            if (dist[next] === -1) {
                dist[next] = dist[current] + 1;
                queue.push(next);
            }
        }
    }

    // 4. sources의 최단 거리 반환
    return sources.map(source => dist[source]);
}