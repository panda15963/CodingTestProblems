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
    /**
     * Removes all nodes from the linked list that have the specified value.
     * 
     * @param head The head of the linked list
     * @param val The value to be removed from the list
     * @return The head of the modified linked list
     */
    public ListNode removeElements(ListNode head, int val) {
        // Create a dummy node pointing to the head to handle edge cases
        // where the head itself needs to be removed
        ListNode dummyNode = new ListNode(-1, head);
      
        // Initialize pointer to track the previous node
        ListNode previousNode = dummyNode;
      
        // Traverse the linked list
        while (previousNode.next != null) {
            // Check if the next node's value matches the target value
            if (previousNode.next.val != val) {
                // Move to the next node if value doesn't match
                previousNode = previousNode.next;
            } else {
                // Skip the node with matching value by updating the link
                previousNode.next = previousNode.next.next;
            }
        }
      
        // Return the actual head (skipping the dummy node)
        return dummyNode.next;
    }
}
