var canCross = function(stones) {
    const stoneCount = stones.length;

    // Map to store stone position -> index
    const positionToIndex = new Map();

    for (let i = 0; i < stoneCount; i++) {
        positionToIndex.set(stones[i], i);
    }

    // Memoization table
    // -1: not computed
    //  0: cannot reach end
    //  1: can reach end
    const memo = Array.from(
        { length: stoneCount },
        () => new Array(stoneCount).fill(-1)
    );

    const depthFirstSearch = (currentIndex, lastJumpDistance) => {
        // Reached the last stone
        if (currentIndex === stoneCount - 1) {
            return true;
        }

        // Check memoization table
        if (memo[currentIndex][lastJumpDistance] !== -1) {
            return memo[currentIndex][lastJumpDistance] === 1;
        }

        // Try jumps of k - 1, k, k + 1
        for (
            let nextJumpDistance = lastJumpDistance - 1;
            nextJumpDistance <= lastJumpDistance + 1;
            nextJumpDistance++
        ) {
            if (nextJumpDistance > 0) {
                const targetPosition =
                    stones[currentIndex] + nextJumpDistance;

                if (positionToIndex.has(targetPosition)) {
                    const targetIndex =
                        positionToIndex.get(targetPosition);

                    if (
                        depthFirstSearch(
                            targetIndex,
                            nextJumpDistance
                        )
                    ) {
                        memo[currentIndex][lastJumpDistance] = 1;
                        return true;
                    }
                }
            }
        }

        memo[currentIndex][lastJumpDistance] = 0;
        return false;
    };

    // Start from the first stone with initial jump distance 0
    return depthFirstSearch(0, 0);
};