var checkRecord = function(s) {
    // 결석(A)이 최대 1번인지 확인
    const hasAtMostOneAbsence =
        s.indexOf('A') === s.lastIndexOf('A');

    // 지각(L)이 3번 연속으로 발생하지 않는지 확인
    const hasNoThreeConsecutiveLates =
        s.indexOf('LLL') === -1;

    // 두 조건을 모두 만족하면 true 반환
    return hasAtMostOneAbsence && hasNoThreeConsecutiveLates;
};