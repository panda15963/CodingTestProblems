function solution(arrows) {
    let answer = 0;

    const dx = [0, 1, 1, 1, 0, -1, -1, -1];
    const dy = [-1, -1, 0, 1, 1, 1, 0, -1];

    let curX = 0;
    let curY = 0;

    // key: "x,y" -> Set(연결된 노드)
    const visited = new Map();

    const getKey = (x, y) => `${x},${y}`;

    const addEdge = (from, to) => {
        if (!visited.has(from)) {
            visited.set(from, new Set());
        }
        visited.get(from).add(to);
    };

    // 시작점 등록
    visited.set(getKey(0, 0), new Set());

    for (const arrow of arrows) {
        // 교차점 처리를 위해 2배 이동
        for (let i = 0; i < 2; i++) {
            const nextX = curX + dx[arrow];
            const nextY = curY + dy[arrow];

            const curKey = getKey(curX, curY);
            const nextKey = getKey(nextX, nextY);

            // 처음 방문한 정점
            if (!visited.has(nextKey)) {
                visited.set(nextKey, new Set([curKey]));
                visited.get(curKey).add(nextKey);
            }
            // 정점은 방문했지만 간선은 처음 지나는 경우
            else if (!visited.get(nextKey).has(curKey)) {
                visited.get(nextKey).add(curKey);
                visited.get(curKey).add(nextKey);
                answer++;
            }

            curX = nextX;
            curY = nextY;
        }
    }

    return answer;
}