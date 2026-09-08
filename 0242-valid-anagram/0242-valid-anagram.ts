function isAnagram(s: string, t: string): boolean {
    // 문자열 길이가 다르면 애너그램이 될 수 없음
    if (s.length !== t.length) {
        return false;
    }

    // 알파벳 개수 저장
    const alphabet: number[] = new Array(26).fill(0);

    // 첫 번째 문자열의 문자 개수 증가
    for (let i = 0; i < s.length; i++) {
        alphabet[s.charCodeAt(i) - 'a'.charCodeAt(0)]++;
    }

    // 두 번째 문자열의 문자 개수 감소
    for (let i = 0; i < t.length; i++) {
        alphabet[t.charCodeAt(i) - 'a'.charCodeAt(0)]--;
    }

    // 모든 문자의 개수가 동일한지 확인
    for (const count of alphabet) {
        if (count !== 0) {
            return false;
        }
    }

    return true;
}