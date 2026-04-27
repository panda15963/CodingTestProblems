function solution(players, callings) {
    let answer = [...players];
    
    const map = new Map();
    
    // 초기 순위 매핑
    for(let i = 0; i < players.length; i++) {
        map.set(players[i], i);
    }
    
    // 호출된 선수 처리
    for(let i = 0; i < callings.length; i++) {
        const calledPlayer = callings[i];
        // 이름 불린 선수의 원래 등수
        const rank = map.get(calledPlayer);
        // 앞 선수의 이름
        const frontPlayer = answer[rank - 1];
        
        // 배열 순서 변경
        answer[rank - 1] = calledPlayer;
        answer[rank] = frontPlayer;
        
        // Map 업데이트
        map.set(calledPlayer, rank - 1);
        map.set(frontPlayer, rank);
    }
    
    return answer;
}