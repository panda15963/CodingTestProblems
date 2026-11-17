/**
 * Counts the number of valid triangles that can be formed from the given array of numbers.
 * A valid triangle must satisfy: sum of any two sides > third side
 *
 * @param nums - Array of positive integers representing potential triangle sides
 * @returns Number of valid triangles that can be formed
 */
function triangleNumber(nums: number[]): number {
    // Sort the array in ascending order to enable two-pointer technique
    nums.sort((a: number, b: number) => a - b);

    const arrayLength: number = nums.length;
    let validTriangleCount: number = 0;

    // Iterate from the largest element as the longest side of potential triangles
    for (let longestSideIndex: number = arrayLength - 1; longestSideIndex >= 2; longestSideIndex--) {
        let leftPointer: number = 0;
        let rightPointer: number = longestSideIndex - 1;

        // Use two pointers to find all valid pairs that can form a triangle with nums[longestSideIndex]
        while (leftPointer < rightPointer) {
            // Check if current pair forms a valid triangle with the longest side
            if (nums[leftPointer] + nums[rightPointer] > nums[longestSideIndex]) {
                // All pairs from (leftPointer, rightPointer) to (rightPointer-1, rightPointer) are valid
                // because the array is sorted and nums[leftPointer+1...rightPointer-1] + nums[rightPointer]
                // will also be greater than nums[longestSideIndex]
                validTriangleCount += rightPointer - leftPointer;
                rightPointer--;
            } else {
                // Sum is too small, need a larger value from the left side
                leftPointer++;
            }
        }
    }

    return validTriangleCount;
}
