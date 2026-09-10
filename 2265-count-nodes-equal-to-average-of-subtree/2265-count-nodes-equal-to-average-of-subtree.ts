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
 * Counts the number of nodes whose value equals the floor of the average of values in its subtree
 * @param root - The root node of the binary tree
 * @returns The count of nodes that satisfy the condition
 */
function averageOfSubtree(root: TreeNode | null): number {
    let resultCount: number = 0;
  
    /**
     * Performs depth-first search to calculate sum and count of nodes in each subtree
     * @param node - The current node being processed
     * @returns A tuple containing [sum of values in subtree, count of nodes in subtree]
     */
    const calculateSubtreeInfo = (node: TreeNode | null): [number, number] => {
        // Base case: empty node contributes 0 sum and 0 count
        if (!node) {
            return [0, 0];
        }
      
        // Recursively get sum and count from left subtree
        const [leftSum, leftCount] = calculateSubtreeInfo(node.left);
      
        // Recursively get sum and count from right subtree
        const [rightSum, rightCount] = calculateSubtreeInfo(node.right);
      
        // Calculate total sum including current node
        const totalSum: number = leftSum + rightSum + node.val;
      
        // Calculate total count including current node
        const totalCount: number = leftCount + rightCount + 1;
      
        // Check if current node's value equals the floor of average
        if (Math.floor(totalSum / totalCount) === node.val) {
            resultCount++;
        }
      
        // Return sum and count for parent's calculation
        return [totalSum, totalCount];
    };
  
    // Start the DFS traversal from root
    calculateSubtreeInfo(root);
  
    return resultCount;
}
