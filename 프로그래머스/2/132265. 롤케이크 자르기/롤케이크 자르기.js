function solution(topping) {
    let answer = 0;
    
    // 오른쪽(동생)의 토핑 종류별 개수와 총 종류 수
    const rightMap = new Map();
    let rightCount = 0;
    
    for (const t of topping) {
        if (!rightMap.has(t)) {
            rightMap.set(t, 0);
            rightCount++;
        }
        rightMap.set(t, rightMap.get(t) + 1);
    }
    
    // 왼쪽(철수)의 토핑 종류를 담을 셋(Set)
    const leftSet = new Set();
    
    // 롤케이크를 왼쪽/오른쪽으로 나누며 확인
    for (const t of topping) {
        // 왼쪽으로 토핑 추가
        leftSet.add(t);
        
        // 오른쪽에서 토핑 제거
        rightMap.set(t, rightMap.get(t) - 1);
        
        // 오른쪽 토핑 개수가 0이 되면 종류 수 감소
        if (rightMap.get(t) === 0) {
            rightCount--;
        }
        
        // 철수와 동생의 토핑 종류 수가 같다면 방법의 수 1 추가
        if (leftSet.size === rightCount) {
            answer++;
        }
    }
    
    return answer;
}
