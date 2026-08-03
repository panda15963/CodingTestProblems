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
    public ListNode reverseBetween(ListNode head, int left, int right) {
        // Edge case: single node or no reversal needed
        if (head.next == null || left == right) {
            return head;
        }
      
        // Create dummy node to simplify edge cases when left = 1
        ListNode dummy = new ListNode(0, head);
      
        // Find the node just before the reversal section
        ListNode beforeReverse = dummy;
        for (int i = 0; i < left - 1; i++) {
            beforeReverse = beforeReverse.next;
        }
      
        // Save important connection points
        ListNode connectionBeforeReverse = beforeReverse;  // Node before the reversed section
        ListNode firstNodeToReverse = beforeReverse.next;   // First node in the section to be reversed
      
        // Reverse the sublist from position left to right
        ListNode previous = beforeReverse;
        ListNode current = firstNodeToReverse;
      
        for (int i = 0; i < right - left + 1; i++) {
            // Standard linked list reversal: save next, point back, move forward
            ListNode nextNode = current.next;
            current.next = previous;
            previous = current;
            current = nextNode;
        }
      
        // Reconnect the reversed section with the rest of the list
        connectionBeforeReverse.next = previous;  // Connect to the new head of reversed section
        firstNodeToReverse.next = current;        // Connect the tail of reversed section to remaining list
      
        return dummy.next;
    }
}
