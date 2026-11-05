/**
 * Finds the distance value between two arrays
 * Distance value is the number of elements in arr1 such that there is no element in arr2
 * where |arr1[i] - arr2[j]| <= d
 *
 * @param arr1 - First array of numbers
 * @param arr2 - Second array of numbers
 * @param d - The distance threshold
 * @returns The count of elements in arr1 that satisfy the distance condition
 */
function findTheDistanceValue(arr1: number[], arr2: number[], d: number): number {
    // Sort arr2 in ascending order for binary search
    arr2.sort((a, b) => a - b);

    let count: number = 0;

    // Check each element in arr1
    for (const element of arr1) {
        // Find the insertion point for (element - d) in sorted arr2
        // This gives us the index of the first element >= (element - d)
        const index = binarySearchInsertionPoint(arr2, element - d);

        // If index is at the end of arr2 or the element at index is greater than (element + d),
        // then no element in arr2 is within distance d of current element
        if (index === arr2.length || arr2[index] > element + d) {
            count++;
        }
    }

    return count;
}

/**
 * Binary search to find the first index where element >= target in a sorted array.
 * Uses the standard binary search template with first_true_index tracking.
 *
 * The feasible condition is: sortedArray[mid] >= target
 * This creates a pattern like: [false, false, false, true, true, true, ...]
 * We want to find the first true index.
 *
 * @param sortedArray - The sorted array to search in
 * @param target - The value to find insertion point for
 * @returns The index of first element >= target, or array length if none exists
 */
function binarySearchInsertionPoint(sortedArray: number[], target: number): number {
    let left: number = 0;
    let right: number = sortedArray.length - 1;
    let firstTrueIndex: number = sortedArray.length; // Default: not found, return length

    while (left <= right) {
        const mid: number = Math.floor((left + right) / 2);

        // Feasible condition: is sortedArray[mid] >= target?
        if (sortedArray[mid] >= target) {
            firstTrueIndex = mid;  // Record this valid position
            right = mid - 1;       // Look for earlier valid position
        } else {
            left = mid + 1;        // Need larger values
        }
    }

    return firstTrueIndex;
}
