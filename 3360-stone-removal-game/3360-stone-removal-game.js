var canAliceWin = function(n) {
    // 현재 빼야 할 값과 턴 횟수 초기화
    let currentSubtractionValue = 10;
    let turnCount = 0;

    // 현재 값에서 뺄 수 있는 동안 게임 진행
    while (n >= currentSubtractionValue) {
        // 현재 값 차감
        n -= currentSubtractionValue;

        // 다음 턴의 차감 값 감소
        currentSubtractionValue--;

        // 턴 횟수 증가
        turnCount++;
    }

    // 홀수 턴이면 Alice 승리
    return turnCount % 2 === 1;
};