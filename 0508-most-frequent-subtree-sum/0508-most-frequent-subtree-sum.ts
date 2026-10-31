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
 * Finds the most frequent subtree sum(s) in a binary tree
 * @param root - The root node of the binary tree
 * @returns An array of the most frequent subtree sum(s)
 */
function findFrequentTreeSum(root: TreeNode | null): number[] {
    // Map to store frequency count of each subtree sum
    const sumFrequencyMap = new Map<number, number>();
  
    // Track the maximum frequency encountered
    let maxFrequency = 0;
  
    /**
     * Performs depth-first search to calculate subtree sums
     * @param node - Current node being processed
     * @returns The sum of the current subtree
     */
    const calculateSubtreeSum = (node: TreeNode | null): number => {
        // Base case: empty node contributes 0 to the sum
        if (!node) {
            return 0;
        }
      
        // Recursively calculate left and right subtree sums
        const leftSubtreeSum = calculateSubtreeSum(node.left);
        const rightSubtreeSum = calculateSubtreeSum(node.right);
      
        // Calculate current subtree sum
        const currentSubtreeSum = node.val + leftSubtreeSum + rightSubtreeSum;
      
        // Update frequency map for current sum
        const currentFrequency = (sumFrequencyMap.get(currentSubtreeSum) ?? 0) + 1;
        sumFrequencyMap.set(currentSubtreeSum, currentFrequency);
      
        // Update maximum frequency if needed
        maxFrequency = Math.max(maxFrequency, currentFrequency);
      
        return currentSubtreeSum;
    };
  
    // Start DFS traversal from root
    calculateSubtreeSum(root);
  
    // Filter and return sums that have maximum frequency
    return Array.from(sumFrequencyMap.entries())
        .filter(([sum, frequency]) => frequency === maxFrequency)
        .map(([sum, frequency]) => sum);
}
