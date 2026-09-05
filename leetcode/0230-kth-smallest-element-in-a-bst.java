class Solution {
    private int k;
    private Integer result = null;

    public int kthSmallest(TreeNode root, int k) {
        this.k = k;
        traverse(root);

        return result;
    }

    private void traverse(TreeNode root) {
        // 노드가 없거나 이미 답을 찾은 경우 종료
        if (root == null || result != null) {
            return;
        }

        // 왼쪽 서브트리 탐색
        traverse(root.left);

        // 이미 답을 찾았다면 종료
        if (result != null) {
            return;
        }

        // 현재 노드 방문
        k--;

        // k번째로 작은 값인 경우
        if (k == 0) {
            result = root.val;
            return;
        }

        // 오른쪽 서브트리 탐색
        traverse(root.right);
    }
}