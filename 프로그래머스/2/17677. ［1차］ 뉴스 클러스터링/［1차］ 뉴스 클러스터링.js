function solution(str1, str2) {

    const MULTI = 65536;

    const map = new Map();

    str1 = str1.toLowerCase();
    str2 = str2.toLowerCase();

    // str1 다중집합 생성
    for (let i = 0; i < str1.length - 1; i++) {

        if (
            !isAlphabet(str1[i]) ||
            !isAlphabet(str1[i + 1])
        ) {
            continue;
        }

        const key = str1.substring(i, i + 2);

        map.set(key, (map.get(key) || 0) + 1);
    }

    let interCnt = 0;
    let unionCnt = 0;

    // str2와 비교
    for (let i = 0; i < str2.length - 1; i++) {

        if (
            !isAlphabet(str2[i]) ||
            !isAlphabet(str2[i + 1])
        ) {
            continue;
        }

        const key = str2.substring(i, i + 2);

        if (map.has(key)) {

            const cnt = map.get(key);

            if (cnt === 1) {
                map.delete(key);
            } else {
                map.set(key, cnt - 1);
            }

            interCnt++;
        }

        unionCnt++;
    }

    // 남은 원소들은 합집합에 포함
    for (const cnt of map.values()) {
        unionCnt += cnt;
    }

    if (unionCnt === 0) {
        return MULTI;
    }

    return Math.floor((interCnt / unionCnt) * MULTI);
}

function isAlphabet(ch) {

    const code = ch.charCodeAt(0);

    return code >= 97 && code <= 122;
}