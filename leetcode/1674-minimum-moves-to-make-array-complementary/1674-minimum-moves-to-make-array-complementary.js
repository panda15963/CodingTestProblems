/**
 * Finds the minimum number of moves to make all pairs sum to the same value
 * @param {number[]} nums - Array of integers
 * @param {number} limit - Maximum value any element can be changed to (1 to limit)
 * @returns {number} Minimum number of moves required
 */
function minMoves(nums, limit) {
    const arrayLength = nums.length;

    // Difference array to track cost changes at different sum values
    // Size is 2*limit+2 to handle all possible sums (2 to 2*limit)
    const differenceArray = Array(limit * 2 + 2).fill(0);

    // Process each pair from both ends of the array
    for (let i = 0; i < (arrayLength >> 1); ++i) {
        // Get the pair elements from opposite ends
        const minValue = Math.min(nums[i], nums[arrayLength - 1 - i]);
        const maxValue = Math.max(nums[i], nums[arrayLength - 1 - i]);

        // [2, minValue]: requires 2 moves
        differenceArray[2] += 2;
        differenceArray[minValue + 1] -= 2;

        // [minValue+1, minValue+maxValue-1]: requires 1 move
        differenceArray[minValue + 1] += 1;
        differenceArray[minValue + maxValue] -= 1;

        // [minValue+maxValue+1, maxValue+limit]: requires 1 move
        differenceArray[minValue + maxValue + 1] += 1;
        differenceArray[maxValue + limit + 1] -= 1;

        // [maxValue+limit+1, 2*limit]: requires 2 moves
        differenceArray[maxValue + limit + 1] += 2;
    }

    // Find the minimum cost using prefix sum
    let answer = arrayLength;
    let currentCost = 0;

    for (let targetSum = 2; targetSum < differenceArray.length; ++targetSum) {
        currentCost += differenceArray[targetSum];
        answer = Math.min(answer, currentCost);
    }

    return answer;
}