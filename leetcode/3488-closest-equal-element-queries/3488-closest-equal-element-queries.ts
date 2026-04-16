/**
 * Solves queries to find the minimum distance to the nearest duplicate element in a circular array
 * @param nums - The input array of numbers
 * @param queries - Array of indices to query
 * @returns Array of minimum distances for each query, -1 if no duplicate exists
 */
function solveQueries(nums: number[], queries: number[]): number[] {
    const arrayLength: number = nums.length;
    const doubledLength: number = arrayLength * 2;

    // Initialize distance array with maximum possible value (doubledLength)
    const minDistances: number[] = Array(doubledLength).fill(doubledLength);

    // First pass: Calculate minimum distance to duplicate on the left
    // Map to store the last seen position of each element
    const lastSeenPositionLeft: Map<number, number> = new Map<number, number>();

    for (let i = 0; i < doubledLength; i++) {
        const currentElement: number = nums[i % arrayLength];

        // If we've seen this element before, calculate distance from last occurrence
        if (lastSeenPositionLeft.has(currentElement)) {
            const previousPosition: number = lastSeenPositionLeft.get(currentElement)!;
            minDistances[i] = Math.min(minDistances[i], i - previousPosition);
        }

        // Update last seen position for current element
        lastSeenPositionLeft.set(currentElement, i);
    }

    // Second pass: Calculate minimum distance to duplicate on the right
    // Map to store the next seen position of each element
    const nextSeenPositionRight: Map<number, number> = new Map<number, number>();

    for (let i = doubledLength - 1; i >= 0; i--) {
        const currentElement: number = nums[i % arrayLength];

        // If we've seen this element in future positions, calculate distance to next occurrence
        if (nextSeenPositionRight.has(currentElement)) {
            const nextPosition: number = nextSeenPositionRight.get(currentElement)!;
            minDistances[i] = Math.min(minDistances[i], nextPosition - i);
        }

        // Update next seen position for current element
        nextSeenPositionRight.set(currentElement, i);
    }

    // Merge results from doubled array back to original array size
    // Take minimum distance from both cycles for each position
    for (let i = 0; i < arrayLength; i++) {
        minDistances[i] = Math.min(minDistances[i], minDistances[i + arrayLength]);
    }

    // Process queries and return results
    // Return -1 if distance is greater than or equal to array length (no duplicate found)
    return queries.map((queryIndex: number) =>
        minDistances[queryIndex] >= arrayLength ? -1 : minDistances[queryIndex]
    );
}
