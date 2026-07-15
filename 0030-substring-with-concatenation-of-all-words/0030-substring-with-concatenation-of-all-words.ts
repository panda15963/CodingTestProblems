function findSubstring(s: string, words: string[]): number[] {
    // 입력값 예외 처리
    if (
        s.length === 0 ||
        words.length === 0
    ) {
        return [];
    }

    const wordLeng: number = words[0].length;
    const wholeLeng: number = words.length * wordLeng;

    // 문자열의 길이가 필요한 전체 단어 길이보다 짧은 경우
    if (
        s.length < words.length ||
        s.length < wholeLeng
    ) {
        return [];
    }

    const ans: number[] = [];

    // words의 등장 빈도를 저장하는 Map
    const wordsMap: Map<string, number> = new Map();

    for (const word of words) {
        wordsMap.set(
            word,
            (wordsMap.get(word) ?? 0) + 1
        );
    }

    // 두 Map의 내용이 같은지 확인
    function mapsEqual(
        map1: Map<string, number>,
        map2: Map<string, number>
    ): boolean {
        if (map1.size !== map2.size) {
            return false;
        }

        for (const [key, value] of map1) {
            if (map2.get(key) !== value) {
                return false;
            }
        }

        return true;
    }

    // 단어 길이만큼 시작 위치 변경
    for (let i = 0; i < wordLeng; i++) {
        let deleteIndex: number = i;

        const createCnt: number = Math.floor(
            (s.length - i) / wordLeng
        );

        const compareMap: Map<string, number> = new Map();

        // 최초 words.length개의 단어를 Map에 저장
        for (
            let j = 0;
            j < words.length &&
            (j + 1) * wordLeng + i <= s.length;
            j++
        ) {
            const from: number = i + j * wordLeng;
            const to: number = (j + 1) * wordLeng + i;

            const now: string = s.substring(from, to);

            compareMap.set(
                now,
                (compareMap.get(now) ?? 0) + 1
            );
        }

        // 최초 위치 비교
        if (mapsEqual(wordsMap, compareMap)) {
            ans.push(i);
        }

        // 슬라이딩 윈도우
        for (let j = words.length; j < createCnt; j++) {
            // 맨 앞 단어 제거
            const deleteKey: string = s.substring(
                deleteIndex,
                deleteIndex + wordLeng
            );

            const newVal: number =
                (compareMap.get(deleteKey) ?? 0) - 1;

            if (newVal > 0) {
                compareMap.set(deleteKey, newVal);
            } else {
                compareMap.delete(deleteKey);
            }

            deleteIndex += wordLeng;

            // 새로운 단어 추가
            const from: number = i + j * wordLeng;
            const to: number = (j + 1) * wordLeng + i;

            const now: string = s.substring(from, to);

            compareMap.set(
                now,
                (compareMap.get(now) ?? 0) + 1
            );

            // Map 비교
            if (mapsEqual(wordsMap, compareMap)) {
                ans.push(
                    i +
                    (j - words.length + 1) * wordLeng
                );
            }
        }
    }

    return ans;
}