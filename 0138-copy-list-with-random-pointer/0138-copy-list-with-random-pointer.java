class Solution {
    private Map<Node, Node> visitedHash = new HashMap<>();

    public Node copyRandomList(Node head) {
        if (head == null) {
            return null;
        }

        if (visitedHash.containsKey(head)) {
            return visitedHash.get(head);
        }

        Node node = new Node(head.val);
        visitedHash.put(head, node);

        node.next = copyRandomList(head.next);
        node.random = copyRandomList(head.random);

        return node;
    }
}