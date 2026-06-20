/**
 * Finds the maximum height of the tallest building that can be built
 * given position restrictions
 * @param n - Total number of positions (1 to n)
 * @param restrictions - Array of [position, maxHeight] restrictions
 * @returns Maximum achievable building height
 */
function maxBuilding(n: number, restrictions: number[][]): number {
    // Add restriction for position 1 (must start at height 0)
    restrictions.push([1, 0]);
  
    // Sort restrictions by position in ascending order
    restrictions.sort((a, b) => a[0] - b[0]);
  
    // Add restriction for the last position if not already present
    // Maximum possible height at position n is n-1 (increasing by 1 each step from position 1)
    if (restrictions[restrictions.length - 1][0] !== n) {
        restrictions.push([n, n - 1]);
    }

    const totalRestrictions = restrictions.length;
  
    // Forward pass: Propagate height constraints from left to right
    // Each position's height is limited by the previous position's height plus the distance
    for (let i = 1; i < totalRestrictions; ++i) {
        const currentPosition = restrictions[i][0];
        const previousPosition = restrictions[i - 1][0];
        const previousMaxHeight = restrictions[i - 1][1];
        const distanceBetweenPositions = currentPosition - previousPosition;
      
        // Update current restriction based on what's reachable from the previous position
        restrictions[i][1] = Math.min(
            restrictions[i][1],
            previousMaxHeight + distanceBetweenPositions
        );
    }

    // Backward pass: Propagate height constraints from right to left
    // Ensure consistency with constraints coming from both directions
    for (let i = totalRestrictions - 2; i >= 0; --i) {
        const currentPosition = restrictions[i][0];
        const nextPosition = restrictions[i + 1][0];
        const nextMaxHeight = restrictions[i + 1][1];
        const distanceBetweenPositions = nextPosition - currentPosition;
      
        // Update current restriction based on what's reachable from the next position
        restrictions[i][1] = Math.min(
            restrictions[i][1],
            nextMaxHeight + distanceBetweenPositions
        );
    }

    let maxHeight = 0;
  
    // Calculate maximum achievable height between each pair of consecutive restrictions
    for (let i = 0; i < totalRestrictions - 1; ++i) {
        const leftPosition = restrictions[i][0];
        const leftHeight = restrictions[i][1];
        const rightPosition = restrictions[i + 1][0];
        const rightHeight = restrictions[i + 1][1];
        const distance = rightPosition - leftPosition;
      
        // Maximum height achievable between two restricted positions
        // occurs at the peak of a triangle formed by the two constraints
        const peakHeight = Math.floor(
            (leftHeight + rightHeight + distance) / 2
        );
      
        maxHeight = Math.max(maxHeight, peakHeight);
    }

    return maxHeight;
}
