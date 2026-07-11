function countCompleteComponents(n, edges) {
    // 인접 리스트 생성
    const adjacencyList = Array.from({ length: n }, () => []);

    for (const [u, v] of edges) {
        adjacencyList[u].push(v);
        adjacencyList[v].push(u);
    }

    // 방문 여부
    const visited = new Array(n).fill(false);

    // DFS
    function dfs(currentVertex) {
        visited[currentVertex] = true;

        let vertexCount = 1;
        let totalEdgeCount = adjacencyList[currentVertex].length;

        for (const neighbor of adjacencyList[currentVertex]) {
            if (!visited[neighbor]) {
                const [vertices, edges] = dfs(neighbor);
                vertexCount += vertices;
                totalEdgeCount += edges;
            }
        }

        return [vertexCount, totalEdgeCount];
    }

    let completeComponentCount = 0;

    // 모든 연결 요소 탐색
    for (let vertex = 0; vertex < n; vertex++) {
        if (!visited[vertex]) {
            const [componentVertices, componentEdges] = dfs(vertex);

            // 완전 그래프 여부 확인
            if (
                componentVertices * (componentVertices - 1) ===
                componentEdges
            ) {
                completeComponentCount++;
            }
        }
    }

    return completeComponentCount;
}