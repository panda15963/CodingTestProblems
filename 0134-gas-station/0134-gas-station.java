class Solution {
    public int canCompleteCircuit(int[] gas, int[] cost) {

        // gas의 총합이 cost의 총합보다 작으면
        // 어떤 출발점에서도 한 바퀴를 돌 수 없다.
        int totalGas = 0;
        int totalCost = 0;

        for (int i = 0; i < gas.length; i++) {
            totalGas += gas[i];
            totalCost += cost[i];
        }

        if (totalGas < totalCost) {
            return -1;
        }

        // start: 출발 지점
        // fuel: 현재까지 누적된 가스
        int start = 0;
        int fuel = 0;

        for (int i = 0; i < gas.length; i++) {

            // 현재 주유소에서 다음 주유소까지 갈 수 없는 경우
            if (gas[i] + fuel < cost[i]) {
                // 다음 주유소를 새로운 출발점으로 설정
                start = i + 1;
                fuel = 0;
            } else {
                // 이동 후 남은 연료를 누적
                fuel += gas[i] - cost[i];
            }
        }

        return start;
    }
}