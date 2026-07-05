import java.util.*;

class Solution {

    static class Node {
        char val;
        ArrayList<Node> next = new ArrayList<>();
        int end = 0;

        Node(char val) {
            this.val = val;
        }
    }

    static class State {
        Node node;
        Node parent;
        boolean visited;

        State(Node node, Node parent, boolean visited) {
            this.node = node;
            this.parent = parent;
            this.visited = visited;
        }
    }

    Map<Integer, Node> map = new HashMap<>();
    Map<Integer, Node> reverseMap = new HashMap<>();

    public int[] solution(String[] words, String[] queries) {

        // 정방향 Trie 생성
        for (String word : words) {

            Node root = map.computeIfAbsent(word.length(), k -> new Node('\0'));

            Node node = root;

            for (int i = 0; i < word.length(); i++) {

                char c = word.charAt(i);

                Node nextNode = null;

                for (Node next : node.next) {
                    if (next.val == c) {
                        nextNode = next;
                        break;
                    }
                }

                if (nextNode == null) {
                    nextNode = new Node(c);
                    node.next.add(nextNode);
                }

                node = nextNode;
            }

            node.end++;
        }

        // 역방향 Trie 생성
        for (String word : words) {

            Node root = reverseMap.computeIfAbsent(word.length(), k -> new Node('\0'));

            Node node = root;

            for (int i = word.length() - 1; i >= 0; i--) {

                char c = word.charAt(i);

                Node nextNode = null;

                for (Node next : node.next) {
                    if (next.val == c) {
                        nextNode = next;
                        break;
                    }
                }

                if (nextNode == null) {
                    nextNode = new Node(c);
                    node.next.add(nextNode);
                }

                node = nextNode;
            }

            node.end++;
        }

        for (Node root : map.values()) {
            dfs(root);
        }

        for (Node root : reverseMap.values()) {
            dfs(root);
        }

        int[] answer = new int[queries.length];

        for (int i = 0; i < queries.length; i++) {

            String query = queries[i];

            Map<Integer, Node> rootMap;

            if (query.charAt(query.length() - 1) == '?') {
                rootMap = map;
            } else {
                rootMap = reverseMap;
                query = new StringBuilder(query).reverse().toString();
            }

            Node root = rootMap.get(query.length());

            if (root == null) {
                answer[i] = 0;
            } else {
                answer[i] = getCnt(query, root);
            }
        }

        return answer;
    }

    private void dfs(Node root) {

        Stack<State> stack = new Stack<>();
        stack.push(new State(root, new Node('\0'), false));

        while (!stack.isEmpty()) {

            State cur = stack.pop();

            Node node = cur.node;
            Node parent = cur.parent;

            if (node.next.isEmpty()) {
                parent.end++;
                continue;
            }

            if (cur.visited) {
                parent.end += node.end;
                continue;
            }

            stack.push(new State(node, parent, true));

            for (Node next : node.next) {
                stack.push(new State(next, node, false));
            }
        }
    }

    private int getCnt(String word, Node node) {

        for (int i = 0; i < word.length(); i++) {

            char c = word.charAt(i);

            if (c == '?') {
                return node.end;
            }

            Node nextNode = null;

            for (Node next : node.next) {
                if (next.val == c) {
                    nextNode = next;
                    break;
                }
            }

            if (nextNode == null) {
                return 0;
            }

            node = nextNode;
        }

        return node.end;
    }
}