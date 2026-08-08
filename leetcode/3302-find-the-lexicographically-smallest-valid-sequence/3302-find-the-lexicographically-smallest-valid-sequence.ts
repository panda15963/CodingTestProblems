function validSequence(word1: string, word2: string): number[] {
    const ans: number[] = new Array(word2.length).fill(0);

    // last[j] := word1에서 word2[j]와 같은 문자가
    // 마지막으로 등장하는 위치
    const last: number[] = new Array(word2.length).fill(-1);

    let i: number = word1.length - 1;
    let j: number = word2.length - 1;

    // 뒤에서부터 각 문자의 마지막 위치를 찾음
    while (i >= 0 && j >= 0) {
        if (word1[i] === word2[j]) {
            last[j--] = i;
        }

        --i;
    }

    // 한 글자는 건너뛸 수 있음
    let canSkip: boolean = true;

    j = 0;

    for (i = 0; i < word1.length; ++i) {
        if (j === word2.length) {
            break;
        }

        // 현재 문자가 일치하는 경우
        if (word1[i] === word2[j]) {
            ans[j++] = i;
        }
        // 아직 건너뛰지 않았고 현재 문자를 건너뛸 수 있는 경우
        else if (
            canSkip &&
            (j === word2.length - 1 || i < last[j + 1])
        ) {
            canSkip = false;
            ans[j++] = i;
        }
    }

    // word2를 모두 만들 수 있으면 결과 반환
    return j === word2.length ? ans : [];
}