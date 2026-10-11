/**
 * Definition for node.
 * class Node {
 *     val: number
 *     children: Node[]
 *     constructor(val?: number) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.children = []
 *     }
 * }
 */

/**
 * Performs level-order traversal of an N-ary tree and returns values grouped by level
 * @param root - The root node of the N-ary tree
 * @returns A 2D array where each sub-array contains values from the same level
 */
function levelOrder(root: Node | null): number[][] {
    // Initialize result array to store values by level
    const result: number[][] = [];
  
    // Handle empty tree case
    if (!root) {
        return result;
    }
  
    // Initialize queue with root node for BFS traversal
    const queue: Node[] = [root];
  
    // Process nodes level by level
    while (queue.length > 0) {
        // Store nodes for the next level
        const nextLevelNodes: Node[] = [];
        // Store values of current level
        const currentLevelValues: number[] = [];
      
        // Process all nodes in the current level
        for (const node of queue) {
            // Add all children to next level queue
            nextLevelNodes.push(...node.children);
            // Collect current node's value
            currentLevelValues.push(node.val);
        }
      
        // Add current level values to result
        result.push(currentLevelValues);
      
        // Replace queue contents with next level nodes
        queue.splice(0, queue.length, ...nextLevelNodes);
    }
  
    return result;
}
