function maximumGap(nums) {
    const n = nums.length;

    // 원소가 2개 미만이면 간격이 없음
    if (n < 2) {
        return 0;
    }

    const INF = 0x3f3f3f3f;

    // 배열의 최솟값과 최댓값 찾기
    let minValue = INF;
    let maxValue = -INF;

    for (const value of nums) {
        minValue = Math.min(minValue, value);
        maxValue = Math.max(maxValue, value);
    }

    // 버킷 크기 계산
    const bucketSize = Math.max(
        1,
        Math.floor((maxValue - minValue) / (n - 1))
    );

    // 버킷 개수 계산
    const bucketCount =
        Math.floor((maxValue - minValue) / bucketSize) + 1;

    // 각 버킷은 [최솟값, 최댓값]을 저장
    const buckets = Array(bucketCount)
        .fill(null)
        .map(() => [INF, -INF]);

    // 숫자를 버킷에 분배
    for (const value of nums) {
        const bucketIndex = Math.floor(
            (value - minValue) / bucketSize
        );

        buckets[bucketIndex][0] = Math.min(
            buckets[bucketIndex][0],
            value
        );

        buckets[bucketIndex][1] = Math.max(
            buckets[bucketIndex][1],
            value
        );
    }

    // 비어 있지 않은 인접 버킷 사이의 간격을 확인
    let maxGap = 0;
    let previousMax = minValue;

    for (const [currentMin, currentMax] of buckets) {
        // 빈 버킷이면 건너뜀
        if (currentMin > currentMax) {
            continue;
        }

        // 이전 버킷의 최댓값과 현재 버킷의 최솟값 사이의 간격
        maxGap = Math.max(
            maxGap,
            currentMin - previousMax
        );

        previousMax = currentMax;
    }

    return maxGap;
}