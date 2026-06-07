/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

/**
 * Creates a binary tree from parent-child relationship descriptions
 * @param descriptions - Array of [parent, child, isLeft] tuples where:
 *                      parent: parent node value
 *                      child: child node value
 *                      isLeft: 1 if child is left child, 0 if right child
 * @returns The root node of the constructed binary tree
 */
function createBinaryTree(descriptions: number[][]): TreeNode | null {
    // Map to store all nodes by their values
    const nodeMap: Map<number, TreeNode> = new Map<number, TreeNode>();
  
    // Set to track all nodes that are children (not root)
    const childNodeValues: Set<number> = new Set<number>();
  
    // Process each parent-child relationship
    for (const [parentValue, childValue, isLeftChild] of descriptions) {
        // Create parent node if it doesn't exist
        if (!nodeMap.has(parentValue)) {
            nodeMap.set(parentValue, new TreeNode(parentValue));
        }
      
        // Create child node if it doesn't exist
        if (!nodeMap.has(childValue)) {
            nodeMap.set(childValue, new TreeNode(childValue));
        }
      
        // Establish parent-child relationship
        const parentNode: TreeNode = nodeMap.get(parentValue)!;
        const childNode: TreeNode = nodeMap.get(childValue)!;
      
        if (isLeftChild === 1) {
            parentNode.left = childNode;
        } else {
            parentNode.right = childNode;
        }
      
        // Mark this value as a child node
        childNodeValues.add(childValue);
    }
  
    // Find and return the root node (node that is not a child of any other node)
    for (const [nodeValue, node] of nodeMap) {
        if (!childNodeValues.has(nodeValue)) {
            return node;
        }
    }
  
    // Should not reach here if input is valid
    return null;
}
