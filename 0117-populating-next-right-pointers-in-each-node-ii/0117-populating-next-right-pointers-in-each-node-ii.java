/*
// Definition for a Node.
class Node {
    public int val;
    public Node left;
    public Node right;
    public Node next;

    public Node() {}

    public Node(int _val) {
        val = _val;
    }

    public Node(int _val, Node _left, Node _right, Node _next) {
        val = _val;
        left = _left;
        right = _right;
        next = _next;
    }
};
*/

class Solution {
    /**
     * Connects each node to its next right node in the same level.
     * Uses BFS (level-order traversal) to process nodes level by level.
     * 
     * @param root The root of the binary tree
     * @return The root of the modified tree with next pointers set
     */
    public Node connect(Node root) {
        // Handle empty tree case
        if (root == null) {
            return root;
        }
      
        // Initialize queue for BFS traversal
        Deque<Node> queue = new ArrayDeque<>();
        queue.offer(root);
      
        // Process tree level by level
        while (!queue.isEmpty()) {
            // Track the previous node in the current level
            Node previousNode = null;
          
            // Get the number of nodes in the current level
            int levelSize = queue.size();
          
            // Process all nodes in the current level
            for (int i = 0; i < levelSize; i++) {
                // Dequeue the current node
                Node currentNode = queue.poll();
              
                // Connect previous node to current node if previous exists
                if (previousNode != null) {
                    previousNode.next = currentNode;
                }
              
                // Update previous node for next iteration
                previousNode = currentNode;
              
                // Add left child to queue if it exists
                if (currentNode.left != null) {
                    queue.offer(currentNode.left);
                }
              
                // Add right child to queue if it exists
                if (currentNode.right != null) {
                    queue.offer(currentNode.right);
                }
            }
        }
      
        return root;
    }
}