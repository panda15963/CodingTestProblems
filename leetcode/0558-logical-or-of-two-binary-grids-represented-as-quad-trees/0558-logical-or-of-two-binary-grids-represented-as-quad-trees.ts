/*
// Definition for a QuadTree node.
class Node {
    val: boolean;
    isLeaf: boolean;
    topLeft: Node | null;
    topRight: Node | null;
    bottomLeft: Node | null;
    bottomRight: Node | null;

    constructor(
        val?: boolean,
        isLeaf?: boolean,
        topLeft?: Node | null,
        topRight?: Node | null,
        bottomLeft?: Node | null,
        bottomRight?: Node | null
    ) {
        this.val = val === undefined ? false : val;
        this.isLeaf = isLeaf === undefined ? false : isLeaf;
        this.topLeft = topLeft === undefined ? null : topLeft;
        this.topRight = topRight === undefined ? null : topRight;
        this.bottomLeft = bottomLeft === undefined ? null : bottomLeft;
        this.bottomRight = bottomRight === undefined ? null : bottomRight;
    }
}
*/

/**
 * Performs logical OR operation on two quadtrees.
 * @param quadTree1 - First quadtree
 * @param quadTree2 - Second quadtree
 * @returns A new quadtree representing the logical OR of the two input quadtrees
 */
function intersect(quadTree1: Node | null, quadTree2: Node | null): Node | null {
    return mergeQuadTrees(quadTree1, quadTree2);
}

/**
 * Recursively merges two quadtree nodes using logical OR operation.
 * @param node1 - First quadtree node
 * @param node2 - Second quadtree node
 * @returns Merged quadtree node
 */
function mergeQuadTrees(node1: Node | null, node2: Node | null): Node | null {
    // Handle null cases
    if (!node1 || !node2) {
        return null;
    }
  
    // Case 1: Both nodes are leaf nodes
    // Return a new leaf node with OR of their values
    if (node1.isLeaf && node2.isLeaf) {
        return new Node(node1.val || node2.val, true);
    }
  
    // Case 2: First node is a leaf
    // If it's true (all 1s), return it; otherwise return the second node
    if (node1.isLeaf) {
        return node1.val ? node1 : node2;
    }
  
    // Case 3: Second node is a leaf
    // If it's true (all 1s), return it; otherwise return the first node
    if (node2.isLeaf) {
        return node2.val ? node2 : node1;
    }
  
    // Case 4: Both nodes are internal nodes
    // Recursively merge all four quadrants
    const topLeft = mergeQuadTrees(node1.topLeft, node2.topLeft);
    const topRight = mergeQuadTrees(node1.topRight, node2.topRight);
    const bottomLeft = mergeQuadTrees(node1.bottomLeft, node2.bottomLeft);
    const bottomRight = mergeQuadTrees(node1.bottomRight, node2.bottomRight);
  
    // Check if all children exist and are leaves with the same value
    const allChildrenExist = topLeft && topRight && bottomLeft && bottomRight;
  
    if (allChildrenExist) {
        const allChildrenAreLeaves = topLeft.isLeaf && 
                                     topRight.isLeaf && 
                                     bottomLeft.isLeaf && 
                                     bottomRight.isLeaf;
      
        const allChildrenHaveSameValue = topLeft.val === topRight.val && 
                                         topRight.val === bottomLeft.val && 
                                         bottomLeft.val === bottomRight.val;
      
        // If all children are leaves with the same value, merge them into a single leaf
        if (allChildrenAreLeaves && allChildrenHaveSameValue) {
            return new Node(topLeft.val, true);
        }
    }
  
    // Create a new internal node with the merged children
    const mergedNode = new Node(false, false, topLeft, topRight, bottomLeft, bottomRight);
    return mergedNode;
}
