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
 * Generates all structurally unique BSTs (binary search trees) that store values 1 to n
 * @param n - The number of nodes (1 to n) to generate BSTs with
 * @returns Array of all possible unique BST root nodes
 */
function generateTrees(n: number): Array<TreeNode | null> {
    /**
     * Recursively generates all possible BSTs with values from start to end
     * @param start - The starting value of the range (inclusive)
     * @param end - The ending value of the range (inclusive)
     * @returns Array of root nodes for all possible BSTs in the given range
     */
    const generateBSTsInRange = (start: number, end: number): Array<TreeNode | null> => {
        // Base case: if start > end, return array with null (empty tree)
        if (start > end) {
            return [null];
        }
      
        // Array to store all possible BST roots for this range
        const possibleTrees: Array<TreeNode | null> = [];
      
        // Try each value in the range as the root
        for (let rootValue = start; rootValue <= end; rootValue++) {
            // Generate all possible left subtrees (values less than root)
            const leftSubtrees: Array<TreeNode | null> = generateBSTsInRange(start, rootValue - 1);
          
            // Generate all possible right subtrees (values greater than root)
            const rightSubtrees: Array<TreeNode | null> = generateBSTsInRange(rootValue + 1, end);
          
            // Combine each left subtree with each right subtree
            for (const leftSubtree of leftSubtrees) {
                for (const rightSubtree of rightSubtrees) {
                    // Create a new tree with current root and the selected subtrees
                    const currentRoot: TreeNode = new TreeNode(rootValue, leftSubtree, rightSubtree);
                    possibleTrees.push(currentRoot);
                }
            }
        }
      
        return possibleTrees;
    };
  
    // Start generating BSTs with values from 1 to n
    return generateBSTsInRange(1, n);
}