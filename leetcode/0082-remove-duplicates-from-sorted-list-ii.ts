/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number;
 *     next: ListNode | null;
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = val === undefined ? 0 : val;
 *         this.next = next === undefined ? null : next;
 *     }
 * }
 */

function deleteDuplicates(head: ListNode | null): ListNode | null {
    const dummy = new ListNode(101);
    dummy.next = head;

    let fast: ListNode | null = dummy.next;
    let slow: ListNode = dummy;

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
}