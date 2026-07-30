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
    public ListNode partition(ListNode head, int x) {
        // Create dummy heads for two separate lists
        // leftDummy: for nodes with values less than x
        // rightDummy: for nodes with values greater than or equal to x
        ListNode leftDummy = new ListNode();
        ListNode rightDummy = new ListNode();
      
        // Maintain pointers to track the tail of each list
        ListNode leftTail = leftDummy;
        ListNode rightTail = rightDummy;
      
        // Traverse the original linked list
        while (head != null) {
            if (head.val < x) {
                // Add current node to the left list (values < x)
                leftTail.next = head;
                leftTail = leftTail.next;
            } else {
                // Add current node to the right list (values >= x)
                rightTail.next = head;
                rightTail = rightTail.next;
            }
            // Move to the next node
            head = head.next;
        }
      
        // Terminate the right list to avoid cycles
        rightTail.next = null;
      
        // Connect the left list to the right list
        leftTail.next = rightDummy.next;
      
        // Return the head of the partitioned list (skip dummy node)
        return leftDummy.next;
    }
}