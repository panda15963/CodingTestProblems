/**
 * Finds the maximum distance between valid index pairs (i, j) where:
 * - i <= j
 * - nums1[i] <= nums2[j]
 * The distance is defined as j - i
 *
 * @param nums1 - First non-increasing array
 * @param nums2 - Second non-increasing array
 * @returns The maximum distance between valid pairs
 */
function maxDistance(nums1: number[], nums2: number[]): number {
    let maxDistanceFound: number = 0;
    const n1: number = nums1.length;
    const n2: number = nums2.length;

    for (let i = 0; i < n1; i++) {
        const value: number = nums1[i];

        // Binary search to find the first index j where nums2[j] < value
        // Using the standard template: find first true index
        let left: number = i;
        let right: number = n2 - 1;
        let firstTrueIndex: number = -1;

        while (left <= right) {
            const mid: number = Math.floor((left + right) / 2);
            if (nums2[mid] < value) {  // feasible condition: pair becomes invalid
                firstTrueIndex = mid;
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        }

        // Calculate the last valid j
        let lastValidJ: number;
        if (firstTrueIndex === -1) {
            // All positions from i to end are valid
            lastValidJ = n2 - 1;
        } else {
            // Last valid position is one before first invalid
            lastValidJ = firstTrueIndex - 1;
        }

        // Update maximum distance if valid pair exists
        if (lastValidJ >= i) {
            maxDistanceFound = Math.max(maxDistanceFound, lastValidJ - i);
        }
    }

    return maxDistanceFound;
}
