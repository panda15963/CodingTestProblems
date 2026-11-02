/**
 * Finds the number of unique k-diff pairs in the array.
 *
 * @param {number[]} nums - The input array of integers
 * @param {number} k - The target difference value
 * @return {number} The number of unique k-diff pairs
 */
var findPairs = function(nums, k) {
    const uniquePairStarts = new Set();
    const visitedNumbers = new Set();

    for (const currentNum of nums) {
        if (visitedNumbers.has(currentNum - k)) {
            uniquePairStarts.add(currentNum - k);
        }

        if (visitedNumbers.has(currentNum + k)) {
            uniquePairStarts.add(currentNum);
        }

        visitedNumbers.add(currentNum);
    }

    return uniquePairStarts.size;
};