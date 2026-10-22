var makesquare = function(matchsticks) {
    let s = 0;
    let mx = 0;

    for (const v of matchsticks) {
        s += v;
        mx = Math.max(mx, v);
    }

    const x = Math.floor(s / 4);
    const mod = s % 4;

    if (mod !== 0 || x < mx) {
        return false;
    }

    matchsticks.sort((a, b) => a - b);

    const edges = [0, 0, 0, 0];

    return dfs(matchsticks.length - 1, x, matchsticks, edges);
};

function dfs(u, x, matchsticks, edges) {
    if (u < 0) {
        return true;
    }

    for (let i = 0; i < 4; i++) {
        if (i > 0 && edges[i - 1] === edges[i]) {
            continue;
        }

        edges[i] += matchsticks[u];

        if (edges[i] <= x && dfs(u - 1, x, matchsticks, edges)) {
            return true;
        }

        edges[i] -= matchsticks[u];
    }

    return false;
}