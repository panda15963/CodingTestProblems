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
     * Finds the largest value in each level of a binary tree.
     * Uses BFS (Breadth-First Search) to traverse the tree level by level.
     * 
     * @param root The root node of the binary tree
     * @return A list containing the maximum value from each level
     */
    public List<Integer> largestValues(TreeNode root) {
        // Initialize result list to store maximum values for each level
        List<Integer> result = new ArrayList<>();
      
        // Handle edge case: empty tree
        if (root == null) {
            return result;
        }
      
        // Initialize queue for BFS traversal
        Deque<TreeNode> queue = new ArrayDeque<>();
        queue.offer(root);
      
        // Process tree level by level
        while (!queue.isEmpty()) {
            // Initialize max value for current level with first node's value
            int maxValueInLevel = queue.peek().val;
          
            // Get current level size to process all nodes at this level
            int levelSize = queue.size();
          
            // Process all nodes in the current level
            for (int i = 0; i < levelSize; i++) {
                TreeNode currentNode = queue.poll();
              
                // Update maximum value for this level
                maxValueInLevel = Math.max(maxValueInLevel, currentNode.val);
              
                // Add left child to queue for next level processing
                if (currentNode.left != null) {
                    queue.offer(currentNode.left);
                }
              
                // Add right child to queue for next level processing
                if (currentNode.right != null) {
                    queue.offer(currentNode.right);
                }
            }
          
            // Add the maximum value of current level to result
            result.add(maxValueInLevel);
        }
      
        return result;
    }
}
