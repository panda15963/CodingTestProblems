/**
 * Definition for Node.
 * class Node {
 *     val: number
 *     left: Node | null
 *     right: Node | null
 *     next: Node | null
 *     constructor(val?: number, left?: Node, right?: Node, next?: Node) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

/**
 * Connects each node to its next right node in the same level of a binary tree.
 * Uses level-order traversal (BFS) to process nodes level by level.
 * 
 * @param root - The root node of the binary tree
 * @returns The root of the modified tree with next pointers set
 */
function connect(root: Node | null): Node | null {
    // Handle empty tree case
    if (!root) {
        return null;
    }
  
    // Initialize queue with root node for BFS traversal
    const currentLevelQueue: Node[] = [root];
  
    // Process tree level by level
    while (currentLevelQueue.length > 0) {
        // Queue to store nodes of the next level
        const nextLevelQueue: Node[] = [];
      
        // Previous node in the current level for linking
        let previousNode: Node | null = null;
      
        // Process all nodes in the current level
        for (const currentNode of currentLevelQueue) {
            // Link previous node to current node if exists
            if (previousNode) {
                previousNode.next = currentNode;
            }
          
            // Update previous node reference
            previousNode = currentNode;
          
            // Add children to next level queue if they exist
            const { left, right } = currentNode;
            if (left) {
                nextLevelQueue.push(left);
            }
            if (right) {
                nextLevelQueue.push(right);
            }
        }
      
        // Replace current level queue with next level queue
        currentLevelQueue.splice(0, currentLevelQueue.length, ...nextLevelQueue);
    }
  
    return root;
}