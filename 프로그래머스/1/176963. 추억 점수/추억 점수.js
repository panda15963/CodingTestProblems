function solution(name, yearning, photo) {
    // 1. 이름과 그리움 점수를 매핑 (Object 또는 Map)
    const scoreMap = {};
    name.forEach((n, i) => {
        scoreMap[n] = yearning[i];
    });

    // 2. 사진 배열 순회하며 점수 계산
    return photo.map(p => 
        p.reduce((acc, cur) => acc + (scoreMap[cur] || 0), 0)
    );
}
