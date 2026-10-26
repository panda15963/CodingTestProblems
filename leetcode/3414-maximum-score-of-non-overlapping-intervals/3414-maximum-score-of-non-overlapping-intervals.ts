interface Interval {
    left: number;
    right: number;
    weight: number;
    originalIndex: number;
}

interface Result {
    weight: number;
    selected: number[];
}

function maximumWeight(intervals: number[][]): number[] {
    // Add original index
    const indexedIntervals: Interval[] = intervals.map(
        (interval, i) => ({
            left: interval[0],
            right: interval[1],
            weight: interval[2],
            originalIndex: i
        })
    );

    // Sort by left endpoint
    indexedIntervals.sort((a, b) => a.left - b.left);

    // memo[i][quota] = result
    const memo: (Result | null)[][] = Array.from(
        { length: indexedIntervals.length },
        () => Array<Result | null>(5).fill(null)
    );

    return dp(indexedIntervals, memo, 0, 4).selected;
}

function dp(
    intervals: Interval[],
    memo: (Result | null)[][],
    i: number,
    quota: number
): Result {
    // No more intervals or quota is exhausted
    if (i === intervals.length || quota === 0) {
        return {
            weight: 0,
            selected: []
        };
    }

    // Return memoized result
    if (memo[i][quota] !== null) {
        return memo[i][quota]!;
    }

    // Option 1: Skip current interval
    const skip = dp(
        intervals,
        memo,
        i + 1,
        quota
    );

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

    const newSelected: number[] = [
        ...nextRes.selected,
        interval.originalIndex
    ];

    // Sort original indices
    newSelected.sort((a, b) => a - b);

    const pick: Result = {
        weight: interval.weight + nextRes.weight,
        selected: newSelected
    };

    // Choose larger weight.
    // If weights are equal, choose lexicographically smaller indices.
    if (
        pick.weight > skip.weight ||
        (
            pick.weight === skip.weight &&
            compareLists(
                pick.selected,
                skip.selected
            ) < 0
        )
    ) {
        memo[i][quota] = pick;
    } else {
        memo[i][quota] = skip;
    }

    return memo[i][quota]!;
}

// Find the first interval whose left > rightBoundary
function findFirstGreater(
    intervals: Interval[],
    startFrom: number,
    rightBoundary: number
): number {
    let left: number = startFrom;
    let right: number = intervals.length;

    while (left < right) {
        const mid: number = Math.floor(
            (left + right) / 2
        );

        if (intervals[mid].left > rightBoundary) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }

    return left;
}

// Lexicographical comparison
function compareLists(
    list1: number[],
    list2: number[]
): number {
    const minSize: number = Math.min(
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