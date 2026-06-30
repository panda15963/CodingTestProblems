class Info {
    constructor(node, sheep, wolf, adjacent) {
        this.node = node;
        this.sheep = sheep;
        this.wolf = wolf;
        this.adjacent = adjacent;
    }
}

function solution(info, edges) {
    // 트리 생성
    const tree = Array.from({ length: info.length }, () => []);

    for (const [parent, child] of edges) {
        tree[parent].push(child);
    }

    let answer = 0;

    // BFS 큐
    const queue = [];
    let front = 0;

    queue.push(new Info(0, 1, 0, new Set()));

    while (front < queue.length) {
        const now = queue[front++];

        // 최대 양의 수 갱신
        answer = Math.max(answer, now.sheep);

        // 현재 노드의 자식들을 이동 가능한 노드에 추가
        for (const child of tree[now.node]) {
            now.adjacent.add(child);
        }

        // 이동 가능한 모든 노드 탐색
        for (const next of now.adjacent) {
            // Set 복사
            const nextSet = new Set(now.adjacent);
            nextSet.delete(next);

            if (info[next] === 1) {
                // 늑대
                if (now.sheep !== now.wolf + 1) {
                    queue.push(
                        new Info(
                            next,
                            now.sheep,
                            now.wolf + 1,
                            nextSet
                        )
                    );
                }
            } else {
                // 양
                queue.push(
                    new Info(
                        next,
                        now.sheep + 1,
                        now.wolf,
                        nextSet
                    )
                );
            }
        }
    }

    return answer;
}