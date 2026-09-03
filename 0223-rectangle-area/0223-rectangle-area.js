/**
 * @param {number} ax1
 * @param {number} ay1
 * @param {number} ax2
 * @param {number} ay2
 * @param {number} bx1
 * @param {number} by1
 * @param {number} bx2
 * @param {number} by2
 * @return {number}
 */
var computeArea = function(
    ax1,
    ay1,
    ax2,
    ay2,
    bx1,
    by1,
    bx2,
    by2
) {
    // 첫 번째 직사각형의 넓이
    const a = (ax2 - ax1) * (ay2 - ay1);

    // 두 번째 직사각형의 넓이
    const b = (bx2 - bx1) * (by2 - by1);

    // 겹치는 영역의 너비
    const width =
        Math.min(ax2, bx2) -
        Math.max(ax1, bx1);

    // 겹치는 영역의 높이
    const height =
        Math.min(ay2, by2) -
        Math.max(ay1, by1);

    // 전체 넓이 - 겹치는 영역
    return (
        a +
        b -
        Math.max(width, 0) * Math.max(height, 0)
    );
};