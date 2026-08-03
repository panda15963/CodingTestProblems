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
 * Reverses a portion of a linked list between positions left and right (1-indexed)
 *
 * @param {ListNode|null} head - The head of the linked list
 * @param {number} left - Starting position for reversal
 * @param {number} right - Ending position for reversal
 * @returns {ListNode|null} - Modified linked list head
 */
function reverseBetween(head, left, right) {
    // If no reversal needed
    if (left === right) {
        return head;
    }

    // Dummy node for handling left = 1 case
    const dummyNode = new ListNode(0, head);

    // Find node before reversal section
    let previousNode = null;
    let currentNode = dummyNode;

    for (let i = 0; i < left; i++) {
        previousNode = currentNode;
        currentNode = currentNode.next;
    }

    // Node before reversed part
    const connectionPoint = previousNode;

    // Reverse linked list section
    previousNode = null;

    const nodesToReverse = right - left;

    for (let i = 0; i <= nodesToReverse; i++) {
        const nextNode = currentNode.next;

        // Reverse pointer
        currentNode.next = previousNode;

        // Move forward
        previousNode = currentNode;
        currentNode = nextNode;
    }

    // Connect reversed part with remaining list
    connectionPoint.next.next = currentNode;

    // Connect previous part with reversed head
    connectionPoint.next = previousNode;

    return dummyNode.next;
}