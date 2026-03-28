function solution(tickets) {
    const visited = Array(tickets.length).fill(false);
    let answer = [];

    // 사전순 정렬
    tickets.sort((a, b) => {
        if (a[0] === b[0]) return a[1].localeCompare(b[1]);
        return a[0].localeCompare(b[0]);
    });

    function dfs(cur, path) {
        if (path.length === tickets.length + 1) {
            answer = [...path];
            return true;
        }

        for (let i = 0; i < tickets.length; i++) {
            if (!visited[i] && tickets[i][0] === cur) {
                visited[i] = true;
                path.push(tickets[i][1]);

                if (dfs(tickets[i][1], path)) return true;

                visited[i] = false;
                path.pop();
            }
        }

        return false;
    }

    dfs("ICN", ["ICN"]);
    return answer;
}