/**
 * Finds the smallest common element between two sorted arrays
 * @param nums1 - First sorted array in non-decreasing order
 * @param nums2 - Second sorted array in non-decreasing order
 * @returns The minimum common element if exists, otherwise -1
 */
function getCommon(nums1: number[], nums2: number[]): number {
    // Get the lengths of both arrays
    const firstArrayLength: number = nums1.length;
    const secondArrayLength: number = nums2.length;

    // Initialize two pointers for traversing both arrays
    let firstArrayIndex: number = 0;
    let secondArrayIndex: number = 0;

    // Use two-pointer technique to find common element
    while (firstArrayIndex < firstArrayLength && secondArrayIndex < secondArrayLength) {
        // Found a common element - return it immediately (will be the smallest due to sorted arrays)
        if (nums1[firstArrayIndex] === nums2[secondArrayIndex]) {
            return nums1[firstArrayIndex];
        }

        // Move the pointer pointing to the smaller element
        if (nums1[firstArrayIndex] < nums2[secondArrayIndex]) {
            // Current element in first array is smaller, move to next element
            firstArrayIndex++;
        } else {
            // Current element in second array is smaller, move to next element
            secondArrayIndex++;
        }
    }

    // No common element found
    return -1;
}