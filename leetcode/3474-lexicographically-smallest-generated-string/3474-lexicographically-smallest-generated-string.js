function generateString(str1, str2) {
    const n = str1.length;
    const m = str2.length;
    const size = n + m - 1;

    const word = new Array(size).fill('?');
    const fixed = new Array(size).fill(false);

    // 1. T 조건 강제 적용
    for (let i = 0; i < n; i++) {
        if (str1[i] === 'T') {
            for (let j = 0; j < m; j++) {
                if (word[i + j] === '?' || word[i + j] === str2[j]) {
                    word[i + j] = str2[j];
                    fixed[i + j] = true;
                } else {
                    return "";
                }
            }
        }
    }

    // 2. '?' → 'a'
    for (let i = 0; i < size; i++) {
        if (word[i] === '?') word[i] = 'a';
    }

    // 3. F 조건 처리
    for (let i = 0; i < n; i++) {
        if (str1[i] === 'F') {
            let match = true;

            for (let j = 0; j < m; j++) {
                if (word[i + j] !== str2[j]) {
                    match = false;
                    break;
                }
            }

            if (match) {
                let changed = false;

                // 뒤에서부터 변경
                for (let j = m - 1; j >= 0; j--) {
                    if (!fixed[i + j] && word[i + j] !== 'z') {
                        word[i + j] = String.fromCharCode(
                            word[i + j].charCodeAt(0) + 1
                        );
                        changed = true;
                        break;
                    }
                }

                if (!changed) return "";
            }
        }
    }

    return word.join('');
}