class Solution {
    public void flatten(TreeNode root) {
        TreeNode curr = root;

        while (curr != null) {
            if (curr.left != null) {
                // Find the rightmost node of the left subtree
                TreeNode leftRightMost = curr.left;
                while (leftRightMost.right != null) {
                    leftRightMost = leftRightMost.right;
                }

                // Connect the original right subtree
                leftRightMost.right = curr.right;

                // Move the left subtree to the right
                curr.right = curr.left;
                curr.left = null;
            }

            // Move to the next node
            curr = curr.right;
        }
    }
}