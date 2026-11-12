/**
 * @param {number} m
 * @param {number} n
 * @param {number[][]} ops
 * @return {number}
 */
var maxCount = function(m, n, ops) {

    // Find the intersection of all operation rectangles
    // The smallest rectangle will contain the maximum values
    for (const [rowLimit, colLimit] of ops) {

        // Update m to be the minimum row limit
        m = Math.min(m, rowLimit);

        // Update n to be the minimum column limit
        n = Math.min(n, colLimit);
    }

    // Return the area of the smallest rectangle
    return m * n;
};