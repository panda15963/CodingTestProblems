/**
 * Definition for a binary tree node.
 */
interface TreeNode {
    val: number;
    left: TreeNode | null;
    right: TreeNode | null;
}

/**
 * Calculates the average value of nodes at each level of a binary tree
 * @param root - The root node of the binary tree
 * @returns An array containing the average values for each level
 */
function averageOfLevels(root: TreeNode): number[] {
    // Initialize queue with root node for level-order traversal
    const queue: TreeNode[] = [root];
  
    // Array to store the average values for each level
    const averages: number[] = [];
  
    // Process each level of the tree
    while (queue.length > 0) {
        // Store the number of nodes at current level
        const levelSize: number = queue.length;
      
        // Array to store nodes for the next level
        const nextLevelNodes: TreeNode[] = [];
      
        // Sum of all node values at current level
        let levelSum: number = 0;
      
        // Process all nodes at current level
        for (const node of queue) {
            // Add current node's value to level sum
            levelSum += node.val;
          
            // Add left child to next level if it exists
            if (node.left) {
                nextLevelNodes.push(node.left);
            }
          
            // Add right child to next level if it exists
            if (node.right) {
                nextLevelNodes.push(node.right);
            }
        }
      
        // Calculate and store the average for current level
        averages.push(levelSum / levelSize);
      
        // Replace current level nodes with next level nodes
        queue.splice(0, queue.length, ...nextLevelNodes);
    }
  
    return averages;
}
