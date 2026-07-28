/**
 * @param {number[][]} intervals
 * @param {number[]} newInterval
 * @return {number[][]}
 */
function insert(intervals, newInterval) {
    const merged = [];
    let i = 0;

    // newInterval 이전의 구간 추가
    while (i < intervals.length && intervals[i][1] < newInterval[0]) {
        merged.push(intervals[i]);
        i++;
    }

    // 겹치는 구간 병합
    while (i < intervals.length && intervals[i][0] <= newInterval[1]) {
        newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
        newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
        i++;
    }

    merged.push(newInterval);

    // newInterval 이후의 구간 추가
    while (i < intervals.length) {
        merged.push(intervals[i]);
        i++;
    }

    return merged;
}