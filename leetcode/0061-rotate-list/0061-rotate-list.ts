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
 * Rotates a linked list to the right by k positions.
 * @param head - The head of the linked list
 * @param k - The number of positions to rotate right
 * @returns The new head of the rotated linked list
 */
function rotateRight(head: ListNode | null, k: number): ListNode | null {
    // Handle edge cases: empty list or single node
    if (!head || !head.next) {
        return head;
    }
  
    // First pass: calculate the length of the linked list
    let current: ListNode | null = head;
    let listLength: number = 0;
  
    while (current) {
        current = current.next;
        listLength++;
    }
  
    // Optimize k by taking modulo with list length to avoid unnecessary rotations
    k = k % listLength;
  
    // If k is 0, no rotation needed
    if (k === 0) {
        return head;
    }
  
    // Use two pointers technique to find the rotation point
    let fastPointer: ListNode | null = head;
    let slowPointer: ListNode | null = head;
  
    // Move fast pointer k steps ahead
    while (k > 0) {
        fastPointer = fastPointer!.next;
        k--;
    }
  
    // Move both pointers until fast pointer reaches the last node
    while (fastPointer!.next) {
        fastPointer = fastPointer!.next;
        slowPointer = slowPointer!.next;
    }
  
    // Perform the rotation:
    // The new head is the node after slowPointer
    const newHead: ListNode | null = slowPointer!.next;
    // Break the link at the rotation point
    slowPointer!.next = null;
    // Connect the end of the list to the original head
    fastPointer!.next = head;
  
    return newHead;
}