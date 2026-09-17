var minSumOfLengths = function(arr, target) {
    const prefixSumToIndex = new Map();
    prefixSumToIndex.set(0, 0);

    const n = arr.length;
    const INFINITY = 1 << 30;

    const minLengthUpToIndex = new Array(n + 1).fill(INFINITY);

    let prefixSum = 0;
    let minTotalLength = INFINITY;

    for (let i = 1; i <= n; ++i) {
        const currentValue = arr[i - 1];
        prefixSum += currentValue;

        minLengthUpToIndex[i] = minLengthUpToIndex[i - 1];

        if (prefixSumToIndex.has(prefixSum - target)) {
            const startIndex = prefixSumToIndex.get(prefixSum - target);
            const currentSubarrayLength = i - startIndex;

            minLengthUpToIndex[i] = Math.min(
                minLengthUpToIndex[i],
                currentSubarrayLength
            );

            minTotalLength = Math.min(
                minTotalLength,
                minLengthUpToIndex[startIndex] + currentSubarrayLength
            );
        }

        prefixSumToIndex.set(prefixSum, i);
    }

    return minTotalLength > n ? -1 : minTotalLength;
};