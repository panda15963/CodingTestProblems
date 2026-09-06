class Solution {

    public TreeNode lowestCommonAncestor(
            TreeNode root,
            TreeNode p,
            TreeNode q
    ) {
        // 루트가 없거나 p 또는 q를 찾은 경우 반환
        if (root == null || root == p || root == q) {
            return root;
        }

        // 왼쪽 서브트리에서 p와 q 탐색
        TreeNode left = lowestCommonAncestor(root.left, p, q);

        // 오른쪽 서브트리에서 p와 q 탐색
        TreeNode right = lowestCommonAncestor(root.right, p, q);

        // 왼쪽에서 찾지 못한 경우 오른쪽 결과 반환
        if (left == null) {
            return right;
        }

        // 오른쪽에서 찾지 못한 경우 왼쪽 결과 반환
        if (right == null) {
            return left;
        }

        // 왼쪽과 오른쪽에서 각각 하나씩 찾은 경우
        // 현재 노드가 최소 공통 조상
        return root;
    }
}