var palindromePath = function(n, edges, s, queries) {
    const adj = Array.from({ length: n }, () => []);

    for (const [u, v] of edges) {
        adj[u].push(v);
        adj[v].push(u);
    }

    const tree = new TreeInfos(adj);
    const bit = new BIT(n + 1);
    const chars = s.split("");

    for (let u = 0; u < n; u++) {
        const mask = 1 << (chars[u].charCodeAt(0) - 97);
        bit.add(tree.left(u), mask);
        bit.add(tree.right(u) + 1, mask);
    }

    const result = [];

    for (const q of queries) {
        const parts = q.trim().split(/\s+/);
        const op = parts[0];
        const u = Number(parts[1]);

        if (op === "update") {
            const c = parts[2];
            const diff =
                (1 << (chars[u].charCodeAt(0) - 97)) ^
                (1 << (c.charCodeAt(0) - 97));

            if (diff === 0) continue;

            chars[u] = c;
            bit.add(tree.left(u), diff);
            bit.add(tree.right(u) + 1, diff);
        } else {
            const v = Number(parts[2]);
            const l = tree.lca(u, v);

            const mask =
                bit.query(tree.left(u)) ^
                bit.query(tree.left(v)) ^
                (1 << (chars[l].charCodeAt(0) - 97));

            result.push(mask === 0 || (mask & (mask - 1)) === 0);
        }
    }

    return result;
};

class BIT {
    constructor(n) {
        this.bit = new Int32Array(n + 1);
    }

    add(i, val) {
        for (i++; i < this.bit.length; i += i & -i) {
            this.bit[i] ^= val;
        }
    }

    query(i) {
        let total = 0;

        for (i++; i > 0; i -= i & -i) {
            total ^= this.bit[i];
        }

        return total;
    }
}

class TreeInfos {
    constructor(adj) {
        const n = adj.length;

        this.log = Math.floor(Math.log2(Math.max(1, n))) + 1;
        this.tin = new Int32Array(n);
        this.tout = new Int32Array(n);
        this.depth = new Int32Array(n);

        this.parent = Array.from(
            { length: this.log },
            () => new Int32Array(n).fill(-1)
        );

        const prev = new Int32Array(n).fill(-1);
        const iter = new Int32Array(n);
        const stack = [0];
        let timer = 0;

        this.tin[0] = timer++;

        while (stack.length > 0) {
            const u = stack[stack.length - 1];

            if (iter[u] < adj[u].length) {
                const v = adj[u][iter[u]++];

                if (v === prev[u]) continue;

                prev[v] = u;
                this.depth[v] = this.depth[u] + 1;
                this.parent[0][v] = u;

                for (let j = 1; j < this.log; j++) {
                    const p = this.parent[j - 1][v];

                    if (p === -1) break;

                    this.parent[j][v] = this.parent[j - 1][p];
                }

                this.tin[v] = timer++;
                stack.push(v);
            } else {
                this.tout[u] = timer - 1;
                stack.pop();
            }
        }
    }

    isAncestor(a, b) {
        return this.tin[a] <= this.tin[b] &&
               this.tout[b] <= this.tout[a];
    }

    left(u) {
        return this.tin[u];
    }

    right(u) {
        return this.tout[u];
    }

    lca(a, b) {
        if (this.depth[a] > this.depth[b]) {
            [a, b] = [b, a];
        }

        if (this.isAncestor(a, b)) {
            return a;
        }

        for (let j = this.log - 1; j >= 0; j--) {
            const p = this.parent[j][a];

            if (p !== -1 && !this.isAncestor(p, b)) {
                a = p;
            }
        }

        return this.parent[0][a];
    }
}