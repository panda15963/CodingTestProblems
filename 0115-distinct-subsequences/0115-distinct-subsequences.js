/**
 * Counts the number of distinct subsequences of string s that equal string t
 *
 * @param {string} s - The source string
 * @param {string} t - The target string
 * @return {number} The number of distinct subsequences
 */
function numDistinct(s, t) {
    const sourceLength = s.length;
    const targetLength = t.length;

    // dp[i][j]:
    // s의 앞 i개 문자에서 t의 앞 j개 문자를 만들 수 있는 경우의 수
    const dp = new Array(sourceLength + 1)
        .fill(0)
        .map(() => new Array(targetLength + 1).fill(0));

    // 빈 문자열은 어떤 문자열에서도 한 가지 방법으로 만들 수 있음
    for (let i = 0; i <= sourceLength; i++) {
        dp[i][0] = 1;
    }

    // DP 테이블 채우기
    for (let i = 1; i <= sourceLength; i++) {
        for (let j = 1; j <= targetLength; j++) {
            // 현재 s의 문자를 사용하지 않는 경우
            dp[i][j] = dp[i - 1][j];

            // 두 문자가 같으면 현재 문자 사용하는 경우 추가
            if (s[i - 1] === t[j - 1]) {
                dp[i][j] += dp[i - 1][j - 1];
            }
        }
    }

    return dp[sourceLength][targetLength];
}