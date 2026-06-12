/**
 * @param {number[][]} edges
 * @param {number[][]} queries
 * @return {number[]}
 */
var assignEdgeWeights = function(edges, queries) {
    const MOD = 1000000007n;
    const LOG = 17;

    const n = edges.length + 1;
    const ans = new Array(queries.length).fill(0);

    const depth = new Array(n + 1).fill(0);
    const parent = Array.from(
        { length: LOG },
        () => new Array(n + 1).fill(-1)
    );

    const graph = Array.from(
        { length: n + 1 },
        () => []
    );

    for (const [u, v] of edges) {
        graph[u].push(v);
        graph[v].push(u);
    }

    function dfs(u, p) {
        parent[0][u] = p;

        for (const v of graph[u]) {
            if (v !== p) {
                depth[v] = depth[u] + 1;
                dfs(v, u);
            }
        }
    }

    dfs(1, -1);

    for (let k = 1; k < LOG; k++) {
        for (let v = 1; v <= n; v++) {
            if (parent[k - 1][v] !== -1) {
                parent[k][v] =
                    parent[k - 1][parent[k - 1][v]];
            }
        }
    }

    function lca(u, v) {
        if (depth[u] < depth[v]) {
            [u, v] = [v, u];
        }

        for (let k = LOG - 1; k >= 0; k--) {
            if (
                parent[k][u] !== -1 &&
                depth[parent[k][u]] >= depth[v]
            ) {
                u = parent[k][u];
            }
        }

        if (u === v) {
            return u;
        }

        for (let k = LOG - 1; k >= 0; k--) {
            if (
                parent[k][u] !== -1 &&
                parent[k][u] !== parent[k][v]
            ) {
                u = parent[k][u];
                v = parent[k][v];
            }
        }

        return parent[0][u];
    }

    function modPow(base, exp) {
        let result = 1n;
        let b = BigInt(base);
        let e = BigInt(exp);

        while (e > 0n) {
            if (e & 1n) {
                result = (result * b) % MOD;
            }

            b = (b * b) % MOD;
            e >>= 1n;
        }

        return Number(result);
    }

    for (let i = 0; i < queries.length; i++) {
        const [u, v] = queries[i];

        if (u === v) {
            ans[i] = 0;
        } else {
            const a = lca(u, v);
            const d = depth[u] + depth[v] - 2 * depth[a];
            ans[i] = modPow(2, d - 1);
        }
    }

    return ans;
};