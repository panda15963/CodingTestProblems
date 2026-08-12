function partition(s: string): string[][] {
    const len: number = s.length;
    const result: string[][] = [];

    // dp[i][j] = s[i...j]가 팰린드롬인지 저장
    const dp: boolean[][] = Array.from(
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
            const end: number = start + length - 1;

            if (
                s[start] === s[end] &&
                dp[start + 1][end - 1]
            ) {
                dp[start][end] = true;
            }
        }
    }

    // 현재 분할 결과
    const path: string[] = [];

    // DFS + 백트래킹
    function dfs(start: number): void {
        // 문자열 끝까지 도달
        if (start === len) {
            result.push([...path]);
            return;
        }

        // start부터 가능한 팰린드롬 탐색
        for (let end = start; end < len; end++) {
            if (dp[start][end]) {
                path.push(s.substring(start, end + 1));

                dfs(end + 1);

                // 백트래킹
                path.pop();
            }
        }
    }

    dfs(0);

    return result;
}