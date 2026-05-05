/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */
class Solution {
    public ListNode rotateRight(ListNode head, int k) {
        // Handle edge cases: empty list or single node
        if (head == null || head.next == null) {
            return head;
        }
      
        // Calculate the length of the linked list
        ListNode current = head;
        int length = 0;
        while (current != null) {
            length++;
            current = current.next;
        }
      
        // Optimize k by taking modulo with length to handle k > length cases
        k = k % length;
      
        // If k is 0, no rotation needed
        if (k == 0) {
            return head;
        }
      
        // Use two pointers technique to find the rotation point
        // Move fast pointer k steps ahead
        ListNode fastPointer = head;
        ListNode slowPointer = head;
      
        for (int i = 0; i < k; i++) {
            fastPointer = fastPointer.next;
        }
      
        // Move both pointers until fast reaches the last node
        // Slow will point to the node before the new head
        while (fastPointer.next != null) {
            fastPointer = fastPointer.next;
            slowPointer = slowPointer.next;
        }
      
        // Perform the rotation:
        // 1. New head is the node after slowPointer
        ListNode newHead = slowPointer.next;
      
        // 2. Break the link at the rotation point
        slowPointer.next = null;
      
        // 3. Connect the last node to the original head
        fastPointer.next = head;
      
        return newHead;
    }
}