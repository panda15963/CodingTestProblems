/**
 * Finds the smallest common element between two sorted arrays
 * @param {number[]} nums1 - First sorted array in non-decreasing order
 * @param {number[]} nums2 - Second sorted array in non-decreasing order
 * @returns {number} The minimum common element if exists, otherwise -1
 */
function getCommon(nums1, nums2) {
    const firstArrayLength = nums1.length;
    const secondArrayLength = nums2.length;

    let firstArrayIndex = 0;
    let secondArrayIndex = 0;

    while (firstArrayIndex < firstArrayLength && secondArrayIndex < secondArrayLength) {
        if (nums1[firstArrayIndex] === nums2[secondArrayIndex]) {
            return nums1[firstArrayIndex];
        }

        if (nums1[firstArrayIndex] < nums2[secondArrayIndex]) {
            firstArrayIndex++;
        } else {
            secondArrayIndex++;
        }
    }

    return -1;
}