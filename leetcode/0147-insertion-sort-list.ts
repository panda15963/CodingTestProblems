/**
 * Definition for singly-linked list node
 */
interface ListNode {
    val: number;
    next: ListNode | null;
}

/**
 * Sorts a linked list using insertion sort algorithm
 * @param head - The head of the linked list to be sorted
 * @returns The head of the sorted linked list
 */
function insertionSortList(head: ListNode | null): ListNode | null {
    // Handle edge cases: empty list or single node
    if (head === null || head.next === null) {
        return head;
    }
  
    // Create a dummy node to simplify insertion at the beginning
    // Initialize dummy with head's value and point to head
    const dummy: ListNode = {
        val: head.val,
        next: head
    };
  
    // Previous node in the original list and current node being processed
    let previous: ListNode = dummy;
    let current: ListNode | null = head;
  
    // Process each node in the original list
    while (current !== null) {
        // If current node is already in correct position (greater than or equal to previous)
        if (previous.val <= current.val) {
            // Move forward without any insertion
            previous = current;
            current = current.next;
            continue;
        }
      
        // Find the correct position to insert current node
        let insertPosition: ListNode = dummy;
        while (insertPosition.next !== null && insertPosition.next.val <= current.val) {
            insertPosition = insertPosition.next;
        }
      
        // Store the next node to process
        const nextNode: ListNode | null = current.next;
      
        // Insert current node at the found position
        current.next = insertPosition.next;
        insertPosition.next = current;
      
        // Connect previous node to the next node (skip current)
        previous.next = nextNode;
      
        // Move to the next node
        current = nextNode;
    }
  
    // Return the sorted list (skip dummy node)
    return dummy.next;
}
