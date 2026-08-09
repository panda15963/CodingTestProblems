/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) {
 *         val = x;
 *         next = null;
 *     }
 * }
 */
public class Solution {
    /**
     * Finds the intersection node of two singly-linked lists.
     * Uses the two-pointer technique where both pointers traverse both lists.
     * When a pointer reaches the end of one list, it continues from the head of the other list.
     * If there's an intersection, both pointers will meet at the intersection node.
     * If there's no intersection, both pointers will eventually become null simultaneously.
     * 
     * @param headA The head of the first linked list
     * @param headB The head of the second linked list
     * @return The intersection node if it exists, otherwise null
     */
    public ListNode getIntersectionNode(ListNode headA, ListNode headB) {
        // Initialize two pointers starting at the heads of both lists
        ListNode pointerA = headA;
        ListNode pointerB = headB;
      
        // Continue traversing until both pointers meet (either at intersection or both null)
        while (pointerA != pointerB) {
            // If pointerA reaches the end of list A, redirect it to the head of list B
            // Otherwise, move to the next node in the current list
            pointerA = (pointerA == null) ? headB : pointerA.next;
          
            // If pointerB reaches the end of list B, redirect it to the head of list A
            // Otherwise, move to the next node in the current list
            pointerB = (pointerB == null) ? headA : pointerB.next;
        }
      
        // Return the meeting point (intersection node or null if no intersection)
        return pointerA;
    }
}
