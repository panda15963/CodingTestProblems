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
 * Finds the maximum twin sum in a linked list.
 * Twin sum is defined as the sum of a node at position i and the node at position (n-1-i),
 * where n is the total number of nodes in the list.
 * 
 * @param head - The head of the singly-linked list
 * @returns The maximum twin sum found in the list
 */
function pairSum(head: ListNode | null): number {
    // Convert linked list to array for easier access to elements
    const values: number[] = [];
    let currentNode: ListNode | null = head;
  
    // Traverse the linked list and store all values in the array
    while (currentNode !== null) {
        values.push(currentNode.val);
        currentNode = currentNode.next;
    }
  
    // Get the total number of elements
    const totalElements: number = values.length;
    let maxTwinSum: number = 0;
  
    // Calculate twin sums for the first half of elements paired with their twins
    // n >> 1 is equivalent to Math.floor(n / 2)
    for (let i = 0; i < totalElements >> 1; i++) {
        // Calculate twin sum: element at index i + element at index (n-1-i)
        const twinSum: number = values[i] + values[totalElements - 1 - i];
        // Update maximum twin sum if current twin sum is larger
        maxTwinSum = Math.max(maxTwinSum, twinSum);
    }
  
    return maxTwinSum;
}
