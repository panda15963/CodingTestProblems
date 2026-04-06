function robotSim(commands: number[], obstacles: number[][]): number {
    const obstaclesSet: Set<string> = new Set(
        obstacles.map(obs => `${obs[0]},${obs[1]}`)
    );
    
    const directions: number[][] = [[0,1], [1,0], [0,-1], [-1,0]]; // N, E, S, W
    let dirIdx: number = 0;
    let x: number = 0, y: number = 0;
    let maxDist: number = 0;
    
    for (let cmd of commands) {
        if (cmd === -1) {
            dirIdx = (dirIdx + 1) % 4;
        } else if (cmd === -2) {
            dirIdx = (dirIdx + 4 - 1) % 4;
        } else {
            const [dx, dy] = directions[dirIdx];
            for (let i = 0; i < cmd; i++) {
                const nx: number = x + dx;
                const ny: number = y + dy;
                if (obstaclesSet.has(`${nx},${ny}`)) {
                    break;
                }
                x = nx;
                y = ny;
                maxDist = Math.max(maxDist, x * x + y * y);
            }
        }
    }
    
    return maxDist;
}