function hIndex(citations) {
    const n = citations.length;

    if (n === 0) {
        return 0;
    }

    let left = 0;
    let right = n - 1;
    let firstTrueIndex = -1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);

        // citations[mid]가 충분한 인용 횟수를 가지고 있는지 확인
        if (citations[mid] >= n - mid) {
            firstTrueIndex = mid;
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }

    // h-index 반환
    return firstTrueIndex !== -1
        ? n - firstTrueIndex
        : 0;
}