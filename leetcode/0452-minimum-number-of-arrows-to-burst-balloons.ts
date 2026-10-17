function findMinArrowShots(points: number[][]): number {
    points.sort((a, b) => a[0] - b[0]);

    let cnt = 0;
    let minRight = -Infinity;

    for (const [left, right] of points) {
        if (left > minRight) {
            cnt++;
            minRight = right;
        } else {
            minRight = Math.min(minRight, right);
        }
    }

    return cnt;
}