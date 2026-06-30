function solution(cards) {
    const visited = new Array(cards.length).fill(false);
    const groups = [];

    for (let i = 0; i < cards.length; i++) {
        if (!visited[i]) {
            let count = 0;
            let current = i;
            
            while (!visited[current]) {
                visited[current] = true;
                current = cards[current] - 1; // 0번 인덱스 기준으로 맞춤
                count++;
            }
            
            groups.push(count);
        }
    }

    groups.sort((a, b) => b - a);
    
    // 그룹이 2개 이상이면 상위 두 그룹의 곱, 1개면 0을 반환
    return groups.length > 1 ? groups[0] * groups[1] : 0;
}