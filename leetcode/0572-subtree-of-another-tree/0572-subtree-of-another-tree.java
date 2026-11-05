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
     * Determines if subRoot is a subtree of root.
     * A subtree of a binary tree is a tree that consists of a node and all of its descendants.
     *
     * @param root The root of the main binary tree
     * @param subRoot The root of the potential subtree
     * @return true if subRoot is a subtree of root, false otherwise
     */
    public boolean isSubtree(TreeNode root, TreeNode subRoot) {
        // Base case: if main tree is empty, it cannot contain a subtree
        if (root == null) {
            return false;
        }

        // Check if current node matches the subtree OR
        // recursively check if subtree exists in left or right branches
        return isSameTree(root, subRoot)
            || isSubtree(root.left, subRoot)
            || isSubtree(root.right, subRoot);
    }

    /**
     * Helper method to check if two trees are identical.
     * Two trees are identical if they have the same structure and node values.
     *
     * @param treeOne The root of the first tree
     * @param treeTwo The root of the second tree
     * @return true if both trees are identical, false otherwise
     */
    private boolean isSameTree(TreeNode treeOne, TreeNode treeTwo) {
        // If either node is null, both must be null for trees to be identical
        if (treeOne == null || treeTwo == null) {
            return treeOne == treeTwo;
        }

        // Check if current nodes have same value AND
        // recursively verify that left and right subtrees are also identical
        return treeOne.val == treeTwo.val
            && isSameTree(treeOne.left, treeTwo.left)
            && isSameTree(treeOne.right, treeTwo.right);
    }
}
