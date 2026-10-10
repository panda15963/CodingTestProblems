type ll = number;

function minSumSquareDiff(nums1: number[], nums2: number[], k1: number, k2: number): number {
    const n: number = nums1.length;
    const differences: number[] = new Array(n);
    let totalSum: ll = 0;
    let maxDiff: number = 0;
    let totalOperations: number = k1 + k2;

    // Calculate absolute differences and find maximum difference
    for (let i = 0; i < n; i++) {
        differences[i] = Math.abs(nums1[i] - nums2[i]);
        totalSum += differences[i];
        maxDiff = Math.max(maxDiff, differences[i]);
    }

    // If we can reduce all differences to 0, return 0
    if (totalSum <= totalOperations) {
        return 0;
    }

    // Feasible function: can we reduce all differences to at most 'target'?
    const feasible = (target: number): boolean => {
        let operationsNeeded: ll = 0;
        for (const val of differences) {
            operationsNeeded += Math.max(val - target, 0);
        }
        return operationsNeeded <= totalOperations;
    };

    // Binary search using the template to find the optimal threshold
    let left: number = 0;
    let right: number = maxDiff - 1;
    let firstTrueIndex: number = maxDiff;  // Default if no smaller threshold is feasible

    while (left <= right) {
        const mid: number = Math.floor((left + right) / 2);
        if (feasible(mid)) {
            firstTrueIndex = mid;
            right = mid - 1;  // Try to find smaller threshold
        } else {
            left = mid + 1;
        }
    }

    const optimalThreshold: number = firstTrueIndex;

    // Reduce all differences greater than threshold to threshold
    for (let i = 0; i < n; i++) {
        const reduction: number = Math.max(0, differences[i] - optimalThreshold);
        totalOperations -= reduction;
        differences[i] = Math.min(differences[i], optimalThreshold);
    }

    // Use remaining operations to further reduce values at threshold
    // This distributes remaining operations evenly
    for (let i = 0; i < n && totalOperations > 0; i++) {
        if (differences[i] === optimalThreshold) {
            totalOperations--;
            differences[i]--;
        }
    }

    // Calculate the sum of squares of final differences
    let result: ll = 0;
    for (const val of differences) {
        result += val * val;
    }

    return result;
}
