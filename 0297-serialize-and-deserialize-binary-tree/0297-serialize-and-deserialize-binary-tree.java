import java.util.*;

public class Codec {

    // 직렬화
    public String serialize(TreeNode root) {
        if (root == null) {
            return "# #";
        }

        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);

        List<String> result = new ArrayList<>();
        result.add("#");

        // 트리 BFS 직렬화
        while (!queue.isEmpty()) {
            TreeNode node = queue.poll();

            if (node != null) {
                queue.offer(node.left);
                queue.offer(node.right);

                result.add(String.valueOf(node.val));
            } else {
                result.add("#");
            }
        }

        return String.join(" ", result);
    }

    // 역직렬화
    public TreeNode deserialize(String data) {
        // 예외 처리
        if (data.equals("# #")) {
            return null;
        }

        String[] nodes = data.split(" ");

        TreeNode root = new TreeNode(Integer.parseInt(nodes[1]));

        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);

        int index = 2;

        while (!queue.isEmpty()) {
            TreeNode node = queue.poll();

            // 왼쪽 자식
            if (!nodes[index].equals("#")) {
                node.left = new TreeNode(Integer.parseInt(nodes[index]));
                queue.offer(node.left);
            }
            index++;

            // 오른쪽 자식
            if (!nodes[index].equals("#")) {
                node.right = new TreeNode(Integer.parseInt(nodes[index]));
                queue.offer(node.right);
            }
            index++;
        }

        return root;
    }
}