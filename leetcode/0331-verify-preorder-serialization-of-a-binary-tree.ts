/**
 * Verifies if a given string represents a valid preorder traversal serialization of a binary tree.
 * Uses '#' to represent null nodes.
 * 
 * @param preorder - Comma-separated string representing the preorder traversal
 * @returns true if the serialization is valid, false otherwise
 */
function isValidSerialization(preorder: string): boolean {
    // Stack to track nodes during validation
    const nodeStack: string[] = [];
  
    // Split the preorder string by comma and process each node
    const nodes: string[] = preorder.split(',');
  
    for (const node of nodes) {
        // Push current node onto the stack
        nodeStack.push(node);
      
        // Collapse pattern: when we have "number, #, #" at the top of stack,
        // it represents a complete subtree that can be replaced with a single '#'
        while (
            nodeStack.length >= 3 && 
            nodeStack.at(-1) === '#' &&  // Right child is null
            nodeStack.at(-2) === '#' &&  // Left child is null
            nodeStack.at(-3) !== '#'      // Parent is a valid node (not null)
        ) {
            // Remove the parent and two null children, replace with single null
            nodeStack.splice(-3, 3, '#');
        }
    }
  
    // Valid serialization should result in exactly one '#' representing the entire tree
    return nodeStack.length === 1 && nodeStack[0] === '#';
}
