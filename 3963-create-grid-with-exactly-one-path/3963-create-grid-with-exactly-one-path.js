var createGrid = function(m, n) {
    const g = Array.from({ length: m }, () => Array(n).fill('#'));

    g[0].fill('.');

    for (let i = 0; i < m; i++) {
        g[i][n - 1] = '.';
    }

    return g.map(row => row.join(''));
};