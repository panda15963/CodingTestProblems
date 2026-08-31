/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

/**
 * Finds the minimum and maximum distances between critical points in a linked list.
 * A critical point is a local maxima or local minima (value greater or less than both neighbors).
 * @param head - The head of the linked list
 * @returns An array [minDistance, maxDistance] between critical points, or [-1, -1] if less than 2 critical points exist
 */
function nodesBetweenCriticalPoints(head: ListNode | null): number[] {
    // Initialize result array with [minDistance, maxDistance]
    const result: number[] = [Infinity, 0];
  
    // Track the position of first and last critical points found
    let firstCriticalPoint: number = -1;
    let lastCriticalPoint: number = -1;
  
    // Traverse the linked list, checking each node with its neighbors
    let currentPosition: number = 0;
    while (head !== null && head.next !== null && head.next.next !== null) {
        // Get values of current node and its two successors
        const previousValue: number = head.val;
        const currentValue: number = head.next.val;
        const nextValue: number = head.next.next.val;
      
        // Check if current node (middle one) is a critical point
        const isLocalMinima: boolean = currentValue < Math.min(previousValue, nextValue);
        const isLocalMaxima: boolean = currentValue > Math.max(previousValue, nextValue);
      
        if (isLocalMinima || isLocalMaxima) {
            // If this is the first critical point found
            if (lastCriticalPoint < 0) {
                firstCriticalPoint = currentPosition;
                lastCriticalPoint = currentPosition;
            } else {
                // Update minimum distance between consecutive critical points
                result[0] = Math.min(result[0], currentPosition - lastCriticalPoint);
                // Update the last critical point position
                lastCriticalPoint = currentPosition;
                // Update maximum distance (distance from first to current critical point)
                result[1] = Math.max(result[1], lastCriticalPoint - firstCriticalPoint);
            }
        }
      
        // Move to next node
        head = head.next;
        currentPosition++;
    }
  
    // If less than 2 critical points were found, return [-1, -1]
    return firstCriticalPoint === lastCriticalPoint ? [-1, -1] : result;
}
