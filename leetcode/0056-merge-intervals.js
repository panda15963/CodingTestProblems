/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
function merge(intervals) {
    if (!intervals || intervals.length === 0) {
        return [];
    }

    // 시작 시간을 기준으로 정렬
    intervals.sort((a, b) => a[0] - b[0]);

    const merged = [intervals[0]];

    for (let i = 1; i < intervals.length; i++) {
        const last = merged[merged.length - 1];

        // 구간이 겹치는 경우
        if (intervals[i][0] <= last[1]) {
            last[1] = Math.max(last[1], intervals[i][1]);
        } else {
            // 겹치지 않는 경우
            merged.push(intervals[i]);
        }
    }

    return merged;
}