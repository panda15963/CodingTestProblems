import java.util.Arrays;

class Solution {

    static class Node {
        int val;
        int idx;

        Node(int val, int idx) {
            this.val = val;
            this.idx = idx;
        }
    }

    public int[] pathExistenceQueries(int n, int[] nums, int maxDiff, int[][] queries) {

        Node[] indexedNums = new Node[n];

        for (int i = 0; i < n; i++) {
            indexedNums[i] = new Node(nums[i], i);
        }

        Arrays.sort(indexedNums, (a, b) -> Integer.compare(a.val, b.val));

        int[] sortedPos = new int[n];

        for (int i = 0; i < n; i++) {
            sortedPos[indexedNums[i].idx] = i;
        }

        final int LOG = 18;
        int[][] st = new int[n][LOG];

        int r = 0;

        for (int i = 0; i < n; i++) {
            r = Math.max(r, i);

            while (r + 1 < n &&
                    indexedNums[r + 1].val - indexedNums[i].val <= maxDiff) {
                r++;
            }

            st[i][0] = r;
        }

        for (int j = 1; j < LOG; j++) {
            for (int i = 0; i < n; i++) {
                st[i][j] = st[st[i][j - 1]][j - 1];
            }
        }

        int[] answer = new int[queries.length];

        for (int q = 0; q < queries.length; q++) {

            int a = sortedPos[queries[q][0]];
            int b = sortedPos[queries[q][1]];

            if (a == b) {
                answer[q] = 0;
                continue;
            }

            if (a > b) {
                int temp = a;
                a = b;
                b = temp;
            }

            int cur = a;
            int steps = 0;

            for (int j = LOG - 1; j >= 0; j--) {
                if (st[cur][j] < b) {
                    cur = st[cur][j];
                    steps += (1 << j);
                }
            }

            if (st[cur][0] >= b) {
                answer[q] = steps + 1;
            } else {
                answer[q] = -1;
            }
        }

        return answer;
    }
}