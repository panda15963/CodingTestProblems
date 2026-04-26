function solution(r1, r2) {
    let count = 0;
    for (let x = 1; x <= r2; x++) {
        // x 좌표에 따른 두 원의 y좌표 최대/최소 계산
        let max_y = Math.floor(Math.sqrt(r2 ** 2 - x ** 2));
        let min_y = x < r1 ? Math.ceil(Math.sqrt(r1 ** 2 - x ** 2)) : 0;
        
        // 해당 x에서의 정수 y개수 (1사분면)
        count += (max_y - min_y + 1);
    }
    return count * 4; // 4개 사분면 적용
}
