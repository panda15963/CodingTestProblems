/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val === undefined ? 0 : val);
 *     this.next = (next === undefined ? null : next);
 * }
 */

/**
 * Partitions a linked list around a value x.
 *
 * @param {ListNode} head
 * @param {number} x
 * @return {ListNode}
 */
function partition(head, x) {
    // Dummy heads for the two partitions
    const leftDummy = new ListNode();
    const rightDummy = new ListNode();

    // Tail pointers
    let leftTail = leftDummy;
    let rightTail = rightDummy;

    // Traverse the original list
    let current = head;

    while (current !== null) {
        if (current.val < x) {
            // Append to the left partition
            leftTail.next = current;
            leftTail = leftTail.next;
        } else {
            // Append to the right partition
            rightTail.next = current;
            rightTail = rightTail.next;
        }

        current = current.next;
    }

    // Terminate the right partition
    rightTail.next = null;

    // Connect the two partitions
    leftTail.next = rightDummy.next;

    // Return the new head
    return leftDummy.next;
}