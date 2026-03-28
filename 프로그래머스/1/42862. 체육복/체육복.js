function solution(n, lost, reserve) {
    // 1. 도난 + 여벌 겹치는 학생 처리 (본인 분만 채우고, 빌려줄 수 없음)
    const realLost = lost.filter(x => !reserve.includes(x));
    const realReserve = reserve.filter(x => !lost.includes(x));

    // 2. 기본: n - 도난당한 인원 수
    let answer = n - realLost.length;

    // 3. realLost 오름차순 정렬 후, 앞·뒤 여벌 체육복 확인
    realLost.sort((a, b) => a - b);
    const reserveSet = new Set(realReserve);

    for (const student of realLost) {
        if (reserveSet.has(student - 1)) {  // 왼쪽 학생이 여벌
            reserveSet.delete(student - 1);
            answer++;
        } else if (reserveSet.has(student + 1)) {  // 오른쪽 학생이 여벌
            reserveSet.delete(student + 1);
            answer++;
        }
    }

    return answer;
}