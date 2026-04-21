class Solution {
    // Parent array for Union-Find (Disjoint Set Union) data structure
    private int[] parent;

    public int minimumHammingDistance(int[] source, int[] target, int[][] allowedSwaps) {
        int n = source.length;
      
        // Initialize Union-Find: each element is its own parent initially
        parent = new int[n];
        for (int i = 0; i < n; i++) {
            parent[i] = i;
        }
      
        // Union operation: connect indices that can be swapped
        // All indices in the same connected component can be freely rearranged
        for (int[] swap : allowedSwaps) {
            int index1 = swap[0];
            int index2 = swap[1];
            parent[find(index1)] = find(index2);
        }
      
        // Map to store frequency of values in each connected component
        // Key: root of component, Value: map of (value -> frequency) in source array
        Map<Integer, Map<Integer, Integer>> componentFrequency = new HashMap<>();
      
        // Count frequency of each value in source array for each component
        for (int i = 0; i < n; i++) {
            int root = find(i);
            componentFrequency
                .computeIfAbsent(root, k -> new HashMap<>())
                .merge(source[i], 1, Integer::sum);
        }
      
        // Calculate minimum Hamming distance
        int hammingDistance = 0;
      
        // For each position in target array, check if the value can be matched
        // by swapping within the same connected component
        for (int i = 0; i < n; i++) {
            int root = find(i);
            Map<Integer, Integer> frequencyMap = componentFrequency.get(root);
          
            // Decrement frequency of target[i] in the component
            // If frequency becomes negative, it means this value cannot be matched
            if (frequencyMap.merge(target[i], -1, Integer::sum) < 0) {
                hammingDistance++;
            }
        }
      
        return hammingDistance;
    }

    // Find operation with path compression for Union-Find
    private int find(int x) {
        if (parent[x] != x) {
            // Path compression: make all nodes point directly to root
            parent[x] = find(parent[x]);
        }
        return parent[x];
    }
}