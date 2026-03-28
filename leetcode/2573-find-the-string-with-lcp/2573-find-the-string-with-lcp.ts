function findTheString(lcp: number[][]): string {
    const n: number = lcp.length;
    const s: string[] = Array(n).fill(null); // 0대신 null로 미할당 표현
    let i: number = 0;

    // 1. 'a' ~ 'z'까지 사용해서 문자 배정
    for (let code = 97; code <= 122; code++) {
        const c: string = String.fromCharCode(code);

        while (i < n && s[i] !== null) {
            i++;
        }
        if (i === n) break;

        for (let j = i; j < n; j++) {
            if (lcp[i][j] > 0) {
                s[j] = c;
            }
        }
    }

    // 2. 모든 위치에 문자가 있는지 확인
    if (s.some(ch => ch === null)) {
        return "";
    }

    // 3. LCP 조건 검증
    for (let i = n - 1; i >= 0; i--) {
        for (let j = n - 1; j >= 0; j--) {
            if (s[i] === s[j]) {
                const expect: number = (i === n - 1 || j === n - 1)
                    ? 1
                    : lcp[i + 1][j + 1] + 1;
                if (lcp[i][j] !== expect) {
                    return "";
                }
            } else {
                if (lcp[i][j] !== 0) {
                    return "";
                }
            }
        }
    }

    return s.join("");
}