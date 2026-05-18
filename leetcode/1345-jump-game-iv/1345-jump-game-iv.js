/**
 * Finds the minimum number of jumps to reach the last index of the array.
 * You can jump to index i-1, i+1, or any index j where arr[i] === arr[j].
 *
 * @param {number[]} arr
 * @returns {number}
 */
function minJumps(arr) {
    const valueToIndicesMap = new Map();
    const arrayLength = arr.length;

    // Build map
    for (let i = 0; i < arrayLength; i++) {
        if (!valueToIndicesMap.has(arr[i])) {
            valueToIndicesMap.set(arr[i], []);
        }
        valueToIndicesMap.get(arr[i]).push(i);
    }

    let currentLevelQueue = [0];
    const visited = new Array(arrayLength).fill(false);
    visited[0] = true;

    for (let jumpCount = 0; ; jumpCount++) {
        const nextLevelQueue = [];

        for (const currentIndex of currentLevelQueue) {
            if (currentIndex === arrayLength - 1) {
                return jumpCount;
            }

            // Same value jumps
            const sameValueIndices = valueToIndicesMap.get(arr[currentIndex]) || [];
            for (const idx of sameValueIndices) {
                if (!visited[idx]) {
                    visited[idx] = true;
                    nextLevelQueue.push(idx);
                }
            }

            // Clear to avoid redundant processing
            valueToIndicesMap.set(arr[currentIndex], []);

            // Adjacent jumps
            for (const next of [currentIndex - 1, currentIndex + 1]) {
                if (next >= 0 && next < arrayLength && !visited[next]) {
                    visited[next] = true;
                    nextLevelQueue.push(next);
                }
            }
        }

        currentLevelQueue = nextLevelQueue;
    }
}