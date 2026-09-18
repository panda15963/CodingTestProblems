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
    public ListNode oddEvenList(ListNode head) {
        // Handle edge case: empty list
        if (head == null) {
            return null;
        }
      
        // Initialize pointers for odd and even nodes
        ListNode oddCurrent = head;           // Pointer to traverse odd-indexed nodes
        ListNode evenCurrent = head.next;     // Pointer to traverse even-indexed nodes
        ListNode evenHead = evenCurrent;      // Save the head of even list for later connection
      
        // Rearrange nodes by alternating odd and even indexed nodes
        // Continue while there are even nodes and nodes after even nodes
        while (evenCurrent != null && evenCurrent.next != null) {
            // Connect current odd node to the next odd node (skip even node)
            oddCurrent.next = evenCurrent.next;
            oddCurrent = oddCurrent.next;
          
            // Connect current even node to the next even node (skip odd node)
            evenCurrent.next = oddCurrent.next;
            evenCurrent = evenCurrent.next;
        }
      
        // Connect the tail of odd list to the head of even list
        oddCurrent.next = evenHead;
      
        return head;
    }
}
