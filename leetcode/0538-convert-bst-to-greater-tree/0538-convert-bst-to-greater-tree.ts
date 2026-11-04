/**
 * Definition for a binary tree node.
 */
interface TreeNode {
    val: number;
    left: TreeNode | null;
    right: TreeNode | null;
}

/**
 * Converts a Binary Search Tree to a Greater Sum Tree
 * where each node's value is replaced by the sum of all values greater than or equal to it.
 * 
 * @param root - The root node of the binary search tree
 * @returns The root of the modified tree (same reference, modified in-place)
 */
function convertBST(root: TreeNode | null): TreeNode | null {
    // Running sum to accumulate values during traversal
    let runningSum: number = 0;
  
    /**
     * Performs reverse in-order traversal (right -> node -> left)
     * to visit nodes in descending order and update their values
     * 
     * @param node - Current node being processed
     */
    function traverseAndUpdate(node: TreeNode | null): void {
        // Base case: if node is null, return
        if (!node) {
            return;
        }
      
        // Traverse right subtree first (larger values in BST)
        traverseAndUpdate(node.right);
      
        // Update running sum with current node's value
        runningSum += node.val;
      
        // Replace current node's value with the running sum
        node.val = runningSum;
      
        // Traverse left subtree (smaller values in BST)
        traverseAndUpdate(node.left);
    }
  
    // Start the traversal from root
    traverseAndUpdate(root);
  
    return root;
}
