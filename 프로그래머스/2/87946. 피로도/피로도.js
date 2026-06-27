function solution(k, dungeons) {
    let answer = 0;
    const visited = new Array(dungeons.length).fill(false);

    function dfs(depth, fatigue) {
        for (let i = 0; i < dungeons.length; i++) {
            // 아직 방문하지 않았고, 현재 피로도로 입장 가능한 경우
            if (!visited[i] && dungeons[i][0] <= fatigue) {
                visited[i] = true;
                dfs(depth + 1, fatigue - dungeons[i][1]);
                visited[i] = false; // 백트래킹
            }
        }

        answer = Math.max(answer, depth);
    }

    dfs(0, k);

    return answer;
}