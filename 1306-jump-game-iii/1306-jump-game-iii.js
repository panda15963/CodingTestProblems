/**
 * Determines if we can reach any index with value 0 in the array
 * Starting from the given index, we can jump left or right by the value at current index
 * @param {number[]} arr - The input array of non-negative integers
 * @param {number} start - The starting index position
 * @returns {boolean} true if we can reach an index with value 0, false otherwise
 */
function canReach(arr, start) {
    const queue = [start];

    for (const currentIndex of queue) {
        if (arr[currentIndex] === 0) {
            return true;
        }

        if (arr[currentIndex] === -1 || arr[currentIndex] === undefined) {
            continue;
        }

        queue.push(
            currentIndex + arr[currentIndex],
            currentIndex - arr[currentIndex]
        );

        arr[currentIndex] = -1; // visited 표시
    }

    return false;
}