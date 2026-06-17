function processStr(s: string, k: number): string {
    let m = 0n;
    let pos = BigInt(k);

    // Pass 1: 최종 문자열 길이 계산
    for (const c of s) {
        if (c === '*') {
            m = m > 0n ? m - 1n : 0n;
        } else if (c === '#') {
            m <<= 1n;
        } else if (c !== '%') {
            m += 1n;
        }
    }

    // 범위를 벗어나면 '.'
    if (pos >= m) {
        return '.';
    }

    // Pass 2: 뒤에서부터 역추적
    for (let i = s.length - 1; i >= 0; i--) {
        const c = s[i];

        if (c === '*') {
            m += 1n;
        } else if (c === '#') {
            m /= 2n;
            if (pos >= m) {
                pos -= m;
            }
        } else if (c === '%') {
            pos = m - 1n - pos;
        } else {
            m -= 1n;
            if (pos === m) {
                return c;
            }
        }
    }

    return '.';
}