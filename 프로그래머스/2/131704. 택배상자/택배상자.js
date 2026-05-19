function solution(order) {
    let answer = 0;
    let belt = 1;         // 현재 메인 벨트에서 나와야 하는 상자 번호
    let stack = [];       // 보조 컨테이너 벨트 (스택)
    
    for (const target of order) {
        // 메인 벨트 상자 번호가 목표 상자보다 작거나 같고, 
        // 보조 벨트에 목표 상자가 없는 경우 메인 벨트에서 보조 벨트로 이동
        while (belt <= target) {
            stack.push(belt);
            belt++;
        }
        
        // 보조 컨테이너의 가장 위에 있는 상자가 목표 상자와 일치할 때
        if (stack.length > 0 && stack[stack.length - 1] === target) {
            stack.pop();
            answer++;
        } else {
            // 일치하지 않으면 더 이상 상자를 실을 수 없음
            break;
        }
    }
    
    return answer;
}
