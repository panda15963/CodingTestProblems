function solution(k, m, score) {
    // 1. 사과 점수를 오름차순으로 정렬
    score.sort((a, b) => a - b);

    let answer = 0;

    // 2. 뒤에서부터 m개씩 묶어서 계산
    for (let i = score.length - m; i >= 0; i -= m) {
        // 묶음의 최저 점수 × 상자에 담긴 개수(m)
        answer += score[i] * m;
    }

    return answer;
}