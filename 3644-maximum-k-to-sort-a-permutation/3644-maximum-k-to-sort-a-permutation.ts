/**
 * Finds the bitwise AND of all elements that are not in their correct sorted position
 * @param nums - Array of numbers to check
 * @returns The bitwise AND result, or 0 if negative or no misplaced elements
 */
function sortPermutation(nums: number[]): number {
    // Initialize result with -1 (all bits set to 1)
    let bitwiseAndResult: number = -1;

    // Iterate through each element in the array
    for (let i = 0; i < nums.length; ++i) {
        // Check if current element is not at its expected position
        // (assuming the expected position is when nums[i] === i)
        if (i !== nums[i]) {
            // Perform bitwise AND with the misplaced element
            bitwiseAndResult &= nums[i];
        }
    }

    // Return the maximum between the result and 0
    // This ensures non-negative output
    return Math.max(bitwiseAndResult, 0);
}
