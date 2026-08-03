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
 * Reverses a portion of a linked list between positions left and right (1-indexed)
 * @param head - The head of the linked list
 * @param left - The starting position for reversal (1-indexed)
 * @param right - The ending position for reversal (1-indexed)
 * @returns The head of the modified linked list
 */
function reverseBetween(head: ListNode | null, left: number, right: number): ListNode | null {
    // Calculate the number of nodes to reverse
    const nodesToReverse: number = right - left;
  
    // If left equals right, no reversal needed
    if (nodesToReverse === 0) {
        return head;
    }

    // Create a dummy node to simplify edge cases (when left = 1)
    const dummyNode: ListNode = new ListNode(0, head);
  
    // Find the node just before the reversal section
    let previousNode: ListNode | null = null;
    let currentNode: ListNode = dummyNode;
  
    // Move to the node just before position 'left'
    for (let i = 0; i < left; i++) {
        previousNode = currentNode;
        currentNode = currentNode.next!;
    }
  
    // Store the connection point (node before the reversal section)
    const connectionPoint: ListNode = previousNode!;
  
    // Reverse the nodes from position 'left' to 'right'
    previousNode = null;
    for (let i = 0; i <= nodesToReverse; i++) {
        // Store the next node before breaking the link
        const nextNode: ListNode | null = currentNode.next;
      
        // Reverse the current node's pointer
        currentNode.next = previousNode;
      
        // Move pointers forward
        previousNode = currentNode;
        currentNode = nextNode!;
    }
  
    // Reconnect the reversed section with the rest of the list
    // connectionPoint.next is the original first node of the reversed section (now the last)
    connectionPoint.next!.next = currentNode;
  
    // Connect the node before reversal to the new first node of reversed section
    connectionPoint.next = previousNode;
  
    // Return the actual head (skip dummy node)
    return dummyNode.next;
}
