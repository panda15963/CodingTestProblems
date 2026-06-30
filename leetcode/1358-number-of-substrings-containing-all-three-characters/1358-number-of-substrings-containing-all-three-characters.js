function numberOfSubstrings(s) {
    // 'a', 'b', 'c'의 마지막 등장 위치
    const lastPosition = [-1, -1, -1];
    let result = 0;

    // 문자열 순회
    for (let i = 0; i < s.length; i++) {
        // 현재 문자의 마지막 위치 갱신
        lastPosition[s.charCodeAt(i) - 97] = i;

        // 세 문자 중 가장 앞에 있는 위치
        const minPosition = Math.min(
            lastPosition[0],
            lastPosition[1],
            lastPosition[2]
        );

        // 현재 위치에서 만들 수 있는 유효한 부분 문자열 개수 추가
        result += minPosition + 1;
    }

    return result;
}