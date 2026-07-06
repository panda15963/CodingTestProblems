function removeCoveredIntervals(intervals: number[][]): number {

    intervals.sort((a, b) => {
        if (a[0] === b[0]) {
            return b[1] - a[1];
        }
        return a[0] - b[0];
    });

    let end = intervals[0][1];
    let count = 0;

    for (let i = 1; i < intervals.length; i++) {

        if (end >= intervals[i][1]) {
            count++;
        } else {
            end = intervals[i][1];
        }
    }

    return intervals.length - count;
}