/**
 * Determines if a given number is a perfect square using the binary search template.
 * Feasible condition: mid * mid >= num
 * We find the first value where this is true, then check if it's an exact match.
 *
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 */
function isPerfectSquare(num: number): boolean {
    let left = 1;
    let right = num;
    let firstTrueIndex = -1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (mid * mid >= num) {
            firstTrueIndex = mid;
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }

    // Check if the found value squared equals num exactly
    return firstTrueIndex !== -1 && firstTrueIndex * firstTrueIndex === num;
}
