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
 * Finds the largest value in each level of a binary tree
 * @param root - The root node of the binary tree
 * @returns An array containing the maximum value from each level
 */
function largestValues(root: TreeNode | null): number[] {
    // Initialize result array to store maximum values from each level
    const result: number[] = [];
  
    // Handle empty tree case
    if (!root) {
        return result;
    }
  
    // Initialize queue for BFS traversal with the root node
    const currentLevelQueue: TreeNode[] = [root];
  
    // Process tree level by level
    while (currentLevelQueue.length > 0) {
        // Queue to store nodes for the next level
        const nextLevelQueue: TreeNode[] = [];
        // Track maximum value in current level
        let maxValueInLevel: number = -Infinity;
      
        // Process all nodes in the current level
        for (const node of currentLevelQueue) {
            // Update maximum value for this level
            maxValueInLevel = Math.max(maxValueInLevel, node.val);
          
            // Add left child to next level queue if it exists
            if (node.left) {
                nextLevelQueue.push(node.left);
            }
          
            // Add right child to next level queue if it exists
            if (node.right) {
                nextLevelQueue.push(node.right);
            }
        }
      
        // Store the maximum value from current level
        result.push(maxValueInLevel);
      
        // Clear current queue and move to next level
        currentLevelQueue.length = 0;
        currentLevelQueue.push(...nextLevelQueue);
    }
  
    return result;
}
