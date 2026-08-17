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
    public ListNode insertionSortList(ListNode head) {
        // Handle edge cases: empty list or single node
        if (head == null || head.next == null) {
            return head;
        }
      
        // Create a dummy node with value smaller than any possible value
        // This serves as the head of our sorted portion
        ListNode dummy = new ListNode(Integer.MIN_VALUE);
        dummy.next = head;
      
        // Previous node in the original list and current node to be inserted
        ListNode previousNode = head;
        ListNode currentNode = head.next;
      
        // Process each node in the original list
        while (currentNode != null) {
            // If current node is already in correct position (greater than or equal to previous)
            // Simply move forward
            if (previousNode.val <= currentNode.val) {
                previousNode = currentNode;
                currentNode = currentNode.next;
                continue;
            }
          
            // Find the correct insertion position in the sorted portion
            ListNode insertPosition = dummy;
            while (insertPosition.next.val < currentNode.val) {
                insertPosition = insertPosition.next;
            }
          
            // Remove current node from its current position
            ListNode nextNode = currentNode.next;
            previousNode.next = nextNode;
          
            // Insert current node at the found position
            currentNode.next = insertPosition.next;
            insertPosition.next = currentNode;
          
            // Move to the next node to be processed
            currentNode = nextNode;
        }
      
        // Return the head of the sorted list (skip dummy node)
        return dummy.next;
    }
}
