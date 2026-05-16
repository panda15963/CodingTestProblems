function solution(k, d) {
    let answer = 0;
    
    for (let x = 0; x <= d; x += k) {
        // x^2 + y^2 <= d^2 방정식을 이용해 최대 y값 계산
        const maxY = Math.floor(Math.sqrt(d**2 - x**2));
        
        // 해당 x좌표에서 k 간격으로 찍을 수 있는 점의 개수 추가 (0 포함)
        answer += Math.floor(maxY / k) + 1;
    }
    
    return answer;
}
