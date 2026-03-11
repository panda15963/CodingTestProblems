function solution(myString) {
    // 정규식 [^l-z]는 l보다 작은 문자를 뜻하며, 이를 'l'로 치환
    return myString.replace(/[a-k]/g, 'l');
}
