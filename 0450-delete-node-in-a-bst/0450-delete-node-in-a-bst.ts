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
 * Deletes a node with the specified key from a Binary Search Tree
 * @param root - The root of the binary search tree
 * @param key - The value of the node to be deleted
 * @returns The root of the modified tree
 */
function deleteNode(root: TreeNode | null, key: number): TreeNode | null {
    // Base case: empty tree
    if (root === null) {
        return root;
    }
  
    const { val: currentValue, left: leftChild, right: rightChild } = root;
  
    // Search for the node to delete in the left subtree
    if (currentValue > key) {
        root.left = deleteNode(leftChild, key);
    } 
    // Search for the node to delete in the right subtree
    else if (currentValue < key) {
        root.right = deleteNode(rightChild, key);
    } 
    // Found the node to delete
    else {
        // Case 1: Node has no children (leaf node)
        if (leftChild === null && rightChild === null) {
            root = null;
        } 
        // Case 2: Node has only one child
        else if (leftChild === null || rightChild === null) {
            root = leftChild || rightChild;
        } 
        // Case 3: Node has two children
        else {
            // Special case: right child has no left subtree
            if (rightChild.left === null) {
                rightChild.left = leftChild;
                root = rightChild;
            } 
            // General case: find inorder successor (minimum node in right subtree)
            else {
                // Find the parent of the minimum node in the right subtree
                let parentOfMinNode: TreeNode = rightChild;
                while (parentOfMinNode.left.left !== null) {
                    parentOfMinNode = parentOfMinNode.left;
                }
              
                // Replace current node's value with the minimum value
                const minimumValue: number = parentOfMinNode.left.val;
                root.val = minimumValue;
              
                // Delete the minimum node from its original position
                parentOfMinNode.left = deleteNode(parentOfMinNode.left, minimumValue);
            }
        }
    }
  
    return root;
}
