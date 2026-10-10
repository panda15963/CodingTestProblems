var minSumSquareDiff = function(nums1, nums2, k1, k2) {
    const n = nums1.length;
    const differences = new Array(n);

    let totalSum = 0;
    let maxDiff = 0;
    let totalOperations = k1 + k2;

    for (let i = 0; i < n; i++) {
        differences[i] = Math.abs(nums1[i] - nums2[i]);
        totalSum += differences[i];
        maxDiff = Math.max(maxDiff, differences[i]);
    }

    if (totalSum <= totalOperations) {
        return 0;
    }

    const feasible = (target) => {
        let operationsNeeded = 0;

        for (const val of differences) {
            operationsNeeded += Math.max(val - target, 0);
        }

        return operationsNeeded <= totalOperations;
    };

    let left = 0;
    let right = maxDiff - 1;
    let firstTrueIndex = maxDiff;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);

        if (feasible(mid)) {
            firstTrueIndex = mid;
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }

    const optimalThreshold = firstTrueIndex;

    for (let i = 0; i < n; i++) {
        const reduction = Math.max(
            0,
            differences[i] - optimalThreshold
        );

        totalOperations -= reduction;
        differences[i] = Math.min(
            differences[i],
            optimalThreshold
        );
    }

    for (let i = 0; i < n && totalOperations > 0; i++) {
        if (differences[i] === optimalThreshold) {
            totalOperations--;
            differences[i]--;
        }
    }

    let result = 0;

    for (const val of differences) {
        result += val * val;
    }

    return result;
};