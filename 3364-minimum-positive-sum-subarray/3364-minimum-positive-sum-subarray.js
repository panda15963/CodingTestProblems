/**
 * @param {number[]} nums
 * @param {number} l
 * @param {number} r
 * @return {number}
 */
var minimumSumSubarray = function(nums, l, r) {
    const arrayLength = nums.length;
    let minimumSum = Infinity;

    // Iterate through all possible starting positions
    for (let startIndex = 0; startIndex < arrayLength; startIndex++) {
        let currentSum = 0;

        // Extend the subarray from the current starting position
        for (let endIndex = startIndex; endIndex < arrayLength; endIndex++) {
            currentSum += nums[endIndex];

            const subarrayLength = endIndex - startIndex + 1;

            // Check length constraints and positive sum
            if (
                subarrayLength >= l &&
                subarrayLength <= r &&
                currentSum > 0
            ) {
                minimumSum = Math.min(minimumSum, currentSum);
            }
        }
    }

    // Return -1 if no valid subarray was found
    return minimumSum === Infinity ? -1 : minimumSum;
};