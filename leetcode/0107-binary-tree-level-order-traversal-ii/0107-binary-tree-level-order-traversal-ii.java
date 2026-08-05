/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode() {}
 *     TreeNode(int val) { this.val = val; }
 *     TreeNode(int val, TreeNode left, TreeNode right) {
 *         this.val = val;
 *         this.left = left;
 *         this.right = right;
 *     }
 * }
 */
class Solution {
    /**
     * Returns the level order traversal of a binary tree from bottom to top.
     * Each level is represented as a list of node values.
     * 
     * @param root The root node of the binary tree
     * @return A list of lists containing node values at each level (bottom-up order)
     */
    public List<List<Integer>> levelOrderBottom(TreeNode root) {
        // Use LinkedList to efficiently add elements at the beginning
        LinkedList<List<Integer>> result = new LinkedList<>();
      
        // Handle empty tree case
        if (root == null) {
            return result;
        }
      
        // Queue for BFS traversal
        Deque<TreeNode> queue = new LinkedList<>();
        queue.offerLast(root);
      
        // Process tree level by level
        while (!queue.isEmpty()) {
            // Store current level's node values
            List<Integer> currentLevel = new ArrayList<>();
          
            // Get the number of nodes at current level
            int levelSize = queue.size();
          
            // Process all nodes at current level
            for (int i = 0; i < levelSize; i++) {
                TreeNode currentNode = queue.pollFirst();
                currentLevel.add(currentNode.val);
              
                // Add left child to queue for next level processing
                if (currentNode.left != null) {
                    queue.offerLast(currentNode.left);
                }
              
                // Add right child to queue for next level processing
                if (currentNode.right != null) {
                    queue.offerLast(currentNode.right);
                }
            }
          
            // Add current level at the beginning to achieve bottom-up order
            result.addFirst(currentLevel);
        }
      
        return result;
    }
}
