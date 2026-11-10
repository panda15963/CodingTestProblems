/*
// Definition for a Node.
class Node {
    public int val;
    public List<Node> children;

    public Node() {}

    public Node(int _val) {
        val = _val;
    }

    public Node(int _val, List<Node> _children) {
        val = _val;
        children = _children;
    }
};
*/

class Solution {
    /**
     * Calculates the maximum depth of an n-ary tree.
     * The depth is defined as the number of nodes along the longest path 
     * from the root node down to the farthest leaf node.
     * 
     * @param root The root node of the n-ary tree
     * @return The maximum depth of the tree
     */
    public int maxDepth(Node root) {
        // Base case: if the tree is empty, return depth of 0
        if (root == null) {
            return 0;
        }
      
        // Initialize variable to track the maximum depth among all children
        int maxChildDepth = 0;
      
        // Recursively calculate the depth of each child subtree
        for (Node child : root.children) {
            // Update the maximum depth if current child's depth is greater
            maxChildDepth = Math.max(maxChildDepth, maxDepth(child));
        }
      
        // Return the maximum child depth plus 1 (for the current node)
        return 1 + maxChildDepth;
    }
}
