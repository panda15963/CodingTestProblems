/**
 * Counts the number of distinct non-empty subsequences of a string.
 *
 * @param {string} s
 * @return {number}
 */
function distinctSubseqII(s) {
    // 모듈러 값
    const MOD = 1e9 + 7;

    // 각 문자(a-z)로 끝나는 서로 다른 부분 수열의 개수
    const subsequenceCountByChar = new Array(26).fill(0);

    // 문자열의 각 문자 처리
    for (const char of s) {
        // 현재 문자의 인덱스 계산
        const charIndex =
            char.charCodeAt(0) - 'a'.charCodeAt(0);

        // 기존의 모든 부분 수열 개수 계산
        const totalExistingSubsequences =
            subsequenceCountByChar.reduce(
                (sum, count) => (sum + count) % MOD,
                0
            );

        // 현재 문자로 끝나는 부분 수열 개수 업데이트
        subsequenceCountByChar[charIndex] =
            (totalExistingSubsequences + 1) % MOD;
    }

    // 모든 서로 다른 부분 수열의 개수 합산
    return subsequenceCountByChar.reduce(
        (sum, count) => (sum + count) % MOD,
        0
    );
}