import java.util.*;

class Solution {
    // Determine the maximum x-coordinate threshold based on the constraints
    private static final int MAX_X = Math.min(50000, 3 * 50000); 
    private int[] tree = new int[4 * (MAX_X + 2)];

    // Segment Tree: Update position `idx` with `val`
    private void update(int node, int start, int end, int idx, int val) {
        if (start == end) {
            tree[node] = val;
            return;
        }
        int mid = start + (end - start) / 2;
        if (idx <= mid) {
            update(2 * node, start, mid, idx, val);
        } else {
            update(2 * node + 1, mid + 1, end, idx, val);
        }
        tree[node] = Math.max(tree[2 * node], tree[2 * node + 1]);
    }

    // Segment Tree: Query maximum value in the range [L, R]
    private int query(int node, int start, int end, int L, int R) {
        if (L > end || R < start) {
            return 0;
        }
        if (L <= start && end <= R) {
            return tree[node];
        }
        int mid = start + (end - start) / 2;
        int leftMax = query(2 * node, start, mid, L, R);
        int rightMax = query(2 * node + 1, mid + 1, end, L, R);
        return Math.max(leftMax, rightMax);
    }

    public List<Boolean> getResults(int[][] queries) {
        List<Boolean> result = new ArrayList<>();
        
        // Track active obstacles on the number line
        TreeSet<Integer> obstacles = new TreeSet<>();
        obstacles.add(0);
        obstacles.add(MAX_X + 1);

        // Initially, the maximum space tracking array behaves as if there are no obstacles
        // The slot at `MAX_X + 1` handles the distance from 0 to the upper bound boundary
        update(1, 0, MAX_X + 1, MAX_X + 1, MAX_X + 1);

        for (int[] q : queries) {
            int type = q[0];
            if (type == 1) {
                int x = q[1];
                
                // Find adjacent obstacles relative to the new obstacle x
                int prev = obstacles.floor(x);
                int next = obstacles.ceiling(x);

                // Split the existing block interval: [prev, next] becomes [prev, x] and [x, next]
                update(1, 0, MAX_X + 1, x, x - prev);
                update(1, 0, MAX_X + 1, next, next - x);
                
                obstacles.add(x);
            } else if (type == 2) {
                int x = q[1];
                int sz = q[2];

                // 1. Check if the block fits in the largest space inside obstacles completely below x
                int maxInternalGap = query(1, 0, MAX_X + 1, 0, x);

                // 2. Check the remaining space between the last obstacle before x and x itself
                int lastObstacle = obstacles.floor(x);
                int trailingGap = x - lastObstacle;

                // Validate if any available interval meets the requested size constraint
                if (maxInternalGap >= sz || trailingGap >= sz) {
                    result.add(true);
                } else {
                    result.add(false);
                }
            }
        }
        return result;
    }
}
