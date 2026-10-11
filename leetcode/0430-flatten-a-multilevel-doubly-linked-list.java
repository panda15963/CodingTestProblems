/*
// Definition for a Node.
class Node {
    public int val;
    public Node prev;
    public Node next;
    public Node child;
};
*/

class Solution {
    /**
     * Flattens a multilevel doubly linked list into a single level.
     * @param head The head of the multilevel doubly linked list
     * @return The head of the flattened list
     */
    public Node flatten(Node head) {
        // Handle empty list
        if (head == null) {
            return null;
        }
      
        // Create dummy node to simplify edge cases
        Node dummyHead = new Node();
        dummyHead.next = head;
      
        // Perform DFS traversal to flatten the list
        flattenDFS(dummyHead, head);
      
        // Disconnect the dummy head from the actual head
        dummyHead.next.prev = null;
      
        return dummyHead.next;
    }
  
    /**
     * Recursively flattens the list using DFS traversal.
     * Connects nodes in preorder fashion: current -> child subtree -> next subtree
     * @param previous The previous node in the flattened list
     * @param current The current node being processed
     * @return The last node in the flattened portion
     */
    private Node flattenDFS(Node previous, Node current) {
        // Base case: reached end of current branch
        if (current == null) {
            return previous;
        }
      
        // Connect current node to previous node
        current.prev = previous;
        previous.next = current;
      
        // Store the original next node before it gets overwritten
        Node tempNext = current.next;
      
        // Recursively flatten the child branch first
        Node tail = flattenDFS(current, current.child);
      
        // Clear the child pointer after flattening
        current.child = null;
      
        // Continue flattening with the original next branch
        return flattenDFS(tail, tempNext);
    }
}
