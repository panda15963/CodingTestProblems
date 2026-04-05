function solution(nodes, edges) {
    const map = new Map();
    for (const node of nodes) map.set(node, []);
    for (const [v1,v2] of edges) {
        map.get(v1).push(v2);
        map.get(v2).push(v1);
    }

    const visited = new Set();
    const answer = [0, 0];

    for (const node of nodes) {
        if (visited.has(node)) continue;

        const queue = [node];
        visited.add(node);
        const typeCount = [0, 0];

        while (queue.length) {
            const cur = queue.shift();
            const edges = map.get(cur).length;
            if (cur % 2 === edges % 2) typeCount[0]++;
            else typeCount[1]++;

            for (const next of map.get(cur)) {
                if (visited.has(next)) continue;
                visited.add(next);
                queue.push(next);
            }
        }

        if (typeCount[0] === 1) answer[0]++;
        if (typeCount[1] === 1) answer[1]++;
    }

    return answer;
}