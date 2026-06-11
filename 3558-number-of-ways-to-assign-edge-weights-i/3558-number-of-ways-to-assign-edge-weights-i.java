import java.util.*;

public class Solution {
    private int maxDepth = 0;

    public int assignEdgeWeights(int[][] edges) {
        // Find the maximum node index to determine the size of the adjacency list
        int n = 0;
        for (int[] edge : edges) {
            n = Math.max(n, Math.max(edge[0], edge[1]));
        }

        // Build the adjacency list for the undirected tree
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i <= n; i++) {
            adj.add(new ArrayList<>());
        }
        for (int[] edge : edges) {
            adj.get(edge[0]).add(edge[1]);
            adj.get(edge[1]).add(edge[0]);
        }

        // Start DFS from root node 1 with an initial depth of 0
        maxDepth = 0;
        dfs(1, -1, 0, adj);

        // If the tree is empty or maximum depth is 0
        if (maxDepth == 0) {
            return 0;
        }

        // Calculate 2^(maxDepth - 1) % (10^9 + 7)
        return power(2, maxDepth - 1, 1000000007);
    }

    private void dfs(int node, int parent, int currentDepth, List<List<Integer>> adj) {
        maxDepth = Math.max(maxDepth, currentDepth);

        // Check bounds to prevent errors if node index exceeds list size
        if (node >= adj.size()) return;

        for (int neighbor : adj.get(node)) {
            if (neighbor != parent) {
                dfs(neighbor, node, currentDepth + 1, adj);
            }
        }
    }

    // Binary exponentiation helper function
    private int power(long base, long exp, int mod) {
        long res = 1;
        base %= mod;
        while (exp > 0) {
            if ((exp & 1) == 1) {
                res = (res * base) % mod;
            }
            base = (base * base) % mod;
            exp >>= 1;
        }
        return (int) res;
    }
}
