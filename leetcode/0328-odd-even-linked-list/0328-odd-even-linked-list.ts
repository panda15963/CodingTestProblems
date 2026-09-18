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
 * Rearranges a linked list so that all odd-positioned nodes come first,
 * followed by all even-positioned nodes.
 * The relative order within odd and even groups is preserved.
 * 
 * @param head - The head of the linked list
 * @returns The head of the rearranged linked list
 */
function oddEvenList(head: ListNode | null): ListNode | null {
    // Handle empty list
    if (!head) {
        return null;
    }
  
    // Initialize pointers:
    // oddTail: tracks the last node in the odd-positioned group
    // evenTail: tracks the last node in the even-positioned group  
    // evenHead: stores the head of the even-positioned group for later connection
    let oddTail: ListNode = head;
    let evenTail: ListNode | null = head.next;
    let evenHead: ListNode | null = head.next;
  
    // Traverse the list and separate odd and even positioned nodes
    while (evenTail && evenTail.next) {
        // Connect current odd tail to the next odd-positioned node
        oddTail.next = evenTail.next;
        oddTail = oddTail.next;
      
        // Connect current even tail to the next even-positioned node
        evenTail.next = oddTail.next;
        evenTail = evenTail.next;
    }
  
    // Connect the end of odd-positioned nodes to the head of even-positioned nodes
    oddTail.next = evenHead;
  
    return head;
}
