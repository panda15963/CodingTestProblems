var eraseOverlapIntervals = function(intervals) {
    intervals.sort((a, b) => a[1] - b[1]);

    let removalCount = intervals.length;
    let previousEnd = -Infinity;

    for (const [currentStart, currentEnd] of intervals) {
        if (previousEnd <= currentStart) {
            removalCount--;
            previousEnd = currentEnd;
        }
    }

    return removalCount;
};