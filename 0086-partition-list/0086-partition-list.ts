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
 * Partitions a linked list around a value x, such that all nodes less than x
 * come before nodes greater than or equal to x.
 * The relative order within each partition is preserved.
 * 
 * @param head - The head of the input linked list
 * @param x - The partition value
 * @returns The head of the partitioned linked list
 */
function partition(head: ListNode | null, x: number): ListNode | null {
    // Create dummy heads for two separate lists:
    // leftDummy: for nodes with values less than x
    // rightDummy: for nodes with values greater than or equal to x
    const leftDummy: ListNode = new ListNode();
    const rightDummy: ListNode = new ListNode();
  
    // Maintain tail pointers for both lists to append nodes efficiently
    let leftTail: ListNode = leftDummy;
    let rightTail: ListNode = rightDummy;
  
    // Traverse the original linked list
    let current: ListNode | null = head;
    while (current !== null) {
        if (current.val < x) {
            // Append nodes with values less than x to the left list
            leftTail.next = current;
            leftTail = leftTail.next;
        } else {
            // Append nodes with values >= x to the right list
            rightTail.next = current;
            rightTail = rightTail.next;
        }
        current = current.next;
    }
  
    // Terminate the right list to avoid cycles
    rightTail.next = null;
  
    // Connect the left list to the right list
    leftTail.next = rightDummy.next;
  
    // Return the head of the partitioned list (skip dummy node)
    return leftDummy.next;
}
