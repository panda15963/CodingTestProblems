/*
// Definition for a QuadTree node.
class Node {
    public boolean val;
    public boolean isLeaf;
    public Node topLeft;
    public Node topRight;
    public Node bottomLeft;
    public Node bottomRight;

    public Node() {}

    public Node(boolean _val, boolean _isLeaf, Node _topLeft, Node _topRight, 
                Node _bottomLeft, Node _bottomRight) {
        val = _val;
        isLeaf = _isLeaf;
        topLeft = _topLeft;
        topRight = _topRight;
        bottomLeft = _bottomLeft;
        bottomRight = _bottomRight;
    }
};
*/

class Solution {
    /**
     * Performs logical OR intersection of two quad trees.
     * @param quadTree1 First quad tree
     * @param quadTree2 Second quad tree
     * @return The resulting quad tree after intersection
     */
    public Node intersect(Node quadTree1, Node quadTree2) {
        return performIntersection(quadTree1, quadTree2);
    }

    /**
     * Recursively performs the intersection operation on two quad tree nodes.
     * @param node1 First quad tree node
     * @param node2 Second quad tree node
     * @return The intersected node
     */
    private Node performIntersection(Node node1, Node node2) {
        // Case 1: Both nodes are leaves - perform OR operation on their values
        if (node1.isLeaf && node2.isLeaf) {
            return new Node(node1.val || node2.val, true);
        }
      
        // Case 2: First node is a leaf
        if (node1.isLeaf) {
            // If node1's value is true (1), the entire region is 1, return node1
            // Otherwise, return node2's structure
            return node1.val ? node1 : node2;
        }
      
        // Case 3: Second node is a leaf
        if (node2.isLeaf) {
            // If node2's value is true (1), the entire region is 1, return node2
            // Otherwise, return node1's structure
            return node2.val ? node2 : node1;
        }
      
        // Case 4: Both nodes have children - recursively intersect all quadrants
        Node resultNode = new Node();
        resultNode.topLeft = performIntersection(node1.topLeft, node2.topLeft);
        resultNode.topRight = performIntersection(node1.topRight, node2.topRight);
        resultNode.bottomLeft = performIntersection(node1.bottomLeft, node2.bottomLeft);
        resultNode.bottomRight = performIntersection(node1.bottomRight, node2.bottomRight);
      
        // Check if all four children are leaves
        boolean allChildrenAreLeaves = resultNode.topLeft.isLeaf && 
                                       resultNode.topRight.isLeaf && 
                                       resultNode.bottomLeft.isLeaf && 
                                       resultNode.bottomRight.isLeaf;
      
        // Check if all four children have the same value
        boolean allChildrenHaveSameValue = resultNode.topLeft.val == resultNode.topRight.val &&
                                           resultNode.topRight.val == resultNode.bottomLeft.val && 
                                           resultNode.bottomLeft.val == resultNode.bottomRight.val;
      
        // If all children are leaves with the same value, merge them into a single leaf node
        if (allChildrenAreLeaves && allChildrenHaveSameValue) {
            resultNode = resultNode.topLeft;
        }
      
        return resultNode;
    }
}
