/**
 * @param {string} s
 * @return {string}
 */
function reverseWords(s) {
    // 공백을 기준으로 문자열 분리
    const words = s.split(' ');

    // 각 단어의 문자 순서 뒤집기
    const reversedWords = words.map((word) => {
        return word.split('').reverse().join('');
    });

    // 공백을 유지하면서 다시 합치기
    return reversedWords.join(' ');
}