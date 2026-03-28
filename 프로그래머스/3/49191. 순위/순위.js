function solution(n, results) {
    const win = Array.from({ length: n + 1 }, () =>
        Array(n + 1).fill(false)
    );

    for (const [a, b] of results) {
        win[a][b] = true;
    }

    // 플로이드-워셜
    for (let k = 1; k <= n; k++) {
        for (let i = 1; i <= n; i++) {
            for (let j = 1; j <= n; j++) {
                if (win[i][k] && win[k][j]) {
                    win[i][j] = true;
                }
            }
        }
    }

    let answer = 0;

    for (let i = 1; i <= n; i++) {
        let count = 0;

        for (let j = 1; j <= n; j++) {
            if (i === j) continue;

            if (win[i][j] || win[j][i]) {
                count++;
            }
        }

        if (count === n - 1) answer++;
    }

    return answer;
}