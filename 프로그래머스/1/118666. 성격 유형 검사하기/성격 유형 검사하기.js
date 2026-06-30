function solution(survey, choices) {
    const scores = { R: 0, T: 0, C: 0, F: 0, J: 0, M: 0, A: 0, N: 0 };
    
    // 점수 계산
    survey.forEach((types, idx) => {
        const choice = choices[idx];
        const score = Math.abs(choice - 4);
        
        if (choice < 4) {
            scores[types[0]] += score; // 앞쪽 성격 유형
        } else if (choice > 4) {
            scores[types[1]] += score; // 뒤쪽 성격 유형
        }
    });

    // 결과 도출 (지표별 비교 및 높은 점수 할당)
    const types = [['R', 'T'], ['C', 'F'], ['J', 'M'], ['A', 'N']];
    let answer = '';

    types.forEach(([type1, type2]) => {
        if (scores[type2] > scores[type1]) {
            answer += type2;
        } else {
            answer += type1; // 점수가 같을 경우 알파벳 순으로 type1이 먼저 선택됨
        }
    });

    return answer;
}