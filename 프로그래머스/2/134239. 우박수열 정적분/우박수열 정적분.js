function solution(k, ranges) {
    // 1. 우박수열(y값) 배열 생성
    const ySequence = [k];
    while (k > 1) {
        k = k % 2 === 0 ? k / 2 : k * 3 + 1;
        ySequence.push(k);
    }
    
    const n = ySequence.length - 1; // 총 이동 횟수
    const areas = [];
    
    // 2. 각 단위 구간별 사다리꼴 넓이 미리 계산
    for (let i = 0; i < n; i++) {
        const h1 = ySequence[i];
        const h2 = ySequence[i+1];
        areas.push((h1 + h2) / 2); // 윗변 h1, 아랫변 h2, 높이 1인 사다리꼴
    }
    
    // 3. 정적분 결과 계산
    return ranges.map(([start, end]) => {
        const actualEnd = end <= 0 ? n + end : end; // 0 이하의 끝점 변환
        
        if (start > actualEnd) return -1.0; // 시작점이 끝점보다 크면 유효하지 않은 구간
        if (start === actualEnd) return 0.0;  // 시작점과 끝점이 같으면 넓이 0
        
        let sum = 0;
        for (let i = start; i < actualEnd; i++) {
            sum += areas[i];
        }
        return sum;
    });
}
