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
     * Finds the maximum twin sum in a linked list.
     * Twin sum is defined as the sum of a node at position i and the node at position (n-1-i).
     * 
     * @param head The head of the linked list
     * @return The maximum twin sum
     */
    public int pairSum(ListNode head) {
        // Store all node values in a list for easy access by index
        List<Integer> nodeValues = new ArrayList<>();
      
        // Traverse the linked list and collect all values
        ListNode current = head;
        while (current != null) {
            nodeValues.add(current.val);
            current = current.next;
        }
      
        // Initialize variables for maximum sum and list size
        int maxSum = 0;
        int listSize = nodeValues.size();
      
        // Calculate twin sums for the first half of the list
        // Each element at index i is paired with element at index (listSize - 1 - i)
        for (int i = 0; i < listSize / 2; i++) {
            int twinSum = nodeValues.get(i) + nodeValues.get(listSize - 1 - i);
            maxSum = Math.max(maxSum, twinSum);
        }
      
        return maxSum;
    }
}
