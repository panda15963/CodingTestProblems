var checkInclusion = function(s1, s2) {
    // 아직 일치하지 않은 고유 문자 개수
    let uniqueCharsNeeded = 0;

    // 알파벳 소문자 빈도 배열
    const charFrequency = Array(26).fill(0);

    const asciiOffsetA = 'a'.charCodeAt(0);

    // s1의 문자 빈도 계산
    for (const char of s1) {
        const charIndex = char.charCodeAt(0) - asciiOffsetA;
        charFrequency[charIndex]++;

        if (charFrequency[charIndex] === 1) {
            uniqueCharsNeeded++;
        }
    }

    const patternLength = s1.length;
    const textLength = s2.length;

    // 슬라이딩 윈도우
    for (let windowEnd = 0; windowEnd < textLength; windowEnd++) {
        // 현재 문자 추가
        const currentCharIndex =
            s2.charCodeAt(windowEnd) - asciiOffsetA;

        charFrequency[currentCharIndex]--;

        if (charFrequency[currentCharIndex] === 0) {
            uniqueCharsNeeded--;
        }

        // 윈도우 크기가 s1보다 커지면 왼쪽 문자 제거
        if (windowEnd >= patternLength) {
            const leftCharIndex =
                s2.charCodeAt(windowEnd - patternLength) - asciiOffsetA;

            charFrequency[leftCharIndex]++;

            if (charFrequency[leftCharIndex] === 1) {
                uniqueCharsNeeded++;
            }
        }

        // 모든 문자의 빈도가 일치하면 true
        if (uniqueCharsNeeded === 0) {
            return true;
        }
    }

    return false;
};