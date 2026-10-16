function sumCounts(nums: number[]): number {
    const MOD = 1_000_000_007;

    class Node {
        countTotal: number = 0;
        sqTotal: number = 0;
        lazy: number = 0;
        left: Node | null = null;
        right: Node | null = null;
    }

    class ST {
        root: Node;

        constructor() {
            this.root = new Node();
        }

        push(left: number, right: number, node: Node): void {
            if (node.left === null) {
                node.left = new Node();
            }

            if (node.right === null) {
                node.right = new Node();
            }

            if (node.lazy !== 0) {
                const length = right - left + 1;
                const lazy = node.lazy;

                node.sqTotal = (
                    node.sqTotal
                    + (2 * lazy % MOD) * node.countTotal % MOD
                    + (length % MOD) * lazy % MOD * lazy % MOD
                ) % MOD;

                node.countTotal = (
                    node.countTotal + (length % MOD) * lazy % MOD
                ) % MOD;

                if (left !== right) {
                    node.left.lazy += lazy;
                    node.right.lazy += lazy;
                }

                node.lazy = 0;
            }
        }

        update(
            left: number,
            right: number,
            node: Node,
            ql: number,
            qr: number
        ): void {
            this.push(left, right, node);

            if (qr < left || right < ql) {
                return;
            }

            if (ql <= left && right <= qr) {
                node.lazy++;
                this.push(left, right, node);
                return;
            }

            const mid = Math.floor((left + right) / 2);

            this.update(left, mid, node.left!, ql, qr);
            this.update(mid + 1, right, node.right!, ql, qr);

            node.countTotal = (
                node.left!.countTotal + node.right!.countTotal
            ) % MOD;

            node.sqTotal = (
                node.left!.sqTotal + node.right!.sqTotal
            ) % MOD;
        }
    }

    const n = nums.length;
    const st = new ST();
    const lastSeen = new Map<number, number>();

    let ans = 0;

    for (let i = 0; i < n; i++) {
        const last = lastSeen.get(nums[i]) ?? -1;

        st.update(0, n - 1, st.root, last + 1, i);

        lastSeen.set(nums[i], i);
        ans = (ans + st.root.sqTotal) % MOD;
    }

    return ans;
}