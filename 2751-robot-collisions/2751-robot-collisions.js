class Robot {
    constructor(index, position, health, direction) {
        this.index = index;
        this.position = position;
        this.health = health;
        this.direction = direction;
    }
}

function survivedRobotsHealths(positions, healths, directions) {
    const n = positions.length;
    const robots = [];
    for (let i = 0; i < n; i++) {
        robots.push(new Robot(i, positions[i], healths[i], directions[i]));
    }
    robots.sort((a, b) => a.position - b.position);
    
    const stack = [];
    for (const robot of robots) {
        if (robot.direction === 'R') {
            stack.push(robot);
            continue;
        }
        // Collide with right-moving
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