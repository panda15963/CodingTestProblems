function solution(storage, requests) {
    const row = storage.length;
    const col = storage[0].length;
    let result = row * col;
    let storageMap = storage.map((string) => {
        return string.split("");
    });
    
    const dx = [0, 0, 1, -1];
    const dy = [1, -1, 0, 0];
    
    const bfs = (x, y, arr) => {
        const visited = Array.from({ length: row }, () => Array(col).fill(false));
        const qu = [[x, y]];
        visited[x][y] = true;
        
        while (qu.length) {
            const [cx, cy] = qu.shift();
            
            for (let i = 0; i < 4; i++) {
                const nx = cx + dx[i];
                const ny = cy + dy[i];
                
                if (nx < 0 || nx >= row || ny < 0 || ny >= col) {
                    storageMap[x][y] = ".";
                    return 1;
                }
                
                if (!visited[nx][ny] && arr[nx][ny] === ".") {
                    visited[nx][ny] = true;
                    qu.push([nx, ny]);
                }
            }
        }
        
        return 0;
    }
    
    requests.forEach((t) => {
        let currentStorage = JSON.parse(JSON.stringify(storageMap));
        if (t.length === 2) {
            for (let i = 0; i < row; i++) {
                for (let j = 0; j < col; j++) {
                    if (currentStorage[i][j] === t[0]) {
                        storageMap[i][j] = "."
                        result -= 1;
                    }
                }
            }
        } else {
            for (let i = 0; i < row; i++) {
                for (let j = 0; j < col; j++) {
                    if (currentStorage[i][j] === t[0]) {
                        result -= bfs(i, j, currentStorage); // BFS
                    }
                }
            }
        }
    });
    
    return result;
}