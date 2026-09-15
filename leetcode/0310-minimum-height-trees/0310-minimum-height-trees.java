class Solution {
    public List<Integer> findMinHeightTrees(int n, int[][] edges) {
        // Special case: single node tree
        if (n == 1) {
            return List.of(0);
        }
      
        // Build adjacency list representation of the graph
        List<Integer>[] adjacencyList = new List[n];
        Arrays.setAll(adjacencyList, index -> new ArrayList<>());
      
        // Track degree (number of connections) for each node
        int[] nodeDegrees = new int[n];
      
        // Populate adjacency list and degree array
        for (int[] edge : edges) {
            int nodeA = edge[0];
            int nodeB = edge[1];
            adjacencyList[nodeA].add(nodeB);
            adjacencyList[nodeB].add(nodeA);
            nodeDegrees[nodeA]++;
            nodeDegrees[nodeB]++;
        }
      
        // Initialize queue with all leaf nodes (degree = 1)
        Deque<Integer> leafQueue = new ArrayDeque<>();
        for (int node = 0; node < n; ++node) {
            if (nodeDegrees[node] == 1) {
                leafQueue.offer(node);
            }
        }
      
        // Result list to store minimum height tree roots
        List<Integer> result = new ArrayList<>();
      
        // Iteratively remove leaf nodes layer by layer
        // The last remaining nodes are the centroids (MHT roots)
        while (!leafQueue.isEmpty()) {
            // Clear previous layer's nodes
            result.clear();
          
            // Process all nodes in current layer
            int currentLayerSize = leafQueue.size();
            for (int i = 0; i < currentLayerSize; ++i) {
                int currentNode = leafQueue.poll();
                result.add(currentNode);
              
                // Update neighbors and add new leaves to queue
                for (int neighbor : adjacencyList[currentNode]) {
                    nodeDegrees[neighbor]--;
                    if (nodeDegrees[neighbor] == 1) {
                        leafQueue.offer(neighbor);
                    }
                }
            }
        }
      
        return result;
    }
}
