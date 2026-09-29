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
    // Head of the linked list
    private ListNode head;
  
    // Random number generator for reservoir sampling
    private Random random = new Random();

    /**
     * Constructor to initialize the Solution with the head of linked list
     * @param head The head node of the linked list
     */
    public Solution(ListNode head) {
        this.head = head;
    }

    /**
     * Returns a random node's value from the linked list using Reservoir Sampling algorithm.
     * Each node has an equal probability of being selected.
     * 
     * Algorithm: Reservoir Sampling
     * - Traverse through the list while maintaining a count of nodes seen so far
     * - For the nth node, select it with probability 1/n
     * - This ensures each node has equal probability of being selected
     * 
     * @return A randomly selected node's value from the linked list
     */
    public int getRandom() {
        // Store the result value
        int result = 0;
      
        // Counter for the number of nodes visited
        int nodeCount = 0;
      
        // Traverse through the linked list
        for (ListNode currentNode = head; currentNode != null; currentNode = currentNode.next) {
            // Increment the count of nodes visited
            nodeCount++;
          
            // Generate a random number between 1 and nodeCount (inclusive)
            int randomNumber = 1 + random.nextInt(nodeCount);
          
            // If random number equals nodeCount, update the result
            // This gives 1/nodeCount probability of selecting current node
            if (randomNumber == nodeCount) {
                result = currentNode.val;
            }
        }
      
        return result;
    }
}

/**
 * Your Solution object will be instantiated and called as such:
 * Solution obj = new Solution(head);
 * int param_1 = obj.getRandom();
 */
