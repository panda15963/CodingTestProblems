function canCompleteCircuit(gas, cost) {
    let totalGas = 0;
    let totalCost = 0;

    // 전체 가스와 전체 비용 계산
    for (let i = 0; i < gas.length; i++) {
        totalGas += gas[i];
        totalCost += cost[i];
    }

    // 전체 가스가 부족하면 완주 불가능
    if (totalGas < totalCost) {
        return -1;
    }

    let start = 0;
    let fuel = 0;

    for (let i = 0; i < gas.length; i++) {
        // 현재 주유소에서 다음 주유소까지 갈 수 없는 경우
        if (gas[i] + fuel < cost[i]) {
            start = i + 1;
            fuel = 0;
        } else {
            // 현재 주유소에서 얻는 가스 - 이동에 필요한 가스
            fuel += gas[i] - cost[i];
        }
    }

    return start;
}