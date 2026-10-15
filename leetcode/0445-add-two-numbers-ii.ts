/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

/**
 * Adds two numbers represented as linked lists where each node contains a single digit.
 * The digits are stored in forward order (most significant digit comes first).
 * 
 * @param l1 - First linked list representing a number
 * @param l2 - Second linked list representing a number
 * @returns A linked list representing the sum of the two numbers
 */
function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {
    // Stack to store digits of first number
    const stack1: number[] = [];
    // Stack to store digits of second number
    const stack2: number[] = [];
  
    // Traverse first linked list and push all digits to stack1
    let current1: ListNode | null = l1;
    while (current1 !== null) {
        stack1.push(current1.val);
        current1 = current1.next;
    }
  
    // Traverse second linked list and push all digits to stack2
    let current2: ListNode | null = l2;
    while (current2 !== null) {
        stack2.push(current2.val);
        current2 = current2.next;
    }
  
    // Dummy head node to simplify result list construction
    const dummyHead: ListNode = new ListNode();
    let carry: number = 0;
  
    // Process digits from least significant to most significant
    while (stack1.length > 0 || stack2.length > 0 || carry > 0) {
        // Pop digits from stacks (use 0 if stack is empty)
        const digit1: number = stack1.pop() ?? 0;
        const digit2: number = stack2.pop() ?? 0;
      
        // Calculate sum of current digits plus carry
        const sum: number = digit1 + digit2 + carry;
      
        // Create new node with current digit and insert at beginning of result list
        const newNode: ListNode = new ListNode(sum % 10, dummyHead.next);
        dummyHead.next = newNode;
      
        // Update carry for next iteration
        carry = Math.floor(sum / 10);
    }
  
    return dummyHead.next;
}
