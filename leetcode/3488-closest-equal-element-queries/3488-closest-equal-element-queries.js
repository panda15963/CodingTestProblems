/**
 * Solves queries to find the minimum distance to the nearest duplicate element in a circular array
 * @param nums - The input array of numbers
 * @param queries - Array of indices to query
 * @returns Array of minimum distances for each query, -1 if no duplicate exists
 */
function solveQueries(nums, queries) {
    const arrayLength = nums.length;
    const doubledLength = arrayLength * 2;

    // Initialize distance array with maximum possible value (doubledLength)
    const minDistances = Array(doubledLength).fill(doubledLength);

    // First pass: Calculate minimum distance to duplicate on the left
    // Map to store the last seen position of each element
    const lastSeenPositionLeft = new Map();

    for (let i = 0; i < doubledLength; i++) {
        const currentElement = nums[i % arrayLength];

        // If we've seen this element before, calculate distance from last occurrence
        if (lastSeenPositionLeft.has(currentElement)) {
            const previousPosition = lastSeenPositionLeft.get(currentElement);
            minDistances[i] = Math.min(minDistances[i], i - previousPosition);
        }

        // Update last seen position for current element
        lastSeenPositionLeft.set(currentElement, i);
    }

    // Second pass: Calculate minimum distance to duplicate on the right
    // Map to store the next seen position of each element
    const nextSeenPositionRight = new Map();

    for (let i = doubledLength - 1; i >= 0; i--) {
        const currentElement = nums[i % arrayLength];

        // If we've seen this element in future positions, calculate distance to next occurrence
        if (nextSeenPositionRight.has(currentElement)) {
            const nextPosition = nextSeenPositionRight.get(currentElement);
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
    return queries.map((queryIndex) =>
        minDistances[queryIndex] >= arrayLength ? -1 : minDistances[queryIndex]
    );
}