var removeBoxes = function(boxes) {
    const n = boxes.length;

    const dp = Array.from(
        { length: n },
        () => Array.from(
            { length: n },
            () => Array(n).fill(0)
        )
    );

    const calculateMaxPoints = (left, right, extraCount) => {
        if (left > right) {
            return 0;
        }

        // Merge consecutive boxes of the same color
        while (left < right && boxes[right] === boxes[right - 1]) {
            right--;
            extraCount++;
        }

        // Return memoized result
        if (dp[left][right][extraCount] > 0) {
            return dp[left][right][extraCount];
        }

        // Option 1: Remove the rightmost group
        let maxPoints =
            calculateMaxPoints(left, right - 1, 0) +
            (extraCount + 1) * (extraCount + 1);

        // Option 2: Merge boxes with the same color
        for (let mid = left; mid < right; mid++) {
            if (boxes[mid] === boxes[right]) {
                const points =
                    calculateMaxPoints(mid + 1, right - 1, 0) +
                    calculateMaxPoints(left, mid, extraCount + 1);

                maxPoints = Math.max(maxPoints, points);
            }
        }

        // Memoize the result
        dp[left][right][extraCount] = maxPoints;

        return maxPoints;
    };

    return calculateMaxPoints(0, n - 1, 0);
};