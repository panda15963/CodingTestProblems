/**
 * @param {string} s
 * @return {string}
 */
var shortestPalindrome = function(s) {
    if (s.length <= 1) {
        return s;
    }

    // 문자열 뒤집기
    const reversed = s.split('').reverse().join('');

    // 원본 + 구분자 + 뒤집은 문자열
    const combined = s + '#' + reversed;

    // KMP의 LPS(Longest Prefix Suffix) 배열
    const lps = new Array(combined.length).fill(0);

    for (let i = 1; i < combined.length; i++) {
        let length = lps[i - 1];

        while (
            length > 0 &&
            combined[i] !== combined[length]
        ) {
            length = lps[length - 1];
        }

        if (combined[i] === combined[length]) {
            length++;
        }

        lps[i] = length;
    }

    // 가장 긴 팰린드롬 Prefix의 길이
    const palindromeLength = lps[combined.length - 1];

    // 팰린드롬이 아닌 나머지 부분
    const suffix = s.substring(palindromeLength);

    // 해당 부분을 뒤집어서 앞에 추가
    const prefixToAdd = suffix.split('').reverse().join('');

    return prefixToAdd + s;
};