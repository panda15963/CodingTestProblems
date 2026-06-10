import java.util.*;

class Solution {

    private int[][] stMax;
    private int[][] stMin;
    private int[] log2;

    public long maxTotalValue(int[] nums, int k) {
        int n = nums.length;

        buildSparseTable(nums);

        PriorityQueue<Node> pq =
                new PriorityQueue<>((a, b) -> Long.compare(b.value, a.value));

        for (int l = 0; l < n; l++) {
            long v = rangeValue(l, n - 1);
            pq.offer(new Node(l, n - 1, v));
        }

        long ans = 0;

        while (k-- > 0) {
            Node cur = pq.poll();
            ans += cur.value;

            if (cur.r > cur.l) {
                int nr = cur.r - 1;
                pq.offer(new Node(
                        cur.l,
                        nr,
                        rangeValue(cur.l, nr)
                ));
            }
        }

        return ans;
    }

    private long rangeValue(int l, int r) {
        int len = r - l + 1;
        int p = log2[len];

        int mx = Math.max(
                stMax[p][l],
                stMax[p][r - (1 << p) + 1]
        );

        int mn = Math.min(
                stMin[p][l],
                stMin[p][r - (1 << p) + 1]
        );

        return (long) mx - mn;
    }

    private void buildSparseTable(int[] nums) {
        int n = nums.length;

        log2 = new int[n + 1];
        for (int i = 2; i <= n; i++) {
            log2[i] = log2[i >> 1] + 1;
        }

        int K = log2[n] + 1;

        stMax = new int[K][n];
        stMin = new int[K][n];

        for (int i = 0; i < n; i++) {
            stMax[0][i] = nums[i];
            stMin[0][i] = nums[i];
        }

        for (int k = 1; k < K; k++) {
            int len = 1 << k;

            for (int i = 0; i + len <= n; i++) {
                stMax[k][i] = Math.max(
                        stMax[k - 1][i],
                        stMax[k - 1][i + (len >> 1)]
                );

                stMin[k][i] = Math.min(
                        stMin[k - 1][i],
                        stMin[k - 1][i + (len >> 1)]
                );
            }
        }
    }

    static class Node {
        int l;
        int r;
        long value;

        Node(int l, int r, long value) {
            this.l = l;
            this.r = r;
            this.value = value;
        }
    }
}