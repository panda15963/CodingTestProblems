/**
 * Definition for singly-linked list.
 * class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) {
 *         val = x;
 *         next = null;
 *     }
 * }
 */
public class Solution {
    int visitedStart = 100000 + 1;
    public ListNode detectCycle(ListNode head) {
        ListNode dummy = new ListNode(-100000 - 1);
        dummy.next = head;
        int visitedTemp = visitedStart + 1;
        while(head != null){
            if(head.val >= visitedStart) {
                return head;
            }
            head.val = visitedTemp++;
            head = head.next;
        }
        return null;
    }
}