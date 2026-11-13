class Solution {
    public List<Integer> postorder(Node root) {
        List<Integer> ans = new ArrayList<>();
        Stack<Node> stack = new Stack<>();

        if (root == null) {
            return ans;
        }

        stack.push(root);

        while (!stack.isEmpty()) {
            Node curr = stack.pop();

            ans.add(curr.val);

            for (Node child : curr.children) {
                stack.push(child);
            }
        }

        // 결과 배열 역순으로 변경
        Collections.reverse(ans);

        return ans;
    }
}