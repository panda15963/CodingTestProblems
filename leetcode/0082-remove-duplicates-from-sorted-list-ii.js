/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val === undefined ? 0 : val);
 *     this.next = (next === undefined ? null : next);
 * }
 *
 * @param {ListNode} head
 * @return {ListNode}
 */
var deleteDuplicates = function(head) {
    const dummy = new ListNode(101);
    dummy.next = head;

    let fast = dummy.next;
    let slow = dummy;

    while (fast && fast.next) {

        if (fast.val === fast.next.val) {
            while (fast.next && fast.val === fast.next.val) {
                fast = fast.next;
            }
            slow.next = fast.next;
        } else {
            slow = slow.next;
        }

        fast = fast.next;
    }

    return dummy.next;
};