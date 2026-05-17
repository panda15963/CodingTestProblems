/**
 * Determines if we can reach any index with value 0 in the array
 * Starting from the given index, we can jump left or right by the value at current index
 * @param arr - The input array of non-negative integers
 * @param start - The starting index position
 * @returns true if we can reach an index with value 0, false otherwise
 */
function canReach(arr: number[], start: number): boolean {
    // Initialize queue with the starting position for BFS traversal
    const queue: number[] = [start];
  
    // Process each position in the queue
    for (const currentIndex of queue) {
        // Check if we've reached a position with value 0 (target reached)
        if (arr[currentIndex] === 0) {
            return true;
        }
      
        // Skip if position is already visited (marked as -1) or out of bounds
        if (arr[currentIndex] === -1 || arr[currentIndex] === undefined) {
            continue;
        }
      
        // Add next possible positions to queue:
        // Jump forward: currentIndex + arr[currentIndex]
        // Jump backward: currentIndex - arr[currentIndex]
        queue.push(currentIndex + arr[currentIndex], currentIndex - arr[currentIndex]);
      
        // Mark current position as visited by setting it to -1
        arr[currentIndex] = -1;
    }
  
    // No path to a position with value 0 was found
    return false;
}