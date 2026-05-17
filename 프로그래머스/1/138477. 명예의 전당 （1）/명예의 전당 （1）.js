function solution(k, score) {
    const answer = [];
    const hallOfFame = [];

    for (const num of score) {
        // 1. 명예의 전당에 새로운 점수 추가
        hallOfFame.push(num);
        
        // 2. 점수를 내림차순으로 정렬
        hallOfFame.sort((a, b) => b - a);
        
        // 3. 전당의 크기가 k를 초과하면 가장 낮은 점수(마지막 요소)를 제거
        if (hallOfFame.length > k) {
            hallOfFame.pop();
        }
        
        // 4. 현재 명예의 전당의 최하위 점수를 정답 배열에 추가
        answer.push(hallOfFame[hallOfFame.length - 1]);
    }

    return answer;
}
