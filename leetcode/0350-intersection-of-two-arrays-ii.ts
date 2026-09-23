/**
 * Finds the intersection of two arrays, including duplicates.
 * Each element in the result appears as many times as it shows up in both arrays.
 * @param nums1 - First input array
 * @param nums2 - Second input array
 * @returns Array containing the intersection of nums1 and nums2
 */
function intersect(nums1: number[], nums2: number[]): number[] {
    // Create a frequency map to count occurrences of each number in nums1
    const frequencyMap: Record<number, number> = {};

    // Count the frequency of each number in the first array
    for (const num of nums1) {
        frequencyMap[num] = (frequencyMap[num] || 0) + 1;
    }

    // Array to store the intersection result
    const result: number[] = [];

    // Iterate through the second array and check for common elements
    for (const num of nums2) {
        // If the current number exists in the frequency map with count > 0
        if (frequencyMap[num] > 0) {
            // Add it to the result and decrement its count
            result.push(num);
            frequencyMap[num]--;
        }
    }

    return result;
}
