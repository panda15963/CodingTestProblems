var processStr = function(s, k) {
    let m = 0n;
    k = BigInt(k);

    // Pass 1: 최종 문자열 길이 계산
    for (const c of s) {
        if (c === '*') {
            m = m > 0n ? m - 1n : 0n;
        } else if (c === '#') {
            m <<= 1n;
        } else if (c !== '%') {
            m += 1n;
        }
        // '%'는 길이 변화 없음
    }

    // 범위를 벗어나면 '.'
    if (k >= m) {
        return '.';
    }

    // Pass 2: 뒤에서부터 역추적
    for (let i = s.length - 1; i >= 0; i--) {
        const c = s[i];

        if (c === '*') {
            m += 1n;
        } else if (c === '#') {
            m /= 2n;
            if (k >= m) {
                k -= m;
            }
        } else if (c === '%') {
            k = m - 1n - k;
        } else {
            m -= 1n;
            if (k === m) {
                return c;
            }
        }
    }

    return '.';
};