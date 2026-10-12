var findRightInterval = function(intervals) {
    const intervalCount = intervals.length;

    const startIndexPairs = Array.from(
        { length: intervalCount },
        (_, index) => [intervals[index][0], index]
    );

    startIndexPairs.sort((a, b) => a[0] - b[0]);

    return intervals.map(([startTime, endTime]) => {
        let left = 0;
        let right = intervalCount;

        while (left < right) {
            const mid = Math.floor((left + right) / 2);

            if (startIndexPairs[mid][0] >= endTime) {
                right = mid;
            } else {
                left = mid + 1;
            }
        }

        return left < intervalCount
            ? startIndexPairs[left][1]
            : -1;
    });
};