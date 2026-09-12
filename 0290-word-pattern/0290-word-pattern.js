function wordPattern(pattern, s) {
    const words = s.split(" ");

    if (pattern.length !== words.length) {
        return false;
    }

    const map = new Map();

    for (let i = 0; i < pattern.length; i++) {
        const c = pattern[i];
        const word = words[i];

        // 이미 매핑된 문자라면 같은 단어인지 확인
        if (map.has(c)) {
            if (map.get(c) !== word) {
                return false;
            }
        } else {
            // 이미 다른 문자에 매핑된 단어인지 확인
            if ([...map.values()].includes(word)) {
                return false;
            }

            map.set(c, word);
        }
    }

    return true;
}