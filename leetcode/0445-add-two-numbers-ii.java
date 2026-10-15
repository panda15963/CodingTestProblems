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
     * Adds two numbers represented as linked lists where the most significant digit comes first.
     * Returns the sum as a new linked list.
     * 
     * @param l1 First linked list representing a number
     * @param l2 Second linked list representing a number
     * @return New linked list representing the sum
     */
    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        // Use stacks to reverse the order of digits for addition
        Deque<Integer> stack1 = new ArrayDeque<>();
        Deque<Integer> stack2 = new ArrayDeque<>();
      
        // Push all digits from first linked list onto stack1
        for (ListNode current = l1; current != null; current = current.next) {
            stack1.push(current.val);
        }
      
        // Push all digits from second linked list onto stack2
        for (ListNode current = l2; current != null; current = current.next) {
            stack2.push(current.val);
        }
      
        // Dummy head for building result list
        ListNode dummyHead = new ListNode();
        int carry = 0;
      
        // Process digits from least significant to most significant
        while (!stack1.isEmpty() || !stack2.isEmpty() || carry != 0) {
            // Get next digits from each stack (0 if stack is empty)
            int digit1 = stack1.isEmpty() ? 0 : stack1.pop();
            int digit2 = stack2.isEmpty() ? 0 : stack2.pop();
          
            // Calculate sum including carry
            int sum = digit1 + digit2 + carry;
          
            // Create new node with current digit and insert at the beginning of result list
            ListNode newNode = new ListNode(sum % 10, dummyHead.next);
            dummyHead.next = newNode;
          
            // Update carry for next iteration
            carry = sum / 10;
        }
      
        // Return the actual head of result list (skip dummy node)
        return dummyHead.next;
    }
}
