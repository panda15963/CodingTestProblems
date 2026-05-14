function solution(t, p) {
    let count = 0;
    const len = p.length;
    const numP = Number(p); // 또는 BigInt(p) p의 길이가 길 경우

    for (let i = 0; i <= t.length - len; i++) {
        // 부분 문자열 추출
        let sub = t.substring(i, i + len);
        // 숫자로 변환 후 비교
        if (Number(sub) <= numP) {
            count++;
        }
    }
    return count;
}
