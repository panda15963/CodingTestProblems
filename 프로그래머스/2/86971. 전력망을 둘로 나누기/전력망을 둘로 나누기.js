function solution(n, wires) {
    let answer = n;

    for (let i = 0; i < wires.length; i++) {
        const visited = new Array(n + 1).fill(false);

        // i번째 전선 제거하고 탐색
        const count = dfs(wires, visited, wires[i][0], i);

        const diff = Math.abs(count - (n - count));
        answer = Math.min(answer, diff);
    }

    return answer;
}

function dfs(wires, visited, node, skipIndex) {
    visited[node] = true;
    let count = 1;

    for (let i = 0; i < wires.length; i++) {
        if (i === skipIndex) continue;

        const [a, b] = wires[i];

        if (a === node && !visited[b]) {
            count += dfs(wires, visited, b, skipIndex);
        } else if (b === node && !visited[a]) {
            count += dfs(wires, visited, a, skipIndex);
        }
    }

    return count;
}