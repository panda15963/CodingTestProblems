function solution(arr, l, r) {
    const ranges = buildRanges(arr);
    const W = r - l + 1;
    const totalLength = ranges[ranges.length - 1].end + 1;
    const maxStart = totalLength - W;

    const K = getRangeSum(ranges, l - 1, r - 1);

    let count = 0;
    let currentSum = getRangeSum(ranges, 0, W - 1);

    let start = 0;
    let leftRun = 0;
    let rightRun = findRunIndex(ranges, W);

    while (start < maxStart) {
        const outValue = ranges[leftRun].value;
        const inValue = ranges[rightRun].value;
        const diff = inValue - outValue;

        const moveCount = Math.min(
            ranges[leftRun].end - start + 1,
            ranges[rightRun].end - (start + W) + 1,
            maxStart - start
        );

        count += countMatches(currentSum, diff, moveCount, K);

        currentSum += diff * moveCount;
        start += moveCount;

        while (leftRun < ranges.length && ranges[leftRun].end < start) {
            leftRun++;
        }

        while (rightRun < ranges.length && ranges[rightRun].end < start + W) {
            rightRun++;
        }
    }

    if (currentSum === K) {
        count++;
    }

    return [K, count];
}

function buildRanges(arr) {
    const ranges = [];
    let start = 0;

    for (const value of arr) {
        const end = start + value - 1;
        ranges.push({ start, end, value });
        start = end + 1;
    }

    return ranges;
}

function getRangeSum(ranges, startIndex, endIndex) {
    let sum = 0;

    for (const { start, end, value } of ranges) {
        const overlapStart = Math.max(start, startIndex);
        const overlapEnd = Math.min(end, endIndex);

        if (overlapStart <= overlapEnd) {
            sum += (overlapEnd - overlapStart + 1) * value;
        }
    }

    return sum;
}

function findRunIndex(ranges, position) {
    let left = 0;
    let right = ranges.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);

        if (position < ranges[mid].start) {
            right = mid - 1;
        } else if (position > ranges[mid].end) {
            left = mid + 1;
        } else {
            return mid;
        }
    }

    return -1;
}

function countMatches(startValue, diff, terms, target) {
    if (terms <= 0) return 0;

    if (diff === 0) {
        return startValue === target ? terms : 0;
    }

    const delta = target - startValue;

    if (delta % diff !== 0) return 0;

    const t = delta / diff;

    return t >= 0 && t < terms ? 1 : 0;
}