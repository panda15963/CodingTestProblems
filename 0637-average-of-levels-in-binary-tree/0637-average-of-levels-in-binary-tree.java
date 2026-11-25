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
     * Calculates the average value of nodes at each level of a binary tree.
     * Uses BFS (Breadth-First Search) to traverse the tree level by level.
     * 
     * @param root The root node of the binary tree
     * @return A list containing the average values for each level
     */
    public List<Double> averageOfLevels(TreeNode root) {
        // List to store the average value of each level
        List<Double> averagesList = new ArrayList<>();
      
        // Queue for BFS traversal
        Deque<TreeNode> queue = new ArrayDeque<>();
      
        // Start BFS from the root node
        queue.offer(root);
      
        // Process each level of the tree
        while (!queue.isEmpty()) {
            // Get the number of nodes at the current level
            int levelSize = queue.size();
          
            // Use long to prevent integer overflow when summing large values
            long levelSum = 0;
          
            // Process all nodes at the current level
            for (int i = 0; i < levelSize; i++) {
                // Remove and process the next node from the queue
                TreeNode currentNode = queue.pollFirst();
              
                // Add current node's value to the level sum
                levelSum += currentNode.val;
              
                // Add left child to queue for next level processing
                if (currentNode.left != null) {
                    queue.offer(currentNode.left);
                }
              
                // Add right child to queue for next level processing
                if (currentNode.right != null) {
                    queue.offer(currentNode.right);
                }
            }
          
            // Calculate and store the average for this level
            // Convert to double by multiplying by 1.0
            averagesList.add(levelSum * 1.0 / levelSize);
        }
      
        return averagesList;
    }
}
