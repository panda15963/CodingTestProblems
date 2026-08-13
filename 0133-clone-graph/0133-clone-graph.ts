/**
 * Definition for _Node.
 * class _Node {
 *     val: number
 *     neighbors: _Node[]
 *
 *     constructor(val?: number, neighbors?: _Node[]) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.neighbors = (neighbors===undefined ? [] : neighbors)
 *     }
 * }
 */

/**
 * Clones an undirected graph using depth-first search
 * @param node - The starting node of the graph to clone
 * @returns A deep copy of the graph starting from the given node
 */
function cloneGraph(node: _Node | null): _Node | null {
    // Map to store the mapping between original nodes and their clones
    // This prevents infinite recursion and ensures each node is cloned only once
    const visitedNodes: Map<_Node, _Node> = new Map();
  
    /**
     * Recursively clones a node and all its neighbors using DFS
     * @param currentNode - The node to clone
     * @returns The cloned node
     */
    const deepClone = (currentNode: _Node | null): _Node | null => {
        // Base case: if node is null, return null
        if (!currentNode) {
            return null;
        }
      
        // If node has already been cloned, return the existing clone
        if (visitedNodes.has(currentNode)) {
            return visitedNodes.get(currentNode)!;
        }
      
        // Create a new node with the same value as the original
        const clonedNode = new _Node(currentNode.val);
      
        // Mark this node as visited by storing the mapping
        visitedNodes.set(currentNode, clonedNode);
      
        // Recursively clone all neighbors and add them to the cloned node
        for (const neighbor of currentNode.neighbors) {
            clonedNode.neighbors.push(deepClone(neighbor)!);
        }
      
        return clonedNode;
    };
  
    // Start the cloning process from the given node
    return deepClone(node);
}
