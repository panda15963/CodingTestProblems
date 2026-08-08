/**
 * @param {string} word1
 * @param {string} word2
 * @return {number[]}
 */
var validSequence = function (word1, word2) {
    const ans = new Array(word2.length).fill(0);

    // last[j] := word1에서 word2[j]와 같은 문자가
    // 마지막으로 등장하는 위치
    const last = new Array(word2.length).fill(-1);

    let i = word1.length - 1;
    let j = word2.length - 1;

    // 각 word2[j]에 대해 뒤에서부터 마지막 위치를 찾음
    while (i >= 0 && j >= 0) {
        if (word1[i] === word2[j]) {
            last[j--] = i;
        }

        --i;
    }

    // 한 글자는 건너뛸 수 있음
    let canSkip = true;

    j = 0;

    for (i = 0; i < word1.length; ++i) {
        if (j === word2.length) {
            break;
        }

        // 현재 문자가 일치하는 경우
        if (word1[i] === word2[j]) {
            ans[j++] = i;
        }
        // 아직 한 번도 건너뛰지 않았고,
        // 현재 문자를 건너뛰어도 가능한 경우
        else if (
            canSkip &&
            (j === word2.length - 1 || i < last[j + 1])
        ) {
            canSkip = false;
            ans[j++] = i;
        }
    }

    // word2를 모두 만들 수 있다면 인덱스 배열 반환
    return j === word2.length ? ans : [];
};