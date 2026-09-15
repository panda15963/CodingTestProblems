/**
 * Finds all root nodes that minimize the height of the tree
 * Uses a topological sort approach by repeatedly removing leaf nodes
 * @param n - Number of nodes in the tree (0 to n-1)
 * @param edges - Array of edges representing undirected connections
 * @returns Array of node indices that form minimum height trees
 */
function findMinHeightTrees(n: number, edges: number[][]): number[] {
    // Handle edge case: single node tree
    if (n === 1) {
        return [0];
    }
  
    // Build adjacency list representation of the graph
    const adjacencyList: number[][] = Array.from({ length: n }, () => []);
    const nodeDegrees: number[] = Array(n).fill(0);
  
    // Populate adjacency list and calculate degrees for each node
    for (const [nodeA, nodeB] of edges) {
        adjacencyList[nodeA].push(nodeB);
        adjacencyList[nodeB].push(nodeA);
        nodeDegrees[nodeA]++;
        nodeDegrees[nodeB]++;
    }
  
    // Initialize queue with all leaf nodes (degree = 1)
    const leafQueue: number[] = [];
    for (let nodeIndex = 0; nodeIndex < n; nodeIndex++) {
        if (nodeDegrees[nodeIndex] === 1) {
            leafQueue.push(nodeIndex);
        }
    }
  
    // Process leaves layer by layer until we reach the center(s)
    const result: number[] = [];
    while (leafQueue.length > 0) {
        // Clear previous result as we only want the final center nodes
        result.length = 0;
        const nextLayerLeaves: number[] = [];
      
        // Process all current leaf nodes
        for (const currentLeaf of leafQueue) {
            result.push(currentLeaf);
          
            // Update degrees of neighbors and identify new leaves
            for (const neighbor of adjacencyList[currentLeaf]) {
                nodeDegrees[neighbor]--;
                if (nodeDegrees[neighbor] === 1) {
                    nextLayerLeaves.push(neighbor);
                }
            }
        }
      
        // Replace queue contents with next layer of leaves
        leafQueue.splice(0, leafQueue.length, ...nextLayerLeaves);
    }
  
    return result;
}
