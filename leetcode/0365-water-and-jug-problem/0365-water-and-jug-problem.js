var canMeasureWater = function(x, y, z) {
    // DFS에서 사용할 상태 스택
    const stateStack = [];
    stateStack.push([0, 0]);

    // 방문한 상태 저장
    const visitedStates = new Set();

    while (stateStack.length > 0) {
        const currentState = stateStack.pop();
        const stateKey = `${currentState[0]},${currentState[1]}`;

        // 이미 방문한 상태라면 건너뜀
        if (visitedStates.has(stateKey)) {
            continue;
        }

        visitedStates.add(stateKey);

        const [waterInJug1, waterInJug2] = currentState;

        // 목표 용량을 만들었는지 확인
        if (
            waterInJug1 === z ||
            waterInJug2 === z ||
            waterInJug1 + waterInJug2 === z
        ) {
            return true;
        }

        // 1. 물통 1을 가득 채우기
        stateStack.push([x, waterInJug2]);

        // 2. 물통 2를 가득 채우기
        stateStack.push([waterInJug1, y]);

        // 3. 물통 1 비우기
        stateStack.push([0, waterInJug2]);

        // 4. 물통 2 비우기
        stateStack.push([waterInJug1, 0]);

        // 5. 물통 1 -> 물통 2
        const pourAmount1To2 = Math.min(
            waterInJug1,
            y - waterInJug2
        );

        stateStack.push([
            waterInJug1 - pourAmount1To2,
            waterInJug2 + pourAmount1To2
        ]);

        // 6. 물통 2 -> 물통 1
        const pourAmount2To1 = Math.min(
            waterInJug2,
            x - waterInJug1
        );

        stateStack.push([
            waterInJug1 + pourAmount2To1,
            waterInJug2 - pourAmount2To1
        ]);
    }

    return false;
};