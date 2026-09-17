/**
 * Finds the minimum sum of lengths of two non-overlapping subarrays that each sum to target.
 * If no such subarrays exist, returns -1.
 *
 * @param arr - The input array of numbers
 * @param target - The target sum for each subarray
 * @returns The minimum sum of lengths of two valid subarrays, or -1 if not possible
 */
function minSumOfLengths(arr: number[], target: number): number {
    // Map to store prefix sum -> index mapping
    // Key: prefix sum value, Value: index position
    const prefixSumToIndex = new Map<number, number>();
    prefixSumToIndex.set(0, 0);

    let currentPrefixSum = 0;
    const arrayLength = arr.length;

    // Array to store minimum length of valid subarray ending at or before index i
    // minLengthUpTo[i] represents the minimum length of a valid subarray in arr[0...i-1]
    const minLengthUpTo: number[] = Array(arrayLength + 1);

    const INFINITY = 1 << 30; // Large value representing infinity
    minLengthUpTo[0] = INFINITY;

    let minSumOfTwoLengths = INFINITY;

    // Iterate through the array to find valid subarrays
    for (let i = 1; i <= arrayLength; ++i) {
        const currentValue = arr[i - 1];
        currentPrefixSum += currentValue;

        // Inherit the minimum length from previous position
        minLengthUpTo[i] = minLengthUpTo[i - 1];

        // Check if there exists a subarray ending at current position with sum = target
        // We need prefixSum[j] such that prefixSum[i] - prefixSum[j] = target
        // Therefore, prefixSum[j] = prefixSum[i] - target
        if (prefixSumToIndex.has(currentPrefixSum - target)) {
            const startIndex = prefixSumToIndex.get(currentPrefixSum - target)!;
            const currentSubarrayLength = i - startIndex;

            // Update minimum length of valid subarray up to current position
            minLengthUpTo[i] = Math.min(minLengthUpTo[i], currentSubarrayLength);

            // Try to combine with the best subarray before startIndex
            // to get minimum sum of two non-overlapping subarrays
            minSumOfTwoLengths = Math.min(
                minSumOfTwoLengths,
                minLengthUpTo[startIndex] + currentSubarrayLength
            );
        }

        // Store current prefix sum and its index
        prefixSumToIndex.set(currentPrefixSum, i);
    }

    // If no valid pair of subarrays found, return -1
    return minSumOfTwoLengths > arrayLength ? -1 : minSumOfTwoLengths;
}
