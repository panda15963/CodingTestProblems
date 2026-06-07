function solution(strArr) {
    const groupCounts = new Map();

    for (const str of strArr) {
        const length = str.length;
        groupCounts.set(length, (groupCounts.get(length) || 0) + 1);
    }

    let maxCount = 0;

    for (const count of groupCounts.values()) {
        if (count > maxCount) {
            maxCount = count;
        }
    }

    return maxCount;
}