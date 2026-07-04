/**
 * Finds the minimum score (edge weight) in the connected component containing node 1
 * @param n - Number of nodes in the graph (nodes are labeled from 1 to n)
 * @param roads - Array of roads where each road is [nodeA, nodeB, distance]
 * @returns The minimum edge weight in the connected component containing node 1
 */
function minScore(n: number, roads: number[][]): number {
    // Track visited nodes to avoid revisiting during DFS
    const visited: boolean[] = new Array(n + 1).fill(false);
  
    // Build adjacency list representation of the graph
    // Index represents node number, value is array of [neighborNode, edgeWeight] pairs
    const adjacencyList: Array<Array<[number, number]>> = Array.from(
        { length: n + 1 }, 
        () => []
    );
  
    // Populate the adjacency list with bidirectional edges
    for (const [nodeA, nodeB, edgeWeight] of roads) {
        adjacencyList[nodeA].push([nodeB, edgeWeight]);
        adjacencyList[nodeB].push([nodeA, edgeWeight]);
    }
  
    // Initialize minimum score to infinity
    let minimumScore: number = Infinity;
  
    /**
     * Depth-first search to explore all nodes in the connected component
     * Updates the minimum score as it traverses edges
     * @param currentNode - The current node being explored
     */
    const dfs = (currentNode: number): void => {
        // Skip if node has already been visited
        if (visited[currentNode]) {
            return;
        }
      
        // Mark current node as visited
        visited[currentNode] = true;
      
        // Explore all neighbors of the current node
        for (const [neighborNode, edgeWeight] of adjacencyList[currentNode]) {
            // Update minimum score if current edge weight is smaller
            minimumScore = Math.min(minimumScore, edgeWeight);
            // Recursively explore the neighbor node
            dfs(neighborNode);
        }
    };
  
    // Start DFS from node 1
    dfs(1);
  
    return minimumScore;
}