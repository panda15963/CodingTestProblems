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
 * Performs bottom-up level order traversal of a binary tree
 * Returns the values of nodes level by level from bottom to top
 * @param root - The root node of the binary tree
 * @returns A 2D array where each sub-array contains node values at each level (bottom to top)
 */
function levelOrderBottom(root: TreeNode | null): number[][] {
    // Initialize result array to store level-wise node values
    const result: number[][] = [];
  
    // Handle empty tree case
    if (!root) {
        return result;
    }
  
    // Initialize queue with root node for BFS traversal
    const queue: TreeNode[] = [root];
  
    // Process nodes level by level
    while (queue.length > 0) {
        // Array to store current level's node values
        const currentLevel: number[] = [];
        // Temporary queue to store next level's nodes
        const nextLevelQueue: TreeNode[] = [];
      
        // Process all nodes in the current level
        for (const node of queue) {
            // Destructure node properties
            const { val, left, right } = node;
          
            // Add current node's value to current level array
            currentLevel.push(val);
          
            // Add left child to next level queue if it exists
            if (left) {
                nextLevelQueue.push(left);
            }
          
            // Add right child to next level queue if it exists
            if (right) {
                nextLevelQueue.push(right);
            }
        }
      
        // Add current level values to result
        result.push(currentLevel);
      
        // Replace queue contents with next level nodes
        queue.splice(0, queue.length, ...nextLevelQueue);
    }
  
    // Reverse the result to get bottom-up order
    return result.reverse();
}
