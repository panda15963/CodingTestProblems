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
    public ListNode deleteMiddle(ListNode head) {
        // Create a dummy node pointing to head to handle edge cases
        // This helps when we need to delete the first node
        ListNode dummyNode = new ListNode(0, head);
      
        // Initialize two pointers for the two-pointer technique
        // slowPointer will eventually point to the node before the middle
        ListNode slowPointer = dummyNode;
        // fastPointer moves twice as fast to find the middle
        ListNode fastPointer = head;
      
        // Traverse the list using two-pointer technique
        // When fastPointer reaches the end, slowPointer will be just before the middle
        while (fastPointer != null && fastPointer.next != null) {
            slowPointer = slowPointer.next;
            fastPointer = fastPointer.next.next;
        }
      
        // Delete the middle node by skipping it
        // Connect the node before middle to the node after middle
        slowPointer.next = slowPointer.next.next;
      
        // Return the head of the modified list
        return dummyNode.next;
    }
}