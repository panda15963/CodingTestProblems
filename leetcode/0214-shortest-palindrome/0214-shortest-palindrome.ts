/**
 * @param s 문자열
 * @returns 가장 짧은 팰린드롬
 */
function shortestPalindrome(s: string): string {
    // 문자열 길이가 0 또는 1이면 이미 팰린드롬
    if (s.length <= 1) {
        return s;
    }

    // 문자열 뒤집기
    const reversed: string = s
        .split('')
        .reverse()
        .join('');

    // 원본 + 구분자 + 뒤집은 문자열
    const combined: string = s + '#' + reversed;

    // KMP의 LPS(Longest Prefix Suffix) 배열
    const lps: number[] = new Array(combined.length).fill(0);

    // LPS 배열 생성
    for (let i: number = 1; i < combined.length; i++) {
        let length: number = lps[i - 1];

        // 현재 문자가 일치하지 않으면 이전 LPS 위치로 이동
        while (
            length > 0 &&
            combined[i] !== combined[length]
        ) {
            length = lps[length - 1];
        }

        // 문자가 일치하면 길이 증가
        if (combined[i] === combined[length]) {
            length++;
        }

        lps[i] = length;
    }

    // 가장 긴 팰린드롬 Prefix의 길이
    const palindromeLength: number =
        lps[combined.length - 1];

    // 팰린드롬에 포함되지 않은 뒷부분
    const suffix: string = s.substring(palindromeLength);

    // 뒷부분을 뒤집어서 앞에 추가
    const prefixToAdd: string = suffix
        .split('')
        .reverse()
        .join('');

    return prefixToAdd + s;
}