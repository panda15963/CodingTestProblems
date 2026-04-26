function solution(targets) {
    let answer = 0; // 요격 미사일 수
    let end = 0;    // 개구간 끝 좌표

    // 1) 개구간 마지막 좌표로 오름차순 정렬
    targets.sort((a, b) => a[1] - b[1]);
    
    for(let [s, e] of targets) {
        
        // 2) 개구간 시작 좌표(s)가 end 보다 크거나 같을 경우
        // end 좌표 보다 작다면 겹치는 범위가 발생 하므로 동일한 미사일에 요격 된다.
        if(end <= s) {
            
            // 3) answer를 증가 시키고, 끝 좌표를 변경한다.
            answer++;
            end = e; 
        }
    }
    
    return answer;
}