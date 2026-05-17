function solution(food) {
    let result = [];
    
    for (let i = 1; i < food.length; i++) {
        // 선수가 먹을 음식의 양을 2로 나눈 몫만큼 반복하여 추가
        let count = Math.floor(food[i] / 2);
        result.push(String(i).repeat(count));
    }

    // 왼쪽 선수의 배치 + 물(0) + 뒤집은 오른쪽 선수의 배치
    return result.join('') + '0' + [...result].reverse().join('');
}
