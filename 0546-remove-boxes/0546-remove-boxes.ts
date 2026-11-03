function removeBoxes(boxes: number[]): number {
    const n = boxes.length;
    const dp: number[][][] = Array.from(
        { length: n },
        () => Array.from(
            { length: n },
            () => Array(n).fill(0)
        )
    );

    const calculateMaxPoints = (
        left: number,
        right: number,
        extraCount: number
    ): number => {
        if (left > right) {
            return 0;
        }

        while (left < right && boxes[right] === boxes[right - 1]) {
            right--;
            extraCount++;
        }

        if (dp[left][right][extraCount] > 0) {
            return dp[left][right][extraCount];
        }

        let maxPoints =
            calculateMaxPoints(left, right - 1, 0) +
            (extraCount + 1) * (extraCount + 1);

        for (let mid = left; mid < right; mid++) {
            if (boxes[mid] === boxes[right]) {
                const points =
                    calculateMaxPoints(mid + 1, right - 1, 0) +
                    calculateMaxPoints(left, mid, extraCount + 1);

                maxPoints = Math.max(maxPoints, points);
            }
        }

        dp[left][right][extraCount] = maxPoints;

        return maxPoints;
    };

    return calculateMaxPoints(0, n - 1, 0);
}