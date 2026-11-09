/**
 * @param {number[][]} wall
 * @return {number}
 */
var leastBricks = function(wall) {
    const edgeCount = new Map();

    for (const row of wall) {
        let position = 0;

        // 마지막 벽돌은 제외
        for (let i = 0; i < row.length - 1; i++) {
            position += row[i];

            edgeCount.set(
                position,
                (edgeCount.get(position) || 0) + 1
            );
        }
    }

    let maxEdges = 0;

    for (const count of edgeCount.values()) {
        maxEdges = Math.max(maxEdges, count);
    }

    return wall.length - maxEdges;
};