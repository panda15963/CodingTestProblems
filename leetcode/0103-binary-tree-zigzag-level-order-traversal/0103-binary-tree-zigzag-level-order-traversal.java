class Solution {
    List<List<Integer>> answer = new ArrayList<>();

    public List<List<Integer>> zigzagLevelOrder(TreeNode root) {
        zigzagLevelTraversal(root, 0);

        return answer;
    }

    void zigzagLevelTraversal(TreeNode node, int level){
        if (node == null) {
            return;
        }

        if (answer.size() == level) {//해당 레벨에 대한 List가 생성되지 않았다면 생성
            answer.add(new ArrayList<>());
        }

        zigzagLevelTraversal(node.left, level + 1);

        if (level % 2 == 0) {//짝수 레벨이라면 순서대로
            answer.get(level).add(node.val);
        } else {//홀수 레벨이라면 그 반대로
            answer.get(level).add(0, node.val);
        }

        zigzagLevelTraversal(node.right, level + 1);
    }
}