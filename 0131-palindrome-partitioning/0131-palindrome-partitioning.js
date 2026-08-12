var partition = function (s) {
    const len = s.length;
    const result = [];

    // dp[i][j] = s[i...j]가 팰린드롬이면 true
    const dp = Array.from(
        { length: len },
        () => Array(len).fill(false)
    );

    // 길이가 1인 문자열
    for (let i = 0; i < len; i++) {
        dp[i][i] = true;
    }

    // 길이가 2인 문자열
    for (let i = 0; i < len - 1; i++) {
        dp[i][i + 1] = s[i] === s[i + 1];
    }

    // 길이가 3 이상인 문자열
    for (let length = 3; length <= len; length++) {
        for (let start = 0; start <= len - length; start++) {
            const end = start + length - 1;

            if (
                s[start] === s[end] &&
                dp[start + 1][end - 1]
            ) {
                dp[start][end] = true;
            }
        }
    }

    // DFS + 백트래킹
    const path = [];

    function dfs(start) {
        // 문자열 끝까지 도달한 경우
        if (start === len) {
            result.push([...path]);
            return;
        }

        // start부터 가능한 모든 팰린드롬 탐색
        for (let end = start; end < len; end++) {
            if (dp[start][end]) {
                path.push(s.substring(start, end + 1));

                dfs(end + 1);

                path.pop();
            }
        }
    }

    dfs(0);

    return result;
};