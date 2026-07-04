/**
 * @param {number} n
 * @param {number[][]} roads
 * @return {number}
 */
var minScore = function (n, roads) {
    // 방문 여부
    const visited = new Array(n + 1).fill(false);

    // 인접 리스트 생성
    const adjacencyList = Array.from(
        { length: n + 1 },
        () => []
    );

    // 양방향 그래프 구성
    for (const [nodeA, nodeB, edgeWeight] of roads) {
        adjacencyList[nodeA].push([nodeB, edgeWeight]);
        adjacencyList[nodeB].push([nodeA, edgeWeight]);
    }

    let minimumScore = Infinity;

    function dfs(currentNode) {
        if (visited[currentNode]) {
            return;
        }

        visited[currentNode] = true;

        for (const [neighborNode, edgeWeight] of adjacencyList[currentNode]) {
            minimumScore = Math.min(minimumScore, edgeWeight);
            dfs(neighborNode);
        }
    }

    dfs(1);

    return minimumScore;
};