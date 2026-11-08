var checkRecord = function(n) {
    // dp[day][absenceCount][consecutiveLates]
    // -1은 아직 계산하지 않은 상태
    const dp = Array.from({ length: n }, () =>
        Array.from({ length: 2 }, () =>
            Array(3).fill(-1)
        )
    );

    const MOD = 1e9 + 7;

    const dfs = function(day, absenceCount, consecutiveLates) {
        // n일을 모두 처리한 경우
        if (day >= n) {
            return 1;
        }

        // 이미 계산한 결과가 있으면 반환
        if (dp[day][absenceCount][consecutiveLates] !== -1) {
            return dp[day][absenceCount][consecutiveLates];
        }

        // 선택 1: 출석(P)
        // 연속 지각 횟수 초기화
        let result = dfs(day + 1, absenceCount, 0);

        // 선택 2: 결석(A)
        // 결석 횟수가 0일 때만 가능
        if (absenceCount === 0) {
            result = (
                result + dfs(day + 1, absenceCount + 1, 0)
            ) % MOD;
        }

        // 선택 3: 지각(L)
        // 연속 지각 횟수가 2회 미만일 때만 가능
        if (consecutiveLates < 2) {
            result = (
                result + dfs(day + 1, absenceCount, consecutiveLates + 1)
            ) % MOD;
        }

        // 계산 결과 저장
        dp[day][absenceCount][consecutiveLates] = result;

        return result;
    };

    // 0일차, 결석 0회, 연속 지각 0회부터 시작
    return dfs(0, 0, 0);
};