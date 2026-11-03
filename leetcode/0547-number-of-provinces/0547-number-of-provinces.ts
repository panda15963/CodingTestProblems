function findCircleNum(isConnected: number[][]): number {
    const n = isConnected.length;
    const visited: boolean[] = new Array(n).fill(false);
    let provinces = 0;

    const dfs = (city: number): void => {
        visited[city] = true;

        for (let neighbor = 0; neighbor < n; neighbor++) {
            if (isConnected[city][neighbor] === 1 && !visited[neighbor]) {
                dfs(neighbor);
            }
        }
    };

    for (let i = 0; i < n; i++) {
        if (!visited[i]) {
            provinces++;
            dfs(i);
        }
    }

    return provinces;
}