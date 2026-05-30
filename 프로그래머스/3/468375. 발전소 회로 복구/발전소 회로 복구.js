const map = new Map();

function canGo(next, seqs, visited) {
    for(let [a, b] of seqs) {
        if(next === b && visited[a] === 0) return false;
    }

    return true;
}

function bfs(ci, cj, ni, nj, grid) {
    const key = ci + "|" + cj + "|" + ni + "|" + nj;
    if(map.has(key)) return map.get(key);

    const arr = new Array(grid.length).fill(null).map(v => new Array(grid[0].length).fill(Infinity));
    const d = [[1, 0], [-1, 0], [0, 1], [0, -1]];

    const queue = [];
    queue.push([ci, cj]);
    arr[ci][cj] = 0;

    let head = 0;
    while(queue.length > head) {
        const [y, x] = queue[head++];
        for(let [dy, dx] of d) {
            const ny = y+dy, nx = x+dx;
            if(ny >= 0 && ny < grid.length && nx >= 0 && nx < grid[0].length) {
                if(grid[ny][nx] !== "#" && arr[ny][nx] === Infinity) {
                    queue.push([ny, nx]);
                    arr[ny][nx] = arr[y][x] + 1;
                }
            }
        }
    }

    map.set(key, arr[ni][nj]);
    return arr[ni][nj];
}

function getTime(current, next, grid, elevator) {
    const [cf, ci, cj] = current;
    const [nf, ni, nj] = next;
    const [ei, ej] = elevator;

    if(cf === nf) return bfs(ci, cj, ni, nj, grid);
    return bfs(ci, cj, ei, ej, grid) + Math.abs(cf-nf) + bfs(ei, ej, ni, nj, grid);
}

function getKey(arr) {
    let str = "";

    for(let v of arr) {
        str = str + v + "|";
    }

    return str;
}

function solution(h, grid, panels, seqs) {
    let answer = Infinity;
    let elevator = [];
    const map = new Map();
    const visited = new Array(panels.length).fill(0);
    panels = panels.map(v => [v[0], v[1]-1, v[2]-1]);
    seqs = seqs.map(v => [v[0]-1, v[1]-1]);

    for(let i = 0; i < grid.length; i++) {
        for(let j = 0; j < grid[0].length; j++) {
            if(grid[i][j] === "@") elevator = [i, j];
        }
    }

    function dfs(current, sum) {
        if(visited.every(v => v)) {
            answer = Math.min(answer, sum);
            return;
        }

        if(answer <= sum) return;

        const key1 = current;
        const key2 = getKey(visited);
        const key = key1 + key2;
        if(map.has(key) && map.get(key) <= sum) return;
        map.set(key, sum);

        for(let next = 0; next < panels.length; next++) {
            if(visited[next] || !canGo(next, seqs, visited)) continue;

            const time = getTime(panels[current], panels[next], grid, elevator);
            visited[next] = 1;
            dfs(next, sum+time);
            visited[next] = 0;
        }
    }

    dfs(0, 0);

    return answer;
}