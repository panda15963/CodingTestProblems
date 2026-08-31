/**
 * Definition for singly-linked list.
 * class ListNode {
 *     constructor(val = 0, next = null) {
 *         this.val = val;
 *         this.next = next;
 *     }
 * }
 */

/**
 * Finds the minimum and maximum distances between critical points
 * in a linked list.
 *
 * @param {ListNode | null} head
 * @return {number[]}
 */
function nodesBetweenCriticalPoints(head) {
    // [minimum distance, maximum distance]
    const result = [Infinity, 0];

    // First and last critical point positions
    let firstCriticalPoint = -1;
    let lastCriticalPoint = -1;

    // Current position
    let currentPosition = 0;

    // Check nodes that have both previous and next nodes
    while (
        head !== null &&
        head.next !== null &&
        head.next.next !== null
    ) {
        const previousValue = head.val;
        const currentValue = head.next.val;
        const nextValue = head.next.next.val;

        // Local minimum
        const isLocalMinima =
            currentValue < Math.min(previousValue, nextValue);

        // Local maximum
        const isLocalMaxima =
            currentValue > Math.max(previousValue, nextValue);

        if (isLocalMinima || isLocalMaxima) {
            // First critical point
            if (lastCriticalPoint < 0) {
                firstCriticalPoint = currentPosition;
                lastCriticalPoint = currentPosition;
            } else {
                // Minimum distance between consecutive critical points
                result[0] = Math.min(
                    result[0],
                    currentPosition - lastCriticalPoint
                );

                // Update last critical point
                lastCriticalPoint = currentPosition;

                // Maximum distance between first and last
                result[1] = Math.max(
                    result[1],
                    lastCriticalPoint - firstCriticalPoint
                );
            }
        }

        head = head.next;
        currentPosition++;
    }

    // Fewer than two critical points
    if (firstCriticalPoint === lastCriticalPoint) {
        return [-1, -1];
    }

    return result;
}