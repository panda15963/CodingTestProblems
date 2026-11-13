class Solution {
    public List<Integer> preorder(Node root) {
        List<Integer> res = new ArrayList<>();
        Stack<Node> nodeStack = new Stack<>();

        if (root == null) {
            return res;
        }

        nodeStack.push(root);

        while (!nodeStack.isEmpty()) {
            Node curRoot = nodeStack.pop();

            res.add(curRoot.val);

            // 자식 노드를 역순으로 Stack에 삽입
            for (int i = curRoot.children.size() - 1; i >= 0; i--) {
                nodeStack.push(curRoot.children.get(i));
            }
        }

        return res;
    }
}