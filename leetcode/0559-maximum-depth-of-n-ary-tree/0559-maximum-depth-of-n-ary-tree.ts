/**
 * Definition for _Node.
 * class _Node {
 *     val: number
 *     children: _Node[]
 *
 *     constructor(val?: number, children?: _Node[]) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.children = (children===undefined ? [] : children)
 *     }
 * }
 */

/**
 * Calculates the maximum depth of an n-ary tree
 * @param root - The root node of the n-ary tree
 * @returns The maximum depth of the tree (number of nodes along the longest path from root to leaf)
 */
function maxDepth(root: _Node | null): number {
    // Base case: if the tree is empty, depth is 0
    if (!root) {
        return 0;
    }
  
    // If the node has no children, it's a leaf node with depth 1
    if (root.children.length === 0) {
        return 1;
    }
  
    // Recursively calculate the depth of each child subtree
    const childDepths: number[] = root.children.map((child: _Node) => maxDepth(child));
  
    // The depth of current node is 1 plus the maximum depth among all children
    const maxChildDepth: number = Math.max(...childDepths);
  
    return 1 + maxChildDepth;
}
