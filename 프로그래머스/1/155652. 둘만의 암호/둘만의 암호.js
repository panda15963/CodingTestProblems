function solution(s, skip, index) {
    // 1. skip에 포함되지 않은 알파벳 배열 생성
    let alphabet = "abcdefghijklmnopqrstuvwxyz"
        .split("")
        .filter(c => !skip.includes(c));

    // 2. s의 각 문자를 변환
    return s.split("").map(char => {
        let currentIndex = alphabet.indexOf(char);
        // 3. index만큼 이동하되, 알파벳 배열의 크기로 나머지 연산
        let newIndex = (currentIndex + index) % alphabet.length;
        return alphabet[newIndex];
    }).join("");
}