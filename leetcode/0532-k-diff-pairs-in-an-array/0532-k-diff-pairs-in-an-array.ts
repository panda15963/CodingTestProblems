/**
 * Finds the number of unique k-diff pairs in the array.
 * A k-diff pair is defined as an integer pair (nums[i], nums[j]) where:
 * - i != j
 * - nums[i] - nums[j] = k
 *
 * @param nums - The input array of integers
 * @param k - The target difference value
 * @returns The number of unique k-diff pairs
 */
function findPairs(nums: number[], k: number): number {
    // Set to store unique smaller values of valid pairs to avoid duplicates
    const uniquePairStarts = new Set<number>();

    // Set to track all numbers we've seen so far
    const visitedNumbers = new Set<number>();

    // Iterate through each number in the array
    for (const currentNum of nums) {
        // Check if (currentNum - k, currentNum) forms a valid pair
        // If currentNum - k was seen before, then we have a pair
        if (visitedNumbers.has(currentNum - k)) {
            uniquePairStarts.add(currentNum - k);
        }

        // Check if (currentNum, currentNum + k) forms a valid pair
        // If currentNum + k was seen before, then we have a pair
        if (visitedNumbers.has(currentNum + k)) {
            uniquePairStarts.add(currentNum);
        }

        // Mark current number as visited
        visitedNumbers.add(currentNum);
    }

    // Return the count of unique pairs
    return uniquePairStarts.size;
}
