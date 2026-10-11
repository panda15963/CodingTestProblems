/*
// Definition for a Node.
class Node {
    public int val;
    public List<Node> children;

    public Node() {}

    public Node(int _val) {
        val = _val;
    }

    public Node(int _val, List<Node> _children) {
        val = _val;
        children = _children;
    }
};
*/

class Solution {
    /**
     * Performs level order traversal on an N-ary tree.
     * @param root The root node of the N-ary tree
     * @return A list of lists containing node values grouped by level
     */
    public List<List<Integer>> levelOrder(Node root) {
        // Initialize result list to store nodes at each level
        List<List<Integer>> result = new ArrayList<>();
      
        // Handle edge case: empty tree
        if (root == null) {
            return result;
        }
      
        // Initialize queue for BFS traversal
        Deque<Node> queue = new ArrayDeque<>();
        queue.offer(root);
      
        // Process nodes level by level
        while (!queue.isEmpty()) {
            // List to store current level's node values
            List<Integer> currentLevel = new ArrayList<>();
          
            // Get the number of nodes at current level
            int levelSize = queue.size();
          
            // Process all nodes at current level
            for (int i = 0; i < levelSize; i++) {
                // Remove and process the front node
                Node currentNode = queue.poll();
                currentLevel.add(currentNode.val);
              
                // Add all children of current node to queue for next level
                queue.addAll(currentNode.children);
            }
          
            // Add current level's values to result
            result.add(currentLevel);
        }
      
        return result;
    }
}
