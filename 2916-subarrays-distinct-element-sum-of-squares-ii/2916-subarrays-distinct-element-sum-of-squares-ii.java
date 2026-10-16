class Solution {
    private static final long MOD = 1_000_000_007L;

    private static class Node {
        long countTotal = 0;
        long sqTotal = 0;
        long lazy = 0;
        Node left = null;
        Node right = null;
    }

    private static class ST {
        Node root = new Node();

        private void push(int left, int right, Node node) {
            if (node.left == null) {
                node.left = new Node();
            }
            if (node.right == null) {
                node.right = new Node();
            }

            if (node.lazy != 0) {
                long length = right - left + 1L;
                long lazy = node.lazy;

                node.sqTotal = (
                    node.sqTotal
                    + 2L * lazy % MOD * node.countTotal % MOD
                    + length % MOD * lazy % MOD * lazy % MOD
                ) % MOD;

                node.countTotal = (
                    node.countTotal + length % MOD * lazy % MOD
                ) % MOD;

                if (left != right) {
                    node.left.lazy += lazy;
                    node.right.lazy += lazy;
                }

                node.lazy = 0;
            }
        }

        void update(int left, int right, Node node, int ql, int qr) {
            push(left, right, node);

            if (qr < left || right < ql) {
                return;
            }

            if (ql <= left && right <= qr) {
                node.lazy++;
                push(left, right, node);
                return;
            }

            int mid = left + (right - left) / 2;

            update(left, mid, node.left, ql, qr);
            update(mid + 1, right, node.right, ql, qr);

            node.countTotal = (
                node.left.countTotal + node.right.countTotal
            ) % MOD;

            node.sqTotal = (
                node.left.sqTotal + node.right.sqTotal
            ) % MOD;
        }
    }

    public int sumCounts(int[] nums) {
        int n = nums.length;
        ST st = new ST();

        java.util.Map<Integer, Integer> lastSeen = new java.util.HashMap<>();
        long ans = 0;

        for (int i = 0; i < n; i++) {
            int last = lastSeen.getOrDefault(nums[i], -1);

            st.update(0, n - 1, st.root, last + 1, i);

            lastSeen.put(nums[i], i);
            ans = (ans + st.root.sqTotal) % MOD;
        }

        return (int) ans;
    }
}