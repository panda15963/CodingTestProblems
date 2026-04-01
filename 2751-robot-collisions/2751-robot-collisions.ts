interface Robot {
    index: number;
    position: number;
    health: number;
    direction: string;
}

function survivedRobotsHealths(positions: number[], healths: number[], directions: string): number[] {
    const n: number = positions.length;
    const robots: Robot[] = [];
    for (let i = 0; i < n; i++) {
        robots.push({ index: i, position: positions[i], health: healths[i], direction: directions[i] });
    }
    robots.sort((a, b) => a.position - b.position);
    
    const stack: Robot[] = [];
    for (const robot of robots) {
        if (robot.direction === 'R') {
            stack.push(robot);
            continue;
        }
        while (stack.length && stack[stack.length - 1].direction === 'R' && robot.health > 0) {
            const top = stack[stack.length - 1];
            if (top.health === robot.health) {
                stack.pop();
                robot.health = 0;
            } else if (top.health < robot.health) {
                stack.pop();
                robot.health--;
            } else {
                top.health--;
                robot.health = 0;
            }
        }
        if (robot.health > 0) {
            stack.push(robot);
        }
    }
    stack.sort((a, b) => a.index - b.index);
    return stack.map(r => r.health);
}