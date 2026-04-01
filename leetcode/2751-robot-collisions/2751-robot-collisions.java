import java.util.*;

class Robot {
    int index;
    int position;
    int health;
    char direction;

    Robot(int index, int position, int health, char direction) {
        this.index = index;
        this.position = position;
        this.health = health;
        this.direction = direction;
    }
}

class Solution {
    public List<Integer> survivedRobotsHealths(int[] positions, int[] healths, String directions) {
        int n = positions.length;
        Robot[] robots = new Robot[n];

        for (int i = 0; i < n; i++) {
            robots[i] = new Robot(i, positions[i], healths[i], directions.charAt(i));
        }

        Arrays.sort(robots, (a, b) -> Integer.compare(a.position, b.position));

        List<Robot> stack = new ArrayList<>();

        for (Robot robot : robots) {
            if (robot.direction == 'R') {
                stack.add(robot);
                continue;
            }

            while (!stack.isEmpty() &&
                   stack.get(stack.size() - 1).direction == 'R' &&
                   robot.health > 0) {
                Robot top = stack.get(stack.size() - 1);

                if (top.health == robot.health) {
                    stack.remove(stack.size() - 1);
                    robot.health = 0;
                } else if (top.health < robot.health) {
                    stack.remove(stack.size() - 1);
                    robot.health--;
                } else {
                    top.health--;
                    robot.health = 0;
                }
            }

            if (robot.health > 0) {
                stack.add(robot);
            }
        }

        stack.sort(Comparator.comparingInt(r -> r.index));

        List<Integer> result = new ArrayList<>();
        for (Robot robot : stack) {
            result.add(robot.health);
        }

        return result;
    }
}