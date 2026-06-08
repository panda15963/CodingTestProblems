/**
 * Rearranges an array such that all elements less than pivot come first,
 * followed by all elements equal to pivot, followed by all elements greater than pivot.
 * The relative order of elements in each group is preserved.
 *
 * @param {number[]} nums - The input array of numbers to be rearranged
 * @param {number} pivot - The pivot value used for partitioning the array
 * @returns {number[]} A new array with elements rearranged around the pivot
 */
function pivotArray(nums, pivot) {
    const result = [];

    // First pass: Add all elements less than pivot
    for (const num of nums) {
        if (num < pivot) {
            result.push(num);
        }
    }

    // Second pass: Add all elements equal to pivot
    for (const num of nums) {
        if (num === pivot) {
            result.push(num);
        }
    }

    // Third pass: Add all elements greater than pivot
    for (const num of nums) {
        if (num > pivot) {
            result.push(num);
        }
    }

    return result;
}