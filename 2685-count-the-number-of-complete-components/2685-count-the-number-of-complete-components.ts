function countCompleteComponents(n: number, edges: number[][]): number {
    // Build adjacency list representation of the graph
    const adjacencyList: number[][] = Array(n).fill(null).map(() => []);
  
    for (const edge of edges) {
        const vertex1 = edge[0];
        const vertex2 = edge[1];
        adjacencyList[vertex1].push(vertex2);
        adjacencyList[vertex2].push(vertex1);
    }
  
    // Track visited vertices during DFS traversal
    const visited: boolean[] = Array(n).fill(false);
  
    // DFS function to explore a connected component
    // Returns: [vertexCount, edgeCount] in the component
    const dfs = (currentVertex: number): [number, number] => {
        visited[currentVertex] = true;
      
        // Initialize counts: 1 vertex (current), degree edges from current vertex
        let vertexCount = 1;
        let totalEdgeCount = adjacencyList[currentVertex].length;
      
        // Explore all neighbors
        for (const neighbor of adjacencyList[currentVertex]) {
            if (!visited[neighbor]) {
                const [neighborVertices, neighborEdges] = dfs(neighbor);
                vertexCount += neighborVertices;
                totalEdgeCount += neighborEdges;
            }
        }
      
        return [vertexCount, totalEdgeCount];
    };
  
    let completeComponentCount = 0;
  
    // Process each connected component
    for (let vertex = 0; vertex < n; vertex++) {
        if (!visited[vertex]) {
            const [componentVertices, componentEdges] = dfs(vertex);
          
            // Check if component is complete
            // In a complete graph with v vertices, there are v*(v-1)/2 edges
            // Since we count each edge twice (from both endpoints), we have v*(v-1) total
            if (componentVertices * (componentVertices - 1) === componentEdges) {
                completeComponentCount++;
            }
        }
    }
  
    return completeComponentCount;
}