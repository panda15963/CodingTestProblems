/**
 * Finds the maximum possible value of an element in the array after applying operations:
 * 1. The first element must be 1
 * 2. The absolute difference between any two adjacent elements must be at most 1
 * 3. Elements can only be decreased or remain unchanged
 *
 * @param {number[]} arr - The input array of positive integers
 * @return {number}
 */
function maximumElementAfterDecrementingAndRearranging(arr) {
    // Sort the array in ascending order
    arr.sort((a, b) => a - b);

    // The first element must be 1
    arr[0] = 1;

    // Initialize the maximum element value
    let maxElement = 1;

    // Adjust the remaining elements
    for (let i = 1; i < arr.length; i++) {
        const decrementAmount = Math.max(0, arr[i] - arr[i - 1] - 1);

        arr[i] -= decrementAmount;

        maxElement = Math.max(maxElement, arr[i]);
    }

    return maxElement;
}