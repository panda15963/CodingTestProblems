function maximumWeight(intervals) {
    // Add original index
    const indexedIntervals = intervals.map((interval, i) => ({
        left: interval[0],
        right: interval[1],
        weight: interval[2],
        originalIndex: i
    }));

    // Sort by left endpoint
    indexedIntervals.sort((a, b) => a.left - b.left);

    // memo[i][quota] = { weight, selected }
    const memo = Array.from(
        { length: indexedIntervals.length },
        () => Array(5).fill(null)
    );

    return dp(indexedIntervals, memo, 0, 4).selected;
}

function dp(intervals, memo, i, quota) {
    // No more intervals or quota is exhausted
    if (i === intervals.length || quota === 0) {
        return {
            weight: 0,
            selected: []
        };
    }

    // Return memoized result
    if (memo[i][quota] !== null) {
        return memo[i][quota];
    }

    // Option 1: Skip current interval
    const skip = dp(intervals, memo, i + 1, quota);

    const interval = intervals[i];

    // Find first non-overlapping interval
    const j = findFirstGreater(
        intervals,
        i + 1,
        interval.right
    );

    // Option 2: Pick current interval
    const nextRes = dp(
        intervals,
        memo,
        j,
        quota - 1
    );

    const newSelected = [
        ...nextRes.selected,
        interval.originalIndex
    ];

    // Sort original indices
    newSelected.sort((a, b) => a - b);

    const pick = {
        weight: interval.weight + nextRes.weight,
        selected: newSelected
    };

    // Choose the result with larger weight.
    // If weights are equal, choose lexicographically smaller indices.
    if (
        pick.weight > skip.weight ||
        (
            pick.weight === skip.weight &&
            compareLists(pick.selected, skip.selected) < 0
        )
    ) {
        memo[i][quota] = pick;
    } else {
        memo[i][quota] = skip;
    }

    return memo[i][quota];
}

// Find the first interval whose left > rightBoundary
function findFirstGreater(intervals, startFrom, rightBoundary) {
    let left = startFrom;
    let right = intervals.length;

    while (left < right) {
        const mid = Math.floor((left + right) / 2);

        if (intervals[mid].left > rightBoundary) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }

    return left;
}

// Lexicographical comparison
function compareLists(list1, list2) {
    const minSize = Math.min(
        list1.length,
        list2.length
    );

    for (let i = 0; i < minSize; ++i) {
        if (list1[i] !== list2[i]) {
            return list1[i] - list2[i];
        }
    }

    return list1.length - list2.length;
}