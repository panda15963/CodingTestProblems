class Solution {
    public TreeNode buildTree(int[] preorder, int[] inorder) {
        if (preorder.length == 0) {
            return null;
        }

        int rootVal = preorder[0];

        int idx = 0;
        while (inorder[idx] != rootVal) {
            idx++;
        }

        int leftSize = idx;
        int rightSize = inorder.length - leftSize - 1;

        TreeNode left = null;
        TreeNode right = null;

        if (leftSize > 0) {
            left = buildTree(
                Arrays.copyOfRange(preorder, 1, 1 + leftSize),
                Arrays.copyOfRange(inorder, 0, leftSize)
            );
        }

        if (rightSize > 0) {
            right = buildTree(
                Arrays.copyOfRange(preorder, 1 + leftSize, preorder.length),
                Arrays.copyOfRange(inorder, leftSize + 1, inorder.length)
            );
        }

        return new TreeNode(rootVal, left, right);
    }
}