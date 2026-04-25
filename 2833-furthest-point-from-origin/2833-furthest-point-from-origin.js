/**
 * @param {string} moves
 * @return {number}
 */
var furthestDistanceFromOrigin = function(moves) {
    let leftCount = 0;
    let rightCount = 0;
    let wildcardCount = 0;

    for (const ch of moves) {
        if (ch === 'L') leftCount++;
        else if (ch === 'R') rightCount++;
        else wildcardCount++;
    }

    return Math.abs(leftCount - rightCount) + wildcardCount;
};