/**
 * @param {number[][]} edges
 * @return {number}
 */
var assignEdgeWeights = function(edges) {
    const MOD = 1000000007n;
    let maxDepth = 0;

    let n = 0;
    for (const [u, v] of edges) {
        n = Math.max(n, u, v);
    }

    const adj = Array.from({ length: n + 1 }, () => []);

    for (const [u, v] of edges) {
        adj[u].push(v);
        adj[v].push(u);
    }

    function dfs(node, parent, depth) {
        maxDepth = Math.max(maxDepth, depth);

        for (const next of adj[node]) {
            if (next !== parent) {
                dfs(next, node, depth + 1);
            }
        }
    }

    dfs(1, -1, 0);

    if (maxDepth === 0) {
        return 0;
    }

    function modPow(base, exp) {
        let result = 1n;
        let b = BigInt(base) % MOD;
        let e = BigInt(exp);

        while (e > 0n) {
            if (e & 1n) {
                result = (result * b) % MOD;
            }

            b = (b * b) % MOD;
            e >>= 1n;
        }

        return result;
    }

    return Number(modPow(2, maxDepth - 1));
};