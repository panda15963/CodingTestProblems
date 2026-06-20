/**
 * @param {number} n
 * @param {number[][]} restrictions
 * @return {number}
 */
var maxBuilding = function(n, restrictions) {
    restrictions.push([1, 0]);

    restrictions.sort((a, b) => a[0] - b[0]);

    if (restrictions[restrictions.length - 1][0] !== n) {
        restrictions.push([n, n - 1]);
    }

    const totalRestrictions = restrictions.length;

    // Forward pass
    for (let i = 1; i < totalRestrictions; ++i) {
        const currentPosition = restrictions[i][0];
        const previousPosition = restrictions[i - 1][0];
        const previousMaxHeight = restrictions[i - 1][1];
        const distance = currentPosition - previousPosition;

        restrictions[i][1] = Math.min(
            restrictions[i][1],
            previousMaxHeight + distance
        );
    }

    // Backward pass
    for (let i = totalRestrictions - 2; i >= 0; --i) {
        const currentPosition = restrictions[i][0];
        const nextPosition = restrictions[i + 1][0];
        const nextMaxHeight = restrictions[i + 1][1];
        const distance = nextPosition - currentPosition;

        restrictions[i][1] = Math.min(
            restrictions[i][1],
            nextMaxHeight + distance
        );
    }

    let maxHeight = 0;

    // Calculate maximum achievable height
    for (let i = 0; i < totalRestrictions - 1; ++i) {
        const leftPosition = restrictions[i][0];
        const leftHeight = restrictions[i][1];
        const rightPosition = restrictions[i + 1][0];
        const rightHeight = restrictions[i + 1][1];

        const distance = rightPosition - leftPosition;

        const peakHeight = Math.floor(
            (leftHeight + rightHeight + distance) / 2
        );

        maxHeight = Math.max(maxHeight, peakHeight);
    }

    return maxHeight;
};