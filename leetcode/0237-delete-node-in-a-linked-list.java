/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) { val = x; }
 * }
 */
class Solution {
    /**
     * Deletes a node from a linked list given only access to that node.
     * This method works by copying the value of the next node to the current node,
     * then bypassing the next node by updating the pointer.
     * 
     * @param node The node to be deleted (not the tail node)
     */
    public void deleteNode(ListNode node) {
        // Copy the value of the next node to the current node
        node.val = node.next.val;
      
        // Bypass the next node by updating the current node's next pointer
        // This effectively removes the next node from the list
        node.next = node.next.next;
    }
}
