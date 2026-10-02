var longestSubstring = function(s, k) {
    const findLongestValidSubstring = (left, right) => {
        const charFrequency = new Array(26).fill(0);

        for (let i = left; i <= right; i++) {
            charFrequency[s.charCodeAt(i) - 'a'.charCodeAt(0)]++;
        }

        let separator = null;

        for (let i = 0; i < 26; i++) {
            if (
                charFrequency[i] > 0 &&
                charFrequency[i] < k
            ) {
                separator =
                    String.fromCharCode(
                        'a'.charCodeAt(0) + i
                    );
                break;
            }
        }

        if (separator === null) {
            return right - left + 1;
        }

        let currentIndex = left;
        let maxLength = 0;

        while (currentIndex <= right) {
            // 구분 문자 건너뛰기
            while (
                currentIndex <= right &&
                s[currentIndex] === separator
            ) {
                currentIndex++;
            }

            if (currentIndex > right) {
                break;
            }

            // 다음 구분 문자 전까지의 구간
            let segmentEnd = currentIndex;

            while (
                segmentEnd <= right &&
                s[segmentEnd] !== separator
            ) {
                segmentEnd++;
            }

            const segmentLength =
                findLongestValidSubstring(
                    currentIndex,
                    segmentEnd - 1
                );

            maxLength = Math.max(
                maxLength,
                segmentLength
            );

            currentIndex = segmentEnd;
        }

        return maxLength;
    };

    return findLongestValidSubstring(
        0,
        s.length - 1
    );
};