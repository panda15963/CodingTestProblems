/**
 * Finds the minimum number of jumps to reach the last index of the array.
 * You can jump to index i-1, i+1, or any index j where arr[i] === arr[j].
 * 
 * @param arr - The input array of numbers
 * @returns The minimum number of jumps to reach the last index
 */
function minJumps(arr: number[]): number {
    // Map to store indices grouped by their values for same-value jumps
    const valueToIndicesMap: Map<number, number[]> = new Map();
    const arrayLength = arr.length;
  
    // Build the map: each value points to all indices where it appears
    for (let index = 0; index < arrayLength; index++) {
        if (!valueToIndicesMap.has(arr[index])) {
            valueToIndicesMap.set(arr[index], []);
        }
        valueToIndicesMap.get(arr[index])!.push(index);
    }
  
    // BFS queue starting from index 0
    let currentLevelQueue: number[] = [0];
  
    // Track visited indices to avoid revisiting
    const visited: boolean[] = Array(arrayLength).fill(false);
    visited[0] = true;
  
    // BFS traversal level by level
    for (let jumpCount = 0; ; jumpCount++) {
        const nextLevelQueue: number[] = [];
      
        // Process all indices in the current level
        for (const currentIndex of currentLevelQueue) {
            // Check if we've reached the target (last index)
            if (currentIndex === arrayLength - 1) {
                return jumpCount;
            }
          
            // Jump to all indices with the same value
            for (const sameValueIndex of valueToIndicesMap.get(arr[currentIndex])!) {
                if (!visited[sameValueIndex]) {
                    visited[sameValueIndex] = true;
                    nextLevelQueue.push(sameValueIndex);
                }
            }
          
            // Clear the same-value indices to avoid redundant checks in future iterations
            valueToIndicesMap.get(arr[currentIndex])!.length = 0;
          
            // Jump to adjacent indices (left and right neighbors)
            for (const adjacentIndex of [currentIndex - 1, currentIndex + 1]) {
                if (adjacentIndex >= 0 && adjacentIndex < arrayLength && !visited[adjacentIndex]) {
                    visited[adjacentIndex] = true;
                    nextLevelQueue.push(adjacentIndex);
                }
            }
        }
      
        // Move to the next level
        currentLevelQueue = nextLevelQueue;
    }
}