var evaluate = function(s, knowledge) {
    const stringLength = s.length;

    // knowledge를 Map으로 변환
    const knowledgeMap = new Map();

    for (const [key, value] of knowledge) {
        knowledgeMap.set(key, value);
    }

    const result = [];
    let currentIndex = 0;

    while (currentIndex < stringLength) {
        if (s[currentIndex] === '(') {
            // 닫는 괄호 위치 찾기
            const closingBracketIndex =
                s.indexOf(')', currentIndex + 1);

            // 괄호 안의 key 추출
            const key = s.slice(
                currentIndex + 1,
                closingBracketIndex
            );

            // 값이 없으면 '?'
            result.push(
                knowledgeMap.get(key) ?? '?'
            );

            // 닫는 괄호 위치로 이동
            currentIndex = closingBracketIndex;
        } else {
            result.push(s[currentIndex]);
        }

        currentIndex++;
    }

    return result.join('');
};