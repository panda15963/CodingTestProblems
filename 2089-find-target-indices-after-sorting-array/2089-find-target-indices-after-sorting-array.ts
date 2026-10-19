/**
 * Finds all indices of target value in sorted array
 * @param nums - Array of integers to search through
 * @param target - Target value to find indices for
 * @returns Array of indices where target appears in sorted array
 */
function targetIndices(nums: number[], target: number): number[] {
    // Sort the array in ascending order
    nums.sort((a: number, b: number) => a - b);

    // Initialize result array to store indices
    const result: number[] = [];

    // Iterate through sorted array to find all occurrences of target
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] === target) {
            result.push(i);
        }
    }

    return result;
}
