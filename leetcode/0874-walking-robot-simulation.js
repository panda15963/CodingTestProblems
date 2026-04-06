/**
 * @param {number[]} commands
 * @param {number[][]} obstacles
 * @return {number}
 */
var robotSim = function(commands, obstacles) {
    const obstaclesSet = new Set(obstacles.map(obs => `${obs[0]},${obs[1]}`));
    const directions = [[0,1], [1,0], [0,-1], [-1,0]]; // N, E, S, W
    let dirIdx = 0; // north
    let x = 0, y = 0;
    let maxDist = 0;
    
    for (let cmd of commands) {
        if (cmd === -1) {
            dirIdx = (dirIdx + 1) % 4;
        } else if (cmd === -2) {
            dirIdx = (dirIdx - 1 + 4) % 4;
        } else {
            const [dx, dy] = directions[dirIdx];
            for (let i = 0; i < cmd; i++) {
                const nx = x + dx, ny = y + dy;
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
};