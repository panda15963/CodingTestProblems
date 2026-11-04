var findMinDifference = function(timePoints) {
    if (timePoints.length > 1440) {
        return 0;
    }

    const timePointCount = timePoints.length;
    const minutesArray = new Array(timePointCount + 1);

    // 시간을 자정부터 지난 분으로 변환
    for (let i = 0; i < timePointCount; i++) {
        const [hours, minutes] = timePoints[i].split(':').map(Number);
        minutesArray[i] = hours * 60 + minutes;
    }

    // 오름차순 정렬
    minutesArray.sort((a, b) => a - b);

    // 자정 이후의 순환 차이 처리
    minutesArray[timePointCount] = minutesArray[0] + 1440;

    let minimumDifference = 1 << 30;

    // 인접한 시간 사이의 최소 차이 계산
    for (let i = 1; i <= timePointCount; i++) {
        minimumDifference = Math.min(
            minimumDifference,
            minutesArray[i] - minutesArray[i - 1]
        );
    }

    return minimumDifference;
};