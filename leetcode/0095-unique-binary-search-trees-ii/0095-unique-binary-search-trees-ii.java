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
     * Generates all structurally unique BSTs that store values 1 to n
     * @param n the number of nodes in the BST
     * @return list of all possible unique BST root nodes
     */
    public List<TreeNode> generateTrees(int n) {
        return generateSubtrees(1, n);
    }

    /**
     * Recursively generates all possible BSTs using values from start to end (inclusive)
     * @param start the starting value of the range
     * @param end the ending value of the range
     * @return list of root nodes representing all possible BSTs in the given range
     */
    private List<TreeNode> generateSubtrees(int start, int end) {
        List<TreeNode> result = new ArrayList<>();
      
        // Base case: if start > end, return list containing null
        // This represents an empty subtree
        if (start > end) {
            result.add(null);
            return result;
        }
      
        // Try each value in the range as the root
        for (int rootValue = start; rootValue <= end; rootValue++) {
            // Generate all possible left subtrees with values less than root
            List<TreeNode> leftSubtrees = generateSubtrees(start, rootValue - 1);
          
            // Generate all possible right subtrees with values greater than root
            List<TreeNode> rightSubtrees = generateSubtrees(rootValue + 1, end);
          
            // Combine each left subtree with each right subtree
            for (TreeNode leftSubtree : leftSubtrees) {
                for (TreeNode rightSubtree : rightSubtrees) {
                    // Create new tree with current root value and attach subtrees
                    TreeNode root = new TreeNode(rootValue, leftSubtree, rightSubtree);
                    result.add(root);
                }
            }
        }
      
        return result;
    }
}
