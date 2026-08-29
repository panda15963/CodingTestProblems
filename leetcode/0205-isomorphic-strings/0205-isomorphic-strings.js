var isIsomorphic = function(s, t) {
    // s의 각 문자가 마지막으로 등장한 위치
    const lastPositionInS = new Array(256).fill(0);

    // t의 각 문자가 마지막으로 등장한 위치
    const lastPositionInT = new Array(256).fill(0);

    // 두 문자열을 동시에 순회
    for (let i = 0; i < s.length; ++i) {
        // 현재 문자의 ASCII 코드
        const charCodeS = s.charCodeAt(i);
        const charCodeT = t.charCodeAt(i);

        // 두 문자의 이전 등장 위치가 다르면
        // 서로 일관된 매핑이 아니므로 false
        if (lastPositionInS[charCodeS] !== lastPositionInT[charCodeT]) {
            return false;
        }

        // 마지막 등장 위치 갱신
        // i + 1을 사용하는 이유는 초기값 0과 구분하기 위해서
        lastPositionInS[charCodeS] = i + 1;
        lastPositionInT[charCodeT] = i + 1;
    }

    return true;
};