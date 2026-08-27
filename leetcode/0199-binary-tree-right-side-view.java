import java.util.*;

class Solution {
    public List<Integer> rightSideView(TreeNode root) {
        Queue<TreeNode> q = new LinkedList<>();
        List<Integer> result = new ArrayList<>();

        if (root != null) {
            q.offer(root);
        }

        while (!q.isEmpty()) {
            int size = q.size();

            for (int i = 0; i < size; i++) {
                TreeNode cur = q.poll();

                if (cur.left != null) {
                    q.offer(cur.left);
                }

                if (cur.right != null) {
                    q.offer(cur.right);
                }

                // 현재 레벨의 마지막 노드
                if (i == size - 1) {
                    result.add(cur.val);
                }
            }
        }

        return result;
    }
}