import java.util.*;

class Solution {
    public List<Boolean> palindromePath(
            int n, int[][] edges, String s, String[] queries) {

        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            adj.add(new ArrayList<>());
        }

        for (int[] e : edges) {
            adj.get(e[0]).add(e[1]);
            adj.get(e[1]).add(e[0]);
        }

        TreeInfos treeInfos = new TreeInfos(adj);
        BIT bit = new BIT(n + 1);

        for (int u = 0; u < n; u++) {
            int diff = 1 << (s.charAt(u) - 'a');
            bit.add(treeInfos.left(u), diff);
            bit.add(treeInfos.right(u) + 1, diff);
        }

        char[] chars = s.toCharArray();
        List<Boolean> result = new ArrayList<>();

        for (String q : queries) {
            String[] parts = q.split("\\s+");
            String op = parts[0];
            int u = Integer.parseInt(parts[1]);

            if (op.equals("update")) {
                char c = parts[2].charAt(0);
                int diff = (1 << (chars[u] - 'a'))
                         ^ (1 << (c - 'a'));

                if (diff == 0) {
                    continue;
                }

                chars[u] = c;
                bit.add(treeInfos.left(u), diff);
                bit.add(treeInfos.right(u) + 1, diff);
            } else {
                int v = Integer.parseInt(parts[2]);
                int l = treeInfos.lca(u, v);

                int mask = bit.query(treeInfos.left(u))
                         ^ bit.query(treeInfos.left(v))
                         ^ (1 << (chars[l] - 'a'));

                result.add(mask == 0 || (mask & (mask - 1)) == 0);
            }
        }

        return result;
    }

    private static class BIT {
        private final int[] bit;

        BIT(int n) {
            bit = new int[n + 1];
        }

        void add(int i, int val) {
            i++;
            while (i < bit.length) {
                bit[i] ^= val;
                i += i & -i;
            }
        }

        int query(int i) {
            i++;
            int total = 0;

            while (i > 0) {
                total ^= bit[i];
                i -= i & -i;
            }

            return total;
        }
    }

    private static class TreeInfos {
        private final int[] left;
        private final int[] right;
        private final int[] depth;
        private final int[][] parent;
        private final int log;
        private int timer;

        TreeInfos(List<List<Integer>> adj) {
            int n = adj.size();

            log = 32 - Integer.numberOfLeadingZeros(Math.max(1, n));
            left = new int[n];
            right = new int[n];
            depth = new int[n];
            parent = new int[log][n];

            for (int i = 0; i < log; i++) {
                Arrays.fill(parent[i], -1);
            }

            int[] prev = new int[n];
            Arrays.fill(prev, -1);

            int[] stack = new int[n];
            int[] iter = new int[n];
            int top = 0;

            stack[top++] = 0;
            left[0] = timer++;

            while (top > 0) {
                int u = stack[top - 1];

                if (iter[u] < adj.get(u).size()) {
                    int v = adj.get(u).get(iter[u]++);

                    if (v == prev[u]) {
                        continue;
                    }

                    prev[v] = u;
                    depth[v] = depth[u] + 1;
                    parent[0][v] = u;

                    for (int j = 1; j < log; j++) {
                        int p = parent[j - 1][v];
                        if (p == -1) {
                            break;
                        }
                        parent[j][v] = parent[j - 1][p];
                    }

                    left[v] = timer++;
                    stack[top++] = v;
                } else {
                    right[u] = timer - 1;
                    top--;
                }
            }
        }

        boolean isAncestor(int a, int b) {
            return left[a] <= left[b] && right[b] <= right[a];
        }

        int lca(int a, int b) {
            if (depth[a] > depth[b]) {
                int temp = a;
                a = b;
                b = temp;
            }

            if (isAncestor(a, b)) {
                return a;
            }

            for (int j = log - 1; j >= 0; j--) {
                int p = parent[j][a];

                if (p != -1 && !isAncestor(p, b)) {
                    a = p;
                }
            }

            return parent[0][a];
        }

        int left(int u) {
            return left[u];
        }

        int right(int u) {
            return right[u];
        }
    }
}