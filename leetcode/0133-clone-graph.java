/*
// Definition for a Node.
class Node {
    public int val;
    public List<Node> neighbors;
    public Node() {
        val = 0;
        neighbors = new ArrayList<Node>();
    }
    public Node(int _val) {
        val = _val;
        neighbors = new ArrayList<Node>();
    }
    public Node(int _val, ArrayList<Node> _neighbors) {
        val = _val;
        neighbors = _neighbors;
    }
}
*/

class Solution {
    // HashMap to store the mapping from original nodes to cloned nodes
    // This prevents infinite loops and ensures each node is cloned only once
    private Map<Node, Node> visitedNodes = new HashMap<>();

    /**
     * Clones an undirected graph given a reference node
     * @param node The starting node of the graph to be cloned
     * @return The starting node of the cloned graph
     */
    public Node cloneGraph(Node node) {
        return deepFirstSearch(node);
    }

    /**
     * Performs depth-first search to clone the graph recursively
     * @param node The current node being processed
     * @return The cloned version of the current node
     */
    private Node deepFirstSearch(Node node) {
        // Base case: if node is null, return null
        if (node == null) {
            return null;
        }
      
        // Check if this node has already been cloned
        Node clonedNode = visitedNodes.get(node);
      
        // If the node hasn't been cloned yet, create a new clone
        if (clonedNode == null) {
            // Create a new node with the same value as the original
            clonedNode = new Node(node.val);
          
            // Mark this node as visited by storing the mapping
            visitedNodes.put(node, clonedNode);
          
            // Recursively clone all neighbors and add them to the cloned node
            for (Node neighbor : node.neighbors) {
                clonedNode.neighbors.add(deepFirstSearch(neighbor));
            }
        }
      
        // Return the cloned node
        return clonedNode;
    }
}