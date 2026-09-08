class Solution {

    private long[] tree = new long[100000];
    private int lastnode = 1;

    public void push(long data) {
        lastnode++;
        tree[lastnode] = data;

        int child = lastnode;
        int parent = child / 2;

        // 위로 이동하면서 최소 힙 유지
        while (parent > 0) {
            if (tree[parent] > tree[child]) {
                long temp = tree[parent];
                tree[parent] = tree[child];
                tree[child] = temp;

                child = parent;
                parent = child / 2;
            } else {
                break;
            }
        }
    }

    public long pop() {
        long result = tree[1];

        // 마지막 노드를 루트로 이동
        tree[1] = tree[lastnode];
        lastnode--;

        int parent = 1;
        int left = 2;
        int right = 3;

        // 아래로 이동하면서 최소 힙 유지
        while (left <= lastnode) {
            int child;

            if (left == lastnode) {
                child = left;
            } else if (tree[left] <= tree[right]) {
                child = left;
            } else {
                child = right;
            }

            if (tree[child] < tree[parent]) {
                long temp = tree[parent];
                tree[parent] = tree[child];
                tree[child] = temp;

                parent = child;
                left = parent * 2;
                right = left + 1;
            } else {
                break;
            }
        }

        return result;
    }

    public int nthUglyNumber(int n) {
        tree[1] = 1;

        long last = 0;

        while (true) {
            long value = pop();

            // 중복 제거
            if (last != value) {
                n--;

                if (n == 0) {
                    return (int) value;
                }

                // 불필요한 오버플로우 방지를 위해 long 사용
                push(value * 2);
                push(value * 3);
                push(value * 5);

                last = value;
            }
        }
    }
}