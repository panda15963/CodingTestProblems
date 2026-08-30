function findOrder(numCourses, prerequisites) {
    const graph = Array.from({ length: numCourses }, () => new Set());
    const visit = new Array(numCourses).fill(0);
    const ans = [];

    // 그래프 구성
    for (const [course, prerequisite] of prerequisites) {
        graph[course].add(prerequisite);
    }

    // DFS
    const dfs = (i) => {
        // 이미 방문 완료
        if (visit[i] === 1) {
            return true;
        }

        // 현재 방문 중인 노드를 다시 방문
        // -> 사이클 발생
        if (visit[i] === -1) {
            return false;
        }

        // 방문 중
        visit[i] = -1;

        // 선수 과목 탐색
        for (const prerequisite of graph[i]) {
            if (!dfs(prerequisite)) {
                return false;
            }
        }

        // 방문 완료
        visit[i] = 1;

        // 모든 선수 과목을 처리한 후 현재 과목 추가
        ans.push(i);

        return true;
    };

    // 모든 과목 DFS
    for (let i = 0; i < numCourses; i++) {
        if (!dfs(i)) {
            return [];
        }
    }

    return ans;
}